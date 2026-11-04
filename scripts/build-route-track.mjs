// scripts/build-route-track.mjs
//
// Builds src/data/route-track.json (the line used by the map animation)
// from a Strava export.
//
//   Input : _strava_raw/activities.csv + _strava_raw/activities/*   (git-ignored)
//   Output: src/data/route-track.json   (thinned and end-trimmed; safe to commit)
//
// Usage : node scripts/build-route-track.mjs
// Needs : npm install --save-dev fit-file-parser csv-parse
//         NEXT_PUBLIC_MAPBOX_TOKEN in .env.local (used only to fill gaps along roads)
//
// Privacy: the first and last TRIM_END_M meters of every ride are dropped so the
// public line never shows exact overnight spots, and the line is simplified to
// ~TOLERANCE_M meters.
//
// Duplicates: two recordings count as duplicates only if they were at the same
// PLACE at the same TIME (e.g. a phone and a bike computer recording one ride).
// A recording that was simply left running while stationary is NOT a duplicate.
// The longer recording of a duplicate pair is kept.
//
// Order: rides are ordered by the time they actually MOVED (median GPS time),
// not by when the recording was started.
//
// Gaps: where consecutive rides don't connect (missing days, driven stretches),
// gaps longer than GAP_FILL_MIN_M are filled with a cycling route along real
// roads from the Mapbox Directions API. If that fails, a straight line is used.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { parse as parseCsv } from 'csv-parse/sync';
import FitParser from 'fit-file-parser';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, '_strava_raw');
const OUT = path.join(ROOT, 'src', 'data', 'route-track.json');

// ---------- settings ----------
const START = Date.parse('2026-02-27T00:00:00Z');
const END = Date.parse('2026-08-29T06:00:00Z');   // Salt Lake City arrival (Aug 28, US time)
const SPLIT = Date.parse('2026-07-02T00:00:00Z'); // before = Coast to Coast to Canyon, after = Mountain States Exploration
const MIN_STEP_M = 50;         // drop points closer together than this
const TRIM_END_M = 1000;       // hide the first/last 1 km of every ride
const TOLERANCE_M = 120;       // line simplification tolerance
const DUP_NEAR_M = 300;        // same place = within this distance at the same moment
const DUP_RATIO = 0.7;         // share of shared moments that must be "same place"
const DUP_SAMPLE_MS = 60000;   // compare positions once a minute
const POS_MAX_AGE_MS = 180000; // a track "has a position" only if a point exists within 3 min
const GAP_FILL_MIN_M = 5000;   // gaps longer than this get a road route instead of a straight line
const GAP_FILL_MAX_M = 300000; // gaps longer than this stay straight (Directions API limits)
const MAPBOX_PROFILE = 'cycling';

// ---------- geometry ----------
// Points are [lng, lat, timeMs]; time may be NaN.
const R = 6371000;
const rad = Math.PI / 180;
const MI = 1609.344;

function dist(a, b) {
  const dLat = (b[1] - a[1]) * rad;
  const dLng = (b[0] - a[0]) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function pathMeters(pts) {
  let m = 0;
  for (let i = 1; i < pts.length; i++) m += dist(pts[i - 1], pts[i]);
  return m;
}

function thin(pts, step) {
  const out = [pts[0]];
  for (const p of pts) {
    if (dist(out[out.length - 1], p) >= step) out.push(p);
  }
  const last = pts[pts.length - 1];
  if (out[out.length - 1] !== last) out.push(last);
  return out;
}

function trimEnds(pts, meters) {
  let acc = 0;
  let i = 0;
  while (i < pts.length - 1 && acc < meters) {
    acc += dist(pts[i], pts[i + 1]);
    i++;
  }
  let acc2 = 0;
  let j = pts.length - 1;
  while (j > i && acc2 < meters) {
    acc2 += dist(pts[j], pts[j - 1]);
    j--;
  }
  return j > i ? pts.slice(i, j + 1) : [];
}

// Douglas-Peucker, iterative so long rides can't overflow the call stack
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const lat0 = pts[0][1] * rad;
  const xy = pts.map((p) => [p[0] * Math.cos(lat0) * 111320, p[1] * 110540]);
  const keep = new Uint8Array(pts.length);
  keep[0] = 1;
  keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = xy[a];
    const [bx, by] = xy[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let maxD = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = xy[i];
      let t = len2 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0;
      t = Math.max(0, Math.min(1, t));
      const d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > tol && idx > 0) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

// ---------- file readers (each returns an array of [lng, lat, timeMs]) ----------
function readGpx(buf) {
  const txt = buf.toString('utf8');
  const pts = [];
  const re = /<trkpt([^>]*)>([\s\S]*?)<\/trkpt>/g;
  let m;
  while ((m = re.exec(txt))) {
    const lat = /lat="([-\d.]+)"/.exec(m[1]);
    const lon = /lon="([-\d.]+)"/.exec(m[1]);
    if (!lat || !lon) continue;
    const tm = /<time>([^<]+)<\/time>/.exec(m[2]);
    pts.push([parseFloat(lon[1]), parseFloat(lat[1]), tm ? Date.parse(tm[1]) : NaN]);
  }
  return pts;
}

function readFit(buf) {
  return new Promise((resolve, reject) => {
    // NOTE: if the installed fit-file-parser version has a different API,
    // adjust this block. Records should expose position_lat / position_long / timestamp.
    const parser = new FitParser({ force: true, mode: 'list' });
    parser.parse(buf, (err, data) => {
      if (err) return reject(err);
      const pts = [];
      for (const r of data.records || []) {
        let lat = r.position_lat;
        let lng = r.position_long;
        if (typeof lat !== 'number' || typeof lng !== 'number') continue;
        // some versions hand back raw semicircles instead of degrees
        if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          lat *= 180 / 2 ** 31;
          lng *= 180 / 2 ** 31;
        }
        const ts = r.timestamp instanceof Date ? r.timestamp.getTime() : Date.parse(r.timestamp);
        pts.push([lng, lat, ts]);
      }
      resolve(pts);
    });
  });
}

async function loadPoints(file) {
  const p = path.join(RAW, file);
  if (!fs.existsSync(p)) return null;
  let buf = fs.readFileSync(p);
  if (file.toLowerCase().endsWith('.gz')) buf = zlib.gunzipSync(buf);
  if (/\.gpx(\.gz)?$/i.test(file)) return readGpx(buf);
  if (/\.fit(\.gz)?$/i.test(file)) return readFit(buf);
  return null;
}

// ---------- Mapbox road routing for gaps ----------
function loadMapboxToken() {
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  try {
    const env = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8');
    const m = /^NEXT_PUBLIC_MAPBOX_TOKEN\s*=\s*(.+)$/m.exec(env);
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  } catch {
    return '';
  }
}
const TOKEN = loadMapboxToken();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function roadRoute(a, b) {
  // never log this URL: it contains the token
  const url =
    `https://api.mapbox.com/directions/v5/mapbox/${MAPBOX_PROFILE}/` +
    `${a[0]},${a[1]};${b[0]},${b[1]}?geometries=geojson&overview=full&access_token=${TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const coords = json.routes && json.routes[0] && json.routes[0].geometry && json.routes[0].geometry.coordinates;
  if (!coords || coords.length < 2) throw new Error(json.code || 'no route');
  return coords;
}

// ---------- read the activity list ----------
function parseDate(s) {
  const t = Date.parse(`${s} UTC`); // Strava exports UTC
  return Number.isNaN(t) ? Date.parse(s) : t;
}
const iso = (ms) => new Date(ms).toISOString().slice(0, 10);

const rows = parseCsv(fs.readFileSync(path.join(RAW, 'activities.csv'), 'utf8'), {
  relax_column_count: true,
  skip_empty_lines: true,
});
const header = rows[0];
const iDate = header.indexOf('Activity Date');
const iType = header.indexOf('Activity Type');
const iFile = header.indexOf('Filename');
const iName = header.indexOf('Activity Name');

const rides = rows
  .slice(1)
  .map((r) => ({
    start: parseDate(r[iDate]),
    type: r[iType] || '',
    file: r[iFile],
    name: r[iName] || '',
  }))
  .filter(
    (r) =>
      r.file &&
      /ride/i.test(r.type) &&
      !/virtual/i.test(r.type) &&
      r.start >= START &&
      r.start <= END
  )
  .sort((a, b) => a.start - b.start);

// ---------- load, simplify ----------
const loaded = [];
const skipped = [];

for (const ride of rides) {
  try {
    const raw = await loadPoints(ride.file);
    if (!raw || raw.length < 2) {
      skipped.push(`${ride.file} (no GPS points)`);
      continue;
    }
    const thinned = thin(raw, MIN_STEP_M);
    const meters = pathMeters(thinned);

    // points that carry a timestamp, used for duplicate checks and ordering
    const timed = thinned.filter((p) => Number.isFinite(p[2]));
    // median GPS time = when the ride actually moved (ignores idle recording)
    const sortKey = timed.length ? timed[Math.floor(timed.length / 2)][2] : ride.start;

    const pts = simplify(trimEnds(thinned, TRIM_END_M), TOLERANCE_M);
    if (pts.length < 2) {
      skipped.push(`${ride.file} (too short after trimming)`);
      continue;
    }
    loaded.push({ file: ride.file, name: ride.name, sortKey, meters, timed, pts });
  } catch (e) {
    skipped.push(`${ride.file} (${e.message})`);
  }
}

// ---------- drop duplicate recordings (same place at the same time) ----------
function posAt(track, t) {
  const n = track.length;
  if (!n || t < track[0][2] - POS_MAX_AGE_MS || t > track[n - 1][2] + POS_MAX_AGE_MS) return null;
  let lo = 0;
  let hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (track[mid][2] < t) lo = mid + 1;
    else hi = mid;
  }
  let best = lo;
  if (lo > 0 && Math.abs(track[lo - 1][2] - t) < Math.abs(track[lo][2] - t)) best = lo - 1;
  return Math.abs(track[best][2] - t) <= POS_MAX_AGE_MS ? track[best] : null;
}

function isDuplicate(a, b) {
  if (!a.timed.length || !b.timed.length) return false;
  const lo = Math.max(a.timed[0][2], b.timed[0][2]);
  const hi = Math.min(a.timed[a.timed.length - 1][2], b.timed[b.timed.length - 1][2]);
  if (hi - lo < 2 * DUP_SAMPLE_MS) return false;
  let both = 0;
  let near = 0;
  for (let t = lo; t <= hi; t += DUP_SAMPLE_MS) {
    const pa = posAt(a.timed, t);
    const pb = posAt(b.timed, t);
    if (pa && pb) {
      both++;
      if (dist(pa, pb) < DUP_NEAR_M) near++;
    }
  }
  return both >= 3 && near / both > DUP_RATIO;
}

loaded.sort((a, b) => a.sortKey - b.sortKey);
const kept = [];
const dropped = [];
for (const r of loaded) {
  const i = kept.findIndex((k) => isDuplicate(k, r));
  if (i === -1) {
    kept.push(r);
  } else if (r.meters > kept[i].meters) {
    dropped.push(kept[i]);
    kept[i] = r;
  } else {
    dropped.push(r);
  }
}
kept.sort((a, b) => a.sortKey - b.sortKey);

// ---------- build the two legs, filling gaps ----------
const round = (p) => [+p[0].toFixed(4), +p[1].toFixed(4)];
const ptDate = (p, fallback) => iso(Number.isFinite(p[2]) ? p[2] : fallback);
const mkLeg = () => ({ pts: [], ridden: 0, bridged: 0 });
const legs = { c2c2c: mkLeg(), mse: mkLeg() };
const bridges = [];
let filledRoad = 0;
let filledStraight = 0;
let prev = null;

for (const r of kept) {
  const leg = r.sortKey < SPLIT ? legs.c2c2c : legs.mse;
  const first = r.pts[0];
  const last = r.pts[r.pts.length - 1];
  if (prev) {
    const gap = dist(prev.last, first);
    let how = 'straight';
    if (gap > GAP_FILL_MIN_M) {
      if (!TOKEN) {
        how = 'straight (no Mapbox token found)';
        filledStraight++;
      } else if (gap > GAP_FILL_MAX_M) {
        how = 'straight (too far for routing)';
        filledStraight++;
      } else {
        try {
          const road = simplify(await roadRoute(prev.last, first), TOLERANCE_M);
          for (const p of road) leg.pts.push(round(p));
          how = 'road';
          filledRoad++;
        } catch (e) {
          how = `straight (${e.message})`;
          filledStraight++;
        }
        await sleep(150);
      }
    }
    leg.bridged += gap;
    bridges.push({ gap, from: prev.date, to: ptDate(first, r.sortKey), how });
  }
  for (const p of r.pts) leg.pts.push(round(p));
  leg.ridden += pathMeters(r.pts);
  prev = { last, date: ptDate(last, r.sortKey) };
}

fs.writeFileSync(
  OUT,
  JSON.stringify({
    generated: new Date().toISOString(),
    range: ['2026-02-27', '2026-08-28'],
    c2c2c: legs.c2c2c.pts,
    mse: legs.mse.pts,
  })
);

// ---------- report ----------
const mi = (m) => (m / MI).toFixed(0);
console.log('Rides in date range      :', rides.length);
console.log('Duplicate recordings drop:', dropped.length, `(~${mi(dropped.reduce((s, r) => s + r.meters, 0))} mi)`);
dropped.slice(0, 30).forEach((r) =>
  console.log(`   - ${iso(r.sortKey)} "${r.name}" ${mi(r.meters)} mi`)
);
console.log('Rides used               :', kept.length);
console.log('Rides skipped            :', skipped.length);
skipped.forEach((s) => console.log('   -', s));
console.log('Gaps filled along roads  :', filledRoad);
console.log('Gaps left as straight    :', filledStraight, '(only counts gaps over', mi(GAP_FILL_MIN_M), 'mi)');
console.log('Points  c2c2c / mse      :', legs.c2c2c.pts.length, '/', legs.mse.pts.length);
console.log('Ridden miles c2c2c / mse :', mi(legs.c2c2c.ridden), '/', mi(legs.mse.ridden));
console.log('Gap miles (straight-line) c2c2c / mse:', mi(legs.c2c2c.bridged), '/', mi(legs.mse.bridged));
console.log('Largest gaps:');
bridges
  .sort((a, b) => b.gap - a.gap)
  .slice(0, 20)
  .forEach((b) => console.log(`   - ${b.from} -> ${b.to}: ${mi(b.gap)} mi  [${b.how}]`));
console.log('Output size (KB)         :', (fs.statSync(OUT).size / 1024).toFixed(0));
console.log('Wrote', OUT);
