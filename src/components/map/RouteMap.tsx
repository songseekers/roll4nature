'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Maximize2, Minimize2, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { City } from '@/types/city';
import { getMajorCities, getAllCities } from '@/lib/data-helpers';
import routeTrack from '@/data/route-track.json';
import activitiesData from '@/data/activities.json';
import MapControls from './MapControls';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export type MapLayer = 'milestones' | 'major';
export type RouteKey = 'c2c2c' | 'mse';
type MapMode = 'replay' | RouteKey;
type LngLat = [number, number];
type Phase = 'draw' | 'pause' | 'hold';

const ROUTE_COLORS: Record<RouteKey, string> = {
  c2c2c: '#30744A', // green, a bit lighter than the Mountain States line
  mse: '#1E4D2B',   // deep forest green
};

const ROUTE_LABELS: Record<City['route'], string> = {
  c2c2c: 'Coast to Coast to Canyon',
  mse: 'Mountain States Exploration',
  both: 'Coast to Coast to Canyon → Mountain States Exploration',
};

// Where Herbie's tires touched the Pacific. The ride track ended inland that day, so
// the route line is extended out to this point and the replay pauses here.
const PACIFIC_BEACH: LngLat = [-118.0033, 33.6556];

// ---------- milestone badges (start, Pacific, Grand Canyon, Alamo, finish) ----------
// cityId is the stop's id in src/data/cities.json. Change it to move a badge.
type MilestoneKind =
  | 'start'
  | 'waves'
  | 'canyon'
  | 'finish'
  | 'alamo'
  | 'fort'
  | 'bridge'
  | 'fleur'
  | 'cavern'
  | 'sun'
  | 'cliff'
  | 'arch'
  | 'guitar'
  | 'peak'
  | 'picasso'
  | 'hoodoo'
  | 'dome'
  | 'mesa';
type BadgeSide =
  | 'left'
  | 'right'
  | 'above'
  | 'below'
  | 'upper-left'
  | 'upper-right'
  | 'lower-left'
  | 'lower-right';
interface Milestone {
  cityId: string;
  kind: MilestoneKind;
  route: RouteKey | 'both'; // which route view shows it ('both' = either one)
  showInReplay?: boolean;   // set false to keep a badge out of the full-route replay (too busy)
  title: string;
  note: string;
  pauseMs?: number;  // replay pauses this long when the line reaches it
  at?: LngLat;       // put the badge (and the pause) here instead of at the stop
  between?: [string, string]; // center the badge midway between these two stops (display only)
  side: BadgeSide;             // which side of the stop the badge sits on (keeps it off the line)
  nudge?: [number, number];    // extra pixel offset [x, y] (positive y moves it down)
}

const MILESTONES: Milestone[] = [
  {
    cityId: 'key-west-fl',
    kind: 'start',
    route: 'c2c2c',
    title: 'The Start',
    note: 'Where the journey began.',
    side: 'left',
  },
  {
    cityId: 'san-antonio-tx',
    kind: 'alamo',
    route: 'c2c2c',
    title: 'The Alamo',
    note: 'Remember the Alamo!',
    side: 'below',
  },
  {
    cityId: 'huntington-beach-ca',
    kind: 'waves',
    route: 'c2c2c',
    title: 'The Pacific Ocean',
    note: "Reached the Pacific and dipped Herbie's tires.",
    pauseMs: 2500,
    at: PACIFIC_BEACH,
    side: 'left',
    nudge: [0, 12],
  },
  {
    cityId: 'flagstaff-az',
    kind: 'canyon',
    route: 'both',
    title: 'The Grand Canyon',
    note: 'Coast to Coast to Canyon complete.',
    pauseMs: 2500,
    side: 'right',
  },
  {
    cityId: 'salt-lake-city-ut',
    kind: 'finish',
    route: 'mse',
    title: 'The Finish Line',
    note: 'The end of this path, the beginning of another.',
    side: 'above',
  },
  {
    cityId: 'saint-augustine-fl',
    kind: 'fort',
    route: 'c2c2c',
    title: 'St. Augustine',
    note: "The nation's oldest city.",
    side: 'right',
  },
  {
    cityId: 'pensacola-fl',
    kind: 'bridge',
    route: 'c2c2c',
    title: 'Pensacola',
    note: 'Bridges and bays along the Gulf Coast.',
    side: 'below',
  },
  {
    cityId: 'new-orleans-la',
    kind: 'fleur',
    route: 'c2c2c',
    title: 'New Orleans',
    note: 'The Crescent City.',
    side: 'below',
  },
  {
    cityId: 'sonora-tx',
    kind: 'cavern',
    route: 'c2c2c',
    title: 'Sonora',
    note: 'Home of the Caverns of Sonora.',
    side: 'below',
    between: ['san-antonio-tx', 'van-horn-tx'],
  },
  {
    cityId: 'tucson-az',
    kind: 'sun',
    route: 'c2c2c',
    title: 'Tucson',
    note: 'Desert sun in the Sonoran Desert.',
    side: 'left',
    nudge: [-8, 0],
  },
  {
    cityId: 'zion-np-ut',
    kind: 'cliff',
    route: 'mse',
    title: 'Zion National Park',
    note: 'Towering sandstone cliffs.',
    side: 'upper-left',
  },
  {
    cityId: 'arches-np-ut',
    kind: 'arch',
    route: 'mse',
    title: 'Arches National Park',
    note: 'Red rock arches.',
    side: 'right',
  },
  {
    cityId: 'austin-tx',
    kind: 'guitar',
    route: 'c2c2c',
    title: 'Austin',
    note: 'Live Music Capital of the World.',
    side: 'above',
  },
  {
    cityId: 'el-paso-tx',
    kind: 'peak',
    route: 'c2c2c',
    title: 'El Paso',
    note: 'Under the Star on the Mountain.',
    side: 'upper-right',
  },
  {
    cityId: 'van-horn-tx',
    kind: 'picasso',
    route: 'c2c2c',
    title: 'Van Horn',
    note: 'A tip of the hat to a Van Horn resident.',
    side: 'below',
  },
  {
    cityId: 'bryce-np-ut',
    kind: 'hoodoo',
    route: 'mse',
    showInReplay: false,
    title: 'Bryce Canyon National Park',
    note: 'A forest of red rock hoodoos.',
    side: 'lower-right',
  },
  {
    cityId: 'capital-reef-np-ut',
    kind: 'dome',
    route: 'mse',
    showInReplay: false,
    title: 'Capitol Reef National Park',
    note: 'Domes and cliffs along the Waterpocket Fold.',
    side: 'above',
  },
  {
    cityId: 'canyonlands-np-ut',
    kind: 'mesa',
    route: 'mse',
    showInReplay: false,
    title: 'Canyonlands National Park',
    note: 'Mesas and canyons carved by the Green and Colorado Rivers.',
    side: 'below',
  },
];

const MILESTONE_ICONS: Record<MilestoneKind, string> = {
  start:
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 3v18" stroke="#F2DFC0" stroke-width="2" stroke-linecap="round"/><path d="M6 4h11l-3 4 3 4H6z" fill="#A8D878"/></svg>',
  waves:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="none" stroke="#8FD0E8" stroke-width="2" stroke-linecap="round"><path d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></g></svg>',
  canyon:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M1 7h8l2 13H1z" fill="#C2703D"/><path d="M23 7h-8l-2 13h10z" fill="#C2703D"/><path d="M1 11h8.6M1 15h9.2M23 11h-8.6M23 15h-9.2" stroke="#F2DFC0" stroke-width="1" opacity="0.7"/><path d="M11 20.2h2" stroke="#8FD0E8" stroke-width="1.5" stroke-linecap="round"/></svg>',
  finish:
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 3v18" stroke="#F2DFC0" stroke-width="2" stroke-linecap="round"/><rect x="7" y="4" width="12" height="9" fill="none" stroke="#F2DFC0" stroke-width="1"/><g fill="#F2DFC0"><rect x="7" y="4" width="3" height="3"/><rect x="13" y="4" width="3" height="3"/><rect x="10" y="7" width="3" height="3"/><rect x="16" y="7" width="3" height="3"/><rect x="7" y="10" width="3" height="3"/><rect x="13" y="10" width="3" height="3"/></g></svg>',
  alamo:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 21V10.5h2.2c.6-1.8 1.9-2.6 3.3-2.1.5-2 1.9-3.4 3.5-3.4s3 1.4 3.5 3.4c1.4-.5 2.7.3 3.3 2.1H21V21z" fill="#F2DFC0"/><path d="M10 21v-5.2a2 2 0 0 1 4 0V21z" fill="#2a1a08"/><rect x="5.2" y="12.5" width="2.2" height="3.2" rx="1.1" fill="#2a1a08"/><rect x="16.6" y="12.5" width="2.2" height="3.2" rx="1.1" fill="#2a1a08"/><rect x="3" y="20" width="18" height="1.5" fill="#F2DFC0"/></svg>',
  fort:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 21V10h3V7h3v3h6V7h3v3h3v11z" fill="#F2DFC0"/><path d="M10.5 21v-4.5a1.5 1.5 0 0 1 3 0V21z" fill="#2a1a08"/></svg>',
  bridge:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="none" stroke="#F2DFC0" stroke-width="1.6" stroke-linecap="round"><path d="M2 16h20"/><path d="M4 16c2-8 14-8 16 0"/><path d="M8 16v-4.5M12 16v-6M16 16v-4.5"/></g><path d="M3 20c2-1.5 3.5 1.5 6 0s4-1.5 6 0 3.5 1.5 6 0" fill="none" stroke="#8FD0E8" stroke-width="1.6" stroke-linecap="round"/></svg>',
  fleur:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="#F2DFC0"><path d="M12 1.8C14.6 4.2 15 7.6 14.4 10.6 14 12.6 13.2 14 12 15 10.8 14 10 12.6 9.6 10.6 9 7.6 9.4 4.2 12 1.8z"/><path d="M13.2 12.4C15 9.2 19 7.2 21 10.2 22.4 12.4 20.6 15.2 17.6 15.4 15.8 15.5 14.2 15 12.6 14.4z"/><path d="M10.8 12.4C9 9.2 5 7.2 3 10.2 1.6 12.4 3.4 15.2 6.4 15.4 8.2 15.5 9.8 15 11.4 14.4z"/><rect x="7" y="15.2" width="10" height="2" rx="1"/><path d="M7.4 17.2c-.3 1.6.5 2.9 2.2 3.5-.3-1.1-.2-2.2.5-3.5zM16.6 17.2c.3 1.6-.5 2.9-2.2 3.5.3-1.1.2-2.2-.5-3.5zM10.8 17.2h2.4L12 21.6z"/></g></svg>',
  cavern:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M2 21V12C2 6 6.5 3 12 3s10 3 10 9v9z" fill="#C9A27A"/><path d="M6 21v-8c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5v8z" fill="#2a1a08"/><path d="M8 7.8h2L9 11.5zM11 7.5h2l-1 5zM14 7.8h2l-1 3.5z" fill="#F2DFC0"/><path d="M8.5 21h2l-1-3.5zM13.5 21h2l-1-4.5z" fill="#F2DFC0"/></svg>',
  sun:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="#F4B942"/><g stroke="#F4B942" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></g></svg>',
  cliff:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M2 21V13l3-2V7l3-1 1 3 3-6 3 5 2-1v4l5 2V21z" fill="#C2703D"/><path d="M2 15h20M2 18h20" stroke="#F2DFC0" stroke-width="0.8" opacity="0.6"/></svg>',
  arch:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 21V12C5 4.5 19 4.5 19 12V21h-3V12c0-3.5-8-3.5-8 0v9z" fill="#C2703D"/><path d="M3 21h18" stroke="#F2DFC0" stroke-width="1.5" stroke-linecap="round"/></svg>',
  guitar:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g transform="rotate(45 12 12)" fill="#F2DFC0"><rect x="11.2" y="1.5" width="1.6" height="10"/><rect x="10.5" y="0.8" width="3" height="2.4" rx="0.6"/><circle cx="12" cy="12.4" r="3"/><circle cx="12" cy="16.9" r="4.2"/><circle cx="12" cy="15.7" r="1.3" fill="#2a1a08"/></g></svg>',
  peak:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M2 21L9.5 10l3.2 4.5L16 8l6 13z" fill="#C2703D"/><path d="M15.5 2l.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" fill="#F4B942"/></svg>',
  picasso:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 3h12l1 9-4 9H9l-4-9z" fill="#F2DFC0"/><path d="M6 3h6v18H9l-4-9z" fill="#7FA6C9"/><ellipse cx="15" cy="9" rx="1.8" ry="1.4" fill="#2a1a08"/><ellipse cx="8.8" cy="7.6" rx="1.8" ry="1" transform="rotate(-20 8.8 7.6)" fill="#2a1a08"/><path d="M12 8l2.6 6.2-2.6.6" fill="none" stroke="#2a1a08" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 17.6l6-1.4" stroke="#2a1a08" stroke-width="1.4" stroke-linecap="round"/></svg>',
  hoodoo:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="#C2703D"><path d="M3 21v-9c0-2.4.7-4.6 1.5-4.6S6 9.6 6 12v9z"/><path d="M7 21V8c0-3 .9-6 2-6s2 3 2 6v13z"/><path d="M12 21V10c0-2.6.8-5 2-5s2 2.4 2 5v11z"/><path d="M17 21v-7c0-2 .6-3.8 2-3.8S21 12 21 14v7z"/></g><path d="M3 17h18M3 13.5h18" stroke="#F2DFC0" stroke-width="0.8" opacity="0.55"/></svg>',
  dome:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 16c0-5.5 3.6-9.5 8-9.5s8 4 8 9.5z" fill="#F2DFC0"/><path d="M12 3.2v3" stroke="#F2DFC0" stroke-width="1.6" stroke-linecap="round"/><path d="M2 16h20v5H2z" fill="#C2703D"/><path d="M2 18.5h20" stroke="#F2DFC0" stroke-width="0.8" opacity="0.6"/></svg>',
  mesa:
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M2 20l1-8h7l1 8z" fill="#C2703D"/><path d="M14 20l.6-14h4.8l.6 14z" fill="#D08A4E"/><path d="M3 16.5h7.6M14.5 10h4.6M14.3 14h5" stroke="#F2DFC0" stroke-width="0.8" opacity="0.6"/><path d="M1 21.5h22" stroke="#8FD0E8" stroke-width="1.6" stroke-linecap="round"/></svg>',
};

// Where a badge sits relative to its stop. Badges sit beside the stop, not on it,
// so they never cover the route line.
type MarkerAnchor =
  | 'right'
  | 'left'
  | 'bottom'
  | 'top'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';
const SIDE_PLACEMENT: Record<BadgeSide, { anchor: MarkerAnchor; offset: [number, number] }> = {
  left: { anchor: 'right', offset: [-10, 0] },
  right: { anchor: 'left', offset: [10, 0] },
  above: { anchor: 'bottom', offset: [0, -10] },
  below: { anchor: 'top', offset: [0, 10] },
  'upper-left': { anchor: 'bottom-right', offset: [-6, -6] },
  'upper-right': { anchor: 'bottom-left', offset: [6, -6] },
  'lower-left': { anchor: 'top-right', offset: [-6, 6] },
  'lower-right': { anchor: 'top-left', offset: [6, 6] },
};

// How solid the milestone badges look (1 = fully opaque). Lower = less busy.
const BADGE_OPACITY = 0.78;
// Added to the recorded daily high temperature (the Garmin read low).
const TEMP_ADJUST_F = 5;

// Journey Replay timing
const DRAW_MS = 26000; // time to draw the whole route (not counting pauses)
const HOLD_MS = 10000; // pause on the finished route before restarting
const FRAME_MS = 40;   // repaint at most every 40 ms (~25 fps)

function citiesForRoute(route: RouteKey): City[] {
  return getAllCities()
    .filter((c) => c.route === route || c.route === 'both')
    .sort((a, b) => a.dayNumber - b.dayNumber);
}

// ---------- real route line (built by scripts/build-route-track.mjs) ----------
interface TrackData {
  c2c2c: LngLat[];
  mse: LngLat[];
  pts: LngLat[];       // c2c2c followed by mse
  cum: number[];       // cumulative distance (km) at each point of pts
  total: number;
  split: number;       // index in pts where the mse leg starts
  cities: City[];      // all cities, in trip order
  cityIdx: number[];   // for each city, index in pts of the nearest track point
  milesAt: number[];   // for each city, miles ridden by its arrival date (from activities.json)
  highAt: (number | null)[]; // for each city, the day's high temperature in F (null if no ride that day)
  pausePoints: { frac: number; ms: number }[]; // where the replay pauses
}

function haversine(a: LngLat, b: LngLat): number {
  const rad = Math.PI / 180;
  const dLat = (b[1] - a[1]) * rad;
  const dLng = (b[0] - a[0]) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(s));
}

// For each city (in trip order) find the nearest track point, never moving backwards
function assignCityIndexes(cities: City[], pts: LngLat[], split: number): number[] {
  let prev = 0;
  return cities.map((city) => {
    const isMse = city.route === 'mse';
    const from = isMse ? Math.max(prev, split) : prev;
    const to = isMse ? pts.length - 1 : Math.max(split - 1, from);
    const cosLat = Math.cos((city.coordinates[1] * Math.PI) / 180);
    let best = Math.min(from, Math.max(pts.length - 1, 0));
    let bestD = Infinity;
    for (let i = from; i <= to && i < pts.length; i++) {
      const dx = (pts[i][0] - city.coordinates[0]) * cosLat;
      const dy = pts[i][1] - city.coordinates[1];
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    prev = best;
    return best;
  });
}

// Extend the route line out to the Pacific beach (the ride track ended inland that day).
// The beach point goes right after the track point nearest to it: a short out-and-back.
function withBeachStop(line: LngLat[]): LngLat[] {
  if (line.length === 0) return line;
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < line.length; i++) {
    const d = haversine(line[i], PACIFIC_BEACH);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  if (bestD > 25) return line; // the route never got near the coast
  return [...line.slice(0, best + 1), PACIFIC_BEACH, ...line.slice(best + 1)];
}

let trackCache: TrackData | null = null;
function getTrackData(): TrackData {
  if (trackCache) return trackCache;
  const c2c2c = withBeachStop(routeTrack.c2c2c as unknown as LngLat[]);
  const mse = routeTrack.mse as unknown as LngLat[];
  const pts = [...c2c2c, ...mse];
  const cum: number[] = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + haversine(pts[i - 1], pts[i]));
  const total = cum[cum.length - 1] || 1;
  const cities = getAllCities().slice().sort((a, b) => a.dayNumber - b.dayNumber);
  const split = c2c2c.length;
  const cityIdx = assignCityIndexes(cities, pts, split);

  // A stop with a custom badge position (e.g. the Pacific beach) counts as reached when the
  // line gets to that point, so its badge, caption and pause all happen together.
  MILESTONES.forEach((ms) => {
    const at = ms.at;
    if (!at) return;
    const k = cities.findIndex((c) => c.id === ms.cityId);
    if (k < 0) return;
    let best = cityIdx[k];
    let bestD = Infinity;
    for (let i = 0; i < pts.length; i++) {
      const d = haversine(pts[i], at);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    cityIdx[k] = best;
    // stops before this one must not be revealed after it
    for (let j = k - 1; j >= 0 && cityIdx[j] > best; j--) cityIdx[j] = best;
  });
  // keep the indexes in trip order (a later stop is never reached before an earlier one)
  for (let i = 1; i < cityIdx.length; i++) cityIdx[i] = Math.max(cityIdx[i], cityIdx[i - 1]);

  // miles ridden through each city's arrival date (the start city is 0)
  const rides = (activitiesData as Array<{ date: string; distance: number; maxTemp?: number }>)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));
  const milesAt = cities.map((city, k) => {
    if (k === 0) return 0;
    let sum = 0;
    for (const r of rides) {
      if (r.date <= city.arrivalDate) sum += r.distance;
      else break;
    }
    return Math.round(sum);
  });

  // highest recorded temperature (F) on each city's arrival date, if there was a ride
  const highAt = cities.map((city) => {
    let high: number | null = null;
    for (const r of rides) {
      if (r.date !== city.arrivalDate) continue;
      if (typeof r.maxTemp === 'number' && Number.isFinite(r.maxTemp)) {
        high = high === null ? r.maxTemp : Math.max(high, r.maxTemp);
      }
    }
    return high === null ? null : Math.round(high + TEMP_ADJUST_F);
  });

  // where the replay should pause (milestones with a pauseMs)
  const pausePoints: { frac: number; ms: number }[] = [];
  MILESTONES.forEach((ms) => {
    if (!ms.pauseMs) return;
    const k = cities.findIndex((c) => c.id === ms.cityId);
    if (k < 0) return;
    let idx = cityIdx[k];
    const at = ms.at;
    if (at) {
      // pause exactly at the override point (the nearest track point to it)
      let bestD = Infinity;
      for (let i = 0; i < pts.length; i++) {
        const d = haversine(pts[i], at);
        if (d < bestD) {
          bestD = d;
          idx = i;
        }
      }
    }
    pausePoints.push({ frac: cum[idx] / total, ms: ms.pauseMs });
  });
  pausePoints.sort((a, b) => a.frac - b.frac);

  trackCache = { c2c2c, mse, pts, cum, total, split, cities, cityIdx, milesAt, highAt, pausePoints };
  return trackCache;
}

// Nudge a popup back inside the map window if it hangs over an edge, so all of it is readable.
function keepPopupInside(m: mapboxgl.Map, popup: mapboxgl.Popup) {
  const run = () => {
    const el = popup.getElement();
    if (!el || !el.isConnected || !popup.isOpen()) return;
    el.style.marginLeft = '0px';
    el.style.marginTop = '0px';
    const box = m.getContainer().getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = 6;
    let dx = 0;
    let dy = 0;
    if (r.left < box.left + pad) dx = box.left + pad - r.left;
    else if (r.right > box.right - pad) dx = box.right - pad - r.right;
    if (r.top < box.top + pad) dy = box.top + pad - r.top;
    else if (r.bottom > box.bottom - pad) dy = box.bottom - pad - r.bottom;
    if (dx) el.style.marginLeft = `${dx}px`;
    if (dy) el.style.marginTop = `${dy}px`;
    el.style.visibility = 'visible';
  };
  // Mapbox puts the popup in place on its next frame, so measure after that
  requestAnimationFrame(() => requestAnimationFrame(run));
  setTimeout(run, 120); // safety net
}

type PopupAnchor = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// Open a popup so it grows toward the middle of the map (never off an edge) and away from the
// badge sitting next to the point, so it does not cover the icon it belongs to.
function openPopup(
  m: mapboxgl.Map,
  lngLat: LngLat,
  content: HTMLElement,
  opts: {
    offset: number;
    maxWidth: string;
    className?: string;
    closeButton?: boolean;
    badgeSide?: BadgeSide;
    size?: [number, number]; // rough popup size in px, used to see where it fits
  }
): mapboxgl.Popup {
  const box = m.getContainer();
  const W = box.clientWidth;
  const H = box.clientHeight;
  const p = m.project(lngLat);
  const [pw, ph] = opts.size ?? [290, 150];
  const side = opts.badgeSide;
  const badgeBelow = side === 'below' || side === 'lower-left' || side === 'lower-right';
  const badgeAbove = side === 'above' || side === 'upper-left' || side === 'upper-right';
  const badgeLeft = side === 'left' || side === 'upper-left' || side === 'lower-left';
  const badgeRight = side === 'right' || side === 'upper-right' || side === 'lower-right';

  const roomBelow = H - p.y;
  const roomAbove = p.y;
  const fitsBelow = roomBelow >= ph + opts.offset + 8;
  const fitsAbove = roomAbove >= ph + opts.offset + 8;
  let vertical: 'top' | 'bottom'; // 'top' = the popup opens below the point
  if (badgeBelow) vertical = fitsAbove || !fitsBelow ? 'bottom' : 'top';
  else if (badgeAbove) vertical = fitsBelow || !fitsAbove ? 'top' : 'bottom';
  else vertical = roomBelow >= roomAbove ? 'top' : 'bottom';

  const roomLeft = p.x;
  const roomRight = W - p.x;
  let horizontal: 'left' | 'right' | null; // 'left' = the popup opens toward the right
  if (badgeLeft) horizontal = roomRight >= pw + 20 || roomRight >= roomLeft ? 'left' : 'right';
  else if (badgeRight) horizontal = roomLeft >= pw + 20 || roomLeft >= roomRight ? 'right' : 'left';
  else if (roomLeft >= pw / 2 + 8 && roomRight >= pw / 2 + 8) horizontal = null;
  else horizontal = roomRight >= roomLeft ? 'left' : 'right';

  const anchor = (horizontal ? `${vertical}-${horizontal}` : vertical) as PopupAnchor;

  const popup = new mapboxgl.Popup({
    closeButton: opts.closeButton ?? false,
    closeOnClick: false,
    maxWidth: opts.maxWidth,
    offset: opts.offset,
    anchor,
    className: opts.className,
  })
    .setLngLat(lngLat)
    .setDOMContent(content)
    .addTo(m);

  // keep it hidden until it has been placed, so it never flashes in the wrong spot
  const el = popup.getElement();
  if (el) el.style.visibility = 'hidden';
  keepPopupInside(m, popup);
  return popup;
}

function setLineData(m: mapboxgl.Map, id: string, coords: LngLat[]) {
  const src = m.getSource(id) as mapboxgl.GeoJSONSource | undefined;
  if (!src) return;
  if (coords.length < 2) {
    src.setData({ type: 'FeatureCollection', features: [] });
  } else {
    src.setData({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: coords },
      properties: {},
    });
  }
}

// During the replay, stops the line has reached are solid and the rest are faint;
// milestone badges pop in as the line reaches them.
function applyMarkerProgress(
  els: Map<string, HTMLDivElement>,
  badges: Map<string, HTMLDivElement>,
  passed: number
) {
  const td = getTrackData();
  td.cities.forEach((city, k) => {
    const el = els.get(city.id);
    if (el) el.style.opacity = k < passed ? '1' : '0.25';
    const badge = badges.get(city.id);
    if (badge) {
      const reached = k < passed;
      badge.style.opacity = reached ? String(BADGE_OPACITY) : '0';
      badge.style.transform = reached ? 'scale(1)' : 'scale(0.5)';
      // badges the line has not reached yet should not react to the mouse
      if (badge.parentElement) badge.parentElement.style.pointerEvents = reached ? 'auto' : 'none';
    }
  });
}

interface Caption {
  city: City;
  miles: number;
  high: number | null;
}

const STATE_ABBR: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
  Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS',
  Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD', Massachusetts: 'MA',
  Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO', Montana: 'MT',
  Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
  Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI',
  'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT',
  Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV',
  Wisconsin: 'WI', Wyoming: 'WY',
};

// "Day 31 · 29 March · 78° · New Orleans, LA · 1,634 miles"
function captionText(c: Caption): string {
  const date = new Date(c.city.arrivalDate + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });
  const parts = [`Day ${c.city.dayNumber}`, date];
  if (c.high !== null) parts.push(`${c.high}°`);
  parts.push(`${c.city.name}, ${STATE_ABBR[c.city.state] ?? c.city.state}`);
  parts.push(`${c.miles.toLocaleString()} miles`);
  return parts.join(' · ');
}

// readable on the map in both light and dark mode
const MAP_BUTTON_STYLE = {
  backgroundColor: '#2a1a08',
  color: '#F2DFC0',
  border: '1px solid #F2DFC0',
} as const;
const MAP_BUTTON_CLASS =
  'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold shadow hover:opacity-90 transition cursor-pointer';

export default function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const markerEls = useRef<Map<string, HTMLDivElement>>(new Map());
  const milestoneEls = useRef<Map<string, HTMLDivElement>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [layer, setLayer] = useState<MapLayer>('milestones');
  const [mode, setMode] = useState<MapMode>('replay');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const hoverPopupRef = useRef<mapboxgl.Popup | null>(null);

  // replay state (kept in refs so animation frames never trigger React renders)
  const reducedRef = useRef<boolean>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const progressRef = useRef<number>(reducedRef.current ? 1 : 0);
  const phaseRef = useRef<Phase>(reducedRef.current ? 'hold' : 'draw');
  const remainingRef = useRef<number>(0); // ms left in the current pause/hold
  const passedRef = useRef<number>(-1);
  const paintRef = useRef<((p: number) => void) | null>(null);
  const [playing, setPlaying] = useState<boolean>(!reducedRef.current);
  const [caption, setCaption] = useState<Caption | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.current?.resize();
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // ---------- create the map ----------
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-98.5, 39.5],
      zoom: 4,
      pitch: 0,
      bearing: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      const m = map.current;
      if (!m) return;
      const td = getTrackData();

      // real route line; fall back to city-to-city lines if the track file is empty
      const c2c2cLine: LngLat[] =
        td.c2c2c.length > 1
          ? td.c2c2c
          : citiesForRoute('c2c2c').map((c) => c.coordinates as LngLat);
      const mseLine: LngLat[] =
        td.mse.length > 1 ? td.mse : citiesForRoute('mse').map((c) => c.coordinates as LngLat);

      m.addSource('route-c2c2c', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: c2c2cLine },
          properties: {},
        },
      });
      m.addSource('route-mse', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: mseLine },
          properties: {},
        },
      });

      // animated line (replay) sources
      m.addSource('anim-c2c2c', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      m.addSource('anim-mse', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      m.addSource('anim-head', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });

      const lineLayout = { 'line-cap': 'round' as const, 'line-join': 'round' as const };

      m.addLayer({
        id: 'route-line-c2c2c',
        type: 'line',
        source: 'route-c2c2c',
        layout: lineLayout,
        paint: { 'line-color': ROUTE_COLORS.c2c2c, 'line-width': 4, 'line-opacity': 0.15 },
      });
      m.addLayer({
        id: 'route-line-mse',
        type: 'line',
        source: 'route-mse',
        layout: lineLayout,
        paint: { 'line-color': ROUTE_COLORS.mse, 'line-width': 4, 'line-opacity': 0.15 },
      });
      m.addLayer({
        id: 'anim-line-c2c2c',
        type: 'line',
        source: 'anim-c2c2c',
        layout: lineLayout,
        paint: { 'line-color': ROUTE_COLORS.c2c2c, 'line-width': 4, 'line-opacity': 1 },
      });
      m.addLayer({
        id: 'anim-line-mse',
        type: 'line',
        source: 'anim-mse',
        layout: lineLayout,
        paint: { 'line-color': ROUTE_COLORS.mse, 'line-width': 4, 'line-opacity': 1 },
      });
      m.addLayer({
        id: 'anim-head',
        type: 'circle',
        source: 'anim-head',
        paint: {
          'circle-radius': 6,
          'circle-color': '#F2DFC0',
          'circle-stroke-color': '#2a1a08',
          'circle-stroke-width': 2,
        },
      });

      setIsLoading(false);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      if (popupRef.current) popupRef.current.remove();
      if (hoverPopupRef.current) hoverPopupRef.current.remove();
      map.current?.remove();
    };
  }, []);

  // ---------- mode: line opacity, replay layers, framing ----------
  useEffect(() => {
    const m = map.current;
    if (!m || isLoading) return;
    const replay = mode === 'replay';

    (['c2c2c', 'mse'] as RouteKey[]).forEach((route) => {
      const layerId = `route-line-${route}`;
      if (m.getLayer(layerId)) {
        m.setPaintProperty(layerId, 'line-opacity', replay ? 0.15 : route === mode ? 1 : 0.12);
      }
    });

    ['anim-line-c2c2c', 'anim-line-mse', 'anim-head'].forEach((id) => {
      if (m.getLayer(id)) m.setLayoutProperty(id, 'visibility', replay ? 'visible' : 'none');
    });

    const targetCities = mode === 'replay' ? getAllCities() : citiesForRoute(mode);
    if (targetCities.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      targetCities.forEach((city) => bounds.extend(city.coordinates));
      m.fitBounds(bounds, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        duration: 800,
      });
    }
  }, [mode, isLoading]);

  // ---------- replay: restart from the beginning when it is selected ----------
  useEffect(() => {
    if (mode !== 'replay') return;
    progressRef.current = reducedRef.current ? 1 : 0;
    phaseRef.current = reducedRef.current ? 'hold' : 'draw';
    remainingRef.current = 0;
    passedRef.current = -1;
  }, [mode]);

  // ---------- replay: the animation loop ----------
  useEffect(() => {
    const m = map.current;
    if (!m || isLoading || mode !== 'replay') return;
    const td = getTrackData();
    if (td.pts.length < 2) return;

    const paint = (p: number) => {
      const d = Math.min(td.total, p * td.total + 1e-6);
      let lo = 0;
      let hi = td.pts.length - 1;
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (td.cum[mid] <= d) lo = mid;
        else hi = mid - 1;
      }
      const i = lo;

      let head: LngLat = td.pts[i];
      if (i < td.pts.length - 1) {
        const seg = td.cum[i + 1] - td.cum[i];
        const t = seg > 0 ? (d - td.cum[i]) / seg : 0;
        head = [
          td.pts[i][0] + (td.pts[i + 1][0] - td.pts[i][0]) * t,
          td.pts[i][1] + (td.pts[i + 1][1] - td.pts[i][1]) * t,
        ];
      }

      const part1: LngLat[] = i < td.split ? [...td.pts.slice(0, i + 1), head] : td.c2c2c;
      const part2: LngLat[] = i >= td.split ? [...td.pts.slice(td.split, i + 1), head] : [];
      setLineData(m, 'anim-c2c2c', part1);
      setLineData(m, 'anim-mse', part2);

      const headSrc = m.getSource('anim-head') as mapboxgl.GeoJSONSource | undefined;
      headSrc?.setData({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: head },
        properties: {},
      });

      let passed = 0;
      while (passed < td.cities.length && td.cityIdx[passed] <= i) passed++;
      if (passed !== passedRef.current) {
        passedRef.current = passed;
        applyMarkerProgress(markerEls.current, milestoneEls.current, passed);
        setCaption(
          passed > 0
            ? {
                city: td.cities[passed - 1],
                miles: td.milesAt[passed - 1],
                high: td.highAt[passed - 1],
              }
            : null
        );
      }
    };

    // let the step buttons repaint at any point
    paintRef.current = paint;
    paint(progressRef.current);
    if (!playing) {
      return () => {
        paintRef.current = null;
      };
    }

    // which pause points are already behind us (matters after stepping back / resuming)
    const triggered = new Set<number>();
    td.pausePoints.forEach((pp, idx) => {
      if (pp.frac <= progressRef.current + 1e-9) triggered.add(idx);
    });

    // make the phase consistent with where we are
    if (progressRef.current >= 1) {
      if (phaseRef.current !== 'hold') {
        phaseRef.current = 'hold';
        remainingRef.current = HOLD_MS;
      }
    } else if (phaseRef.current === 'hold') {
      phaseRef.current = 'draw';
    }

    let raf = 0;
    let last = performance.now();
    let lastPaint = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100); // ignore long pauses (e.g. background tab)
      last = now;

      if (phaseRef.current === 'draw') {
        const prev = progressRef.current;
        let next = Math.min(1, prev + dt / DRAW_MS);
        let force = false;

        const hit = td.pausePoints.findIndex(
          (pp, idx) => !triggered.has(idx) && pp.frac > prev && pp.frac <= next
        );
        if (hit !== -1) {
          next = td.pausePoints[hit].frac;
          triggered.add(hit);
          phaseRef.current = 'pause';
          remainingRef.current = td.pausePoints[hit].ms;
          force = true;
        } else if (next >= 1) {
          phaseRef.current = 'hold';
          remainingRef.current = HOLD_MS;
          force = true;
        }

        progressRef.current = next;
        if (force || now - lastPaint >= FRAME_MS) {
          lastPaint = now;
          paint(next);
        }
      } else {
        // 'pause' (at a milestone) or 'hold' (at the end): wait it out
        remainingRef.current -= dt;
        if (remainingRef.current <= 0) {
          if (phaseRef.current === 'pause') {
            phaseRef.current = 'draw';
          } else {
            progressRef.current = 0;
            phaseRef.current = 'draw';
            passedRef.current = -1;
            triggered.clear();
            paint(0);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      paintRef.current = null;
    };
  }, [mode, playing, isLoading]);

  // while paused: step to the previous / next stop (each stop is a labeled day)
  const stepStop = (dir: 1 | -1) => {
    const td = getTrackData();
    const n = td.cities.length;
    if (n === 0) return;
    const cur = passedRef.current - 1; // last stop reached (-1 if none)
    const curIdx = cur >= 0 ? td.cityIdx[cur] : -1;
    let target = cur + dir;
    if (dir === 1) {
      while (target < n - 1 && td.cityIdx[target] <= curIdx) target++;
    } else {
      while (target > 0 && td.cityIdx[target] >= curIdx) target--;
    }
    target = Math.max(0, Math.min(n - 1, target));
    const frac = td.cum[td.cityIdx[target]] / td.total;
    progressRef.current = frac;
    phaseRef.current = frac >= 1 ? 'hold' : 'draw';
    paintRef.current?.(frac);
  };

  // ---------- city markers and milestone badges ----------
  useEffect(() => {
    if (!map.current || isLoading) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    markerEls.current.clear();
    milestoneEls.current.clear();

    // stops are hidden by default; "All Stops" shows them in their route color
    const citiesToShow: City[] = layer === 'major' ? getMajorCities() : [];

    citiesToShow.forEach((city) => {
      const isMajor = city.tier === 'major';

      const markerColor =
        city.route === 'both'
          ? ROUTE_COLORS[mode === 'replay' ? 'c2c2c' : mode]
          : ROUTE_COLORS[city.route];

      const matchesSelectedRoute = mode === 'replay' || city.route === 'both' || city.route === mode;
      const markerOpacity = matchesSelectedRoute ? 1 : 0.25;

      const el = document.createElement('div');
      el.className = 'city-marker';
      const baseSize = isMajor ? 16 : 12;
      const markerSize = matchesSelectedRoute ? baseSize : baseSize * 0.6;
      const borderWidth = isMajor ? 3 : 2;

      el.style.width = markerSize + 'px';
      el.style.height = markerSize + 'px';
      el.style.backgroundColor = markerColor;
      el.style.opacity = String(markerOpacity);
      el.style.border = `${borderWidth}px solid white`;
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.display = 'block';

      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
        if (hoverPopupRef.current) hoverPopupRef.current.remove();

        const hoverContent = document.createElement('div');
        hoverContent.style.cssText = `
          padding: 12px;
          min-width: 220px;
          background: linear-gradient(135deg, #E8C9A1 0%, #D4A574 100%);
          border: 2px solid #5C3317;
          border-radius: 8px;
          color: #1F2937;
        `;
        hoverContent.innerHTML = `
          <div style="font-weight: 700; font-size: 16px; color: #8B4513; margin-bottom: 8px;">
            ${city.name}, ${city.state}
          </div>
          <div style="font-size: 14px; line-height: 1.5;">
            <div style="margin-bottom: 4px;">
              <strong style="color: #5C3317;">Arriving:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style="margin-bottom: 4px;">
              <strong style="color: #5C3317;">Day:</strong> ${city.dayNumber}
            </div>
            <div>
              <strong style="color: #5C3317;">Route:</strong> ${ROUTE_LABELS[city.route]}
            </div>
          </div>
        `;

        hoverPopupRef.current = openPopup(map.current!, city.coordinates as LngLat, hoverContent, {
          offset: 15,
          maxWidth: '280px',
          className: 'hover-popup',
        });
      });

      el.addEventListener('mouseleave', () => {
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        if (hoverPopupRef.current) {
          hoverPopupRef.current.remove();
          hoverPopupRef.current = null;
        }
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedCity(city);
        if (popupRef.current) popupRef.current.remove();

        const popupContent = document.createElement('div');
        popupContent.className = 'city-popup';
        popupContent.style.padding = '12px';
        popupContent.style.minWidth = '200px';
        popupContent.style.maxWidth = '300px';
        popupContent.innerHTML = `
          <div>
            <h3 style="font-weight: bold; font-size: 18px; color: #8B4513; margin-bottom: 8px;">
              ${city.name}, ${city.state}
            </h3>
            <div style="font-size: 15px; color: #1F2937;">
              <div style="margin-bottom: 4px;"><strong style="color: #5C3317;">Day ${city.dayNumber}:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div style="margin-bottom: 4px;"><strong style="color: #5C3317;">Route:</strong> ${ROUTE_LABELS[city.route]}</div>
              ${city.rwbChapter ? `
                <div style="margin-top: 8px; padding: 8px; background-color: #E8C9A1; border-radius: 4px; font-size: 14px; border: 1px solid #5C3317;">
                  <strong style="color: #8B4513;">Team RWB:</strong><br/>
                  <span style="color: #1F2937;">${city.rwbChapter.name}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;

        popupRef.current = openPopup(map.current!, city.coordinates as LngLat, popupContent, {
          offset: 25,
          maxWidth: '300px',
          closeButton: true,
          size: [310, 200],
        });
      });

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat(city.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
      markerEls.current.set(city.id, el);
    });

    // milestone badges: start flag, Alamo, check marks, finish flag
    const everyCity = getAllCities();
    MILESTONES.forEach((ms) => {
      if (mode === 'replay' ? ms.showInReplay === false : ms.route !== 'both' && ms.route !== mode) return;
      const city = everyCity.find((c) => c.id === ms.cityId);
      if (!city) return;
      let pos: LngLat = ms.at ?? (city.coordinates as LngLat);
      if (ms.between) {
        // center the badge midway between two other stops
        const a = everyCity.find((c) => c.id === ms.between?.[0]);
        const b = everyCity.find((c) => c.id === ms.between?.[1]);
        if (a && b) {
          pos = [
            (a.coordinates[0] + b.coordinates[0]) / 2,
            (a.coordinates[1] + b.coordinates[1]) / 2,
          ];
        }
      }

      const el = document.createElement('div');
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.cursor = 'pointer';

      const badge = document.createElement('div');
      badge.setAttribute('role', 'img');
      badge.setAttribute('aria-label', `${ms.title}: ${city.name}, ${city.state}`);
      badge.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #2a1a08;
        border: 2px solid #F2DFC0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.45);
        opacity: ${BADGE_OPACITY};
        transition: opacity 0.35s ease, transform 0.35s ease;
      `;
      badge.innerHTML = MILESTONE_ICONS[ms.kind];
      el.appendChild(badge);

      const showPopup = () => {
        if (hoverPopupRef.current) hoverPopupRef.current.remove();
        const content = document.createElement('div');
        content.style.cssText = `
          padding: 12px;
          min-width: 220px;
          background: linear-gradient(135deg, #E8C9A1 0%, #D4A574 100%);
          border: 2px solid #5C3317;
          border-radius: 8px;
          color: #1F2937;
        `;
        content.innerHTML = `
          <div style="font-weight: 700; font-size: 16px; color: #8B4513; margin-bottom: 6px;">${ms.title}</div>
          <div style="font-size: 14px; line-height: 1.5;">
            <div style="margin-bottom: 4px;">${city.name}, ${city.state}</div>
            <div style="margin-bottom: 4px;">
              <strong style="color: #5C3317;">${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong> · Day ${city.dayNumber}
            </div>
            <div>${ms.note}</div>
          </div>
        `;
        hoverPopupRef.current = openPopup(map.current!, pos, content, {
          offset: 24,
          maxWidth: '280px',
          className: 'hover-popup',
          badgeSide: ms.side,
        });
      };
      el.addEventListener('mouseenter', () => {
        badge.style.opacity = '1';
        showPopup();
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        showPopup();
      });
      el.addEventListener('mouseleave', () => {
        badge.style.opacity = String(BADGE_OPACITY);
        if (hoverPopupRef.current) {
          hoverPopupRef.current.remove();
          hoverPopupRef.current = null;
        }
      });

      const place = SIDE_PLACEMENT[ms.side];
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: place.anchor,
        offset: [place.offset[0] + (ms.nudge?.[0] ?? 0), place.offset[1] + (ms.nudge?.[1] ?? 0)],
      })
        .setLngLat(pos)
        .addTo(map.current!);
      markersRef.current.push(marker);
      milestoneEls.current.set(city.id, badge);
    });

    // in replay mode, restore the "reached / not yet reached" look
    if (mode === 'replay') {
      applyMarkerProgress(markerEls.current, milestoneEls.current, Math.max(passedRef.current, 0));
    }

    // never show a marker that has moved outside the map window (e.g. when zoomed in)
    const m = map.current as mapboxgl.Map;
    const updateVisibility = () => {
      const box = m.getContainer();
      const w = box.clientWidth;
      const h = box.clientHeight;
      markersRef.current.forEach((marker) => {
        const p = m.project(marker.getLngLat());
        const outside = p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50;
        marker.getElement().style.visibility = outside ? 'hidden' : 'visible';
      });
    };
    m.on('move', updateVisibility);
    m.on('resize', updateVisibility);
    updateVisibility();

    return () => {
      m.off('move', updateVisibility);
      m.off('resize', updateVisibility);
    };
  }, [layer, isLoading, mode]);

  const mapButtons = (
    <div className="absolute top-2 left-6 z-10 flex items-center gap-2">
      <button
        onClick={() => setIsFullscreen((prev) => !prev)}
        style={MAP_BUTTON_STYLE}
        className={MAP_BUTTON_CLASS}
      >
        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
      </button>
      {mode === 'replay' && (
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause journey replay' : 'Play journey replay'}
          style={MAP_BUTTON_STYLE}
          className={MAP_BUTTON_CLASS}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>
      )}
      {mode === 'replay' && !playing && (
        <>
          <button
            onClick={() => stepStop(-1)}
            aria-label="Back one day"
            title="Back one day"
            style={MAP_BUTTON_STYLE}
            className={MAP_BUTTON_CLASS}
          >
            <SkipBack size={14} />
          </button>
          <button
            onClick={() => stepStop(1)}
            aria-label="Forward one day"
            title="Forward one day"
            style={MAP_BUTTON_STYLE}
            className={MAP_BUTTON_CLASS}
          >
            <SkipForward size={14} />
          </button>
        </>
      )}
    </div>
  );

  const replayCaption =
    mode === 'replay' && caption ? (
      <div className={isFullscreen ? 'w-full px-4 py-2' : 'max-w-3xl mx-auto w-full px-4 mt-2'}>
        <div
          style={{
            backgroundColor: '#2a1a08',
            color: '#F2DFC0',
            border: '1px solid rgba(242,223,192,0.35)',
          }}
          className="rounded-lg px-3 py-2 text-[11px] sm:text-sm font-semibold text-center leading-tight sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis"
        >
          {captionText(caption)}
        </div>
      </div>
    ) : null;

  const routeToggle = (
    <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-4">
      <button
        onClick={() => setMode('replay')}
        aria-pressed={mode === 'replay'}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap border-2 cursor-pointer ${
          mode === 'replay'
            ? 'bg-r4n-primary border-r4n-tan text-r4n-tan shadow-md'
            : 'bg-transparent border-r4n-tan text-r4n-tan hover:bg-r4n-primary/20'
        }`}
      >
        <span className="inline-flex items-center gap-1">
          <Play size={14} />
          Journey Replay
        </span>
      </button>
      <button
        onClick={() => setMode('c2c2c')}
        aria-pressed={mode === 'c2c2c'}
        style={mode === 'c2c2c' ? { backgroundColor: ROUTE_COLORS.c2c2c } : undefined}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap border-2 cursor-pointer ${
          mode === 'c2c2c'
            ? 'bg-r4n-primary border-r4n-tan text-r4n-tan shadow-md'
            : 'bg-transparent border-r4n-tan text-r4n-tan hover:bg-r4n-primary/20'
        }`}
      >
        Coast to Coast to Canyon
      </button>
      <button
        onClick={() => setMode('mse')}
        aria-pressed={mode === 'mse'}
        style={
          mode === 'mse'
            ? { backgroundColor: ROUTE_COLORS.mse, borderColor: ROUTE_COLORS.mse }
            : undefined
        }
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap border-2 cursor-pointer ${
          mode === 'mse'
            ? 'text-r4n-warm-cream shadow-md'
            : 'bg-transparent border-r4n-sage/30 text-r4n-sage/50 hover:border-r4n-sage hover:text-r4n-sage'
        }`}
      >
        Mountain States Exploration
      </button>
    </div>
  );

  const legend = (
    <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 transition-colors max-w-3xl mx-auto">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Map Legend</h3>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="h-1 w-8 rounded" style={{ backgroundColor: ROUTE_COLORS.c2c2c }}></div>
          <span className="text-gray-700 dark:text-gray-300">Coast to Coast to Canyon</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1 w-8 rounded" style={{ backgroundColor: ROUTE_COLORS.mse }}></div>
          <span className="text-gray-700 dark:text-gray-300">Mountain States Exploration</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id={isFullscreen ? undefined : 'map'}
      className={isFullscreen
        ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col overflow-hidden'
        : 'w-full'
      }
    >
      <MapControls layer={layer} onLayerChange={setLayer} />
      {routeToggle}

      <div className={isFullscreen
        ? 'relative flex-1 min-h-0'
        : 'relative max-w-3xl mx-auto px-4'
      }>
        <div
          ref={mapContainer}
          className={isFullscreen
            ? 'w-full h-full'
            : 'w-full h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg'
          }
        />
        {mapButtons}

        {isLoading && (
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center${isFullscreen ? '' : ' rounded-lg'}`}>
            <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-gray-700 font-semibold">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {replayCaption}

      {!isFullscreen && legend}
    </div>
  );
}
