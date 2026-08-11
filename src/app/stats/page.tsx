import Link from 'next/link';
import activitiesData from '@/data/activities.json';
import RouteImageCell from '@/components/stats/RouteImageCell';

// ─── Types ──────────────────────────────────────────────────────────────────

type Activity = {
  date: string;
  title: string;
  distance: number;
  calories: number;
  avgHR: number | null;
  maxHR: number | null;
  totalAscent: number;
  totalDescent: number;
  minTemp: number;
  maxTemp: number;
  movingTime: string; // "H:MM:SS"
  maxElevation: number;
};

type DateRow = {
  date: string;
  distance: number;
  totalSecs: number;
  calories: number;
  ascent: number;
  descent: number;
  maxElev: number;
  avgHR: number | null;
  maxHR: number | null;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  avgMPH: number;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseSeconds(time: string): number {
  const [h, m, s] = time.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function fmt1(n: number) {
  return n.toFixed(1);
}

function fmtInt(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

function formatDateLabel(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function sumBy(acts: Activity[], key: 'distance' | 'calories' | 'totalAscent' | 'totalDescent'): number {
  return acts.reduce((s, a) => s + a[key], 0);
}

// ─── Computations ─────────────────────────────────────────────────────────────

const activities: Activity[] = activitiesData as Activity[];

// Group by date
const grouped = activities.reduce<Record<string, Activity[]>>((acc, a) => {
  if (!acc[a.date]) acc[a.date] = [];
  acc[a.date].push(a);
  return acc;
}, {});

const dateRows: DateRow[] = Object.entries(grouped)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([date, acts]) => {
    const distance = acts.reduce((s, a) => s + a.distance, 0);
    const totalSecs = acts.reduce((s, a) => s + parseSeconds(a.movingTime), 0);
    const calories = acts.reduce((s, a) => s + a.calories, 0);
    const ascent = acts.reduce((s, a) => s + a.totalAscent, 0);
    const descent = acts.reduce((s, a) => s + a.totalDescent, 0);
    const maxElev = Math.max(...acts.map((a) => a.maxElevation));

    const hrVals = acts.filter((a) => a.avgHR !== null).map((a) => a.avgHR as number);
    const avgHR = hrVals.length > 0 ? hrVals.reduce((s, v) => s + v, 0) / hrVals.length : null;

    const maxHRVals = acts.filter((a) => a.maxHR !== null).map((a) => a.maxHR as number);
    const maxHR = maxHRVals.length > 0 ? Math.max(...maxHRVals) : null;

    const minTemp = Math.min(...acts.map((a) => a.minTemp));
    const maxTemp = Math.max(...acts.map((a) => a.maxTemp));
    const midTemps = acts.map((a) => (a.minTemp + a.maxTemp) / 2);
    const avgTemp = midTemps.reduce((s, v) => s + v, 0) / midTemps.length;

    const avgMPH = distance / (totalSecs / 3600);

    return { date, distance, totalSecs, calories, ascent, descent, maxElev, avgHR, maxHR, minTemp, maxTemp, avgTemp, avgMPH };
  });

// Summary stats — cumulative across ALL activities (drives the top stat cards)
const totalMiles = activities.reduce((s, a) => s + a.distance, 0);
const totalSecs = activities.reduce((s, a) => s + parseSeconds(a.movingTime), 0);
const totalCalories = activities.reduce((s, a) => s + a.calories, 0);
const totalAscent = activities.reduce((s, a) => s + a.totalAscent, 0);
const totalDescent = activities.reduce((s, a) => s + a.totalDescent, 0);

const allHR = activities.filter((a) => a.avgHR !== null).map((a) => a.avgHR as number);
const overallAvgHR = allHR.length > 0 ? Math.round(allHR.reduce((s, v) => s + v, 0) / allHR.length) : null;

const allMidTemps = activities.map((a) => (a.minTemp + a.maxTemp) / 2);
const overallAvgTemp = allMidTemps.reduce((s, v) => s + v, 0) / allMidTemps.length;

const ROUTE_TOTAL_MILES = 4444;
const routeProgress = (totalMiles / ROUTE_TOTAL_MILES) * 100;

const totalAvgMPH = totalMiles / (totalSecs / 3600);

// ─── Summary card data ────────────────────────────────────────────────────────

const summaryCards = [
  { icon: '🚴', label: 'Miles Cycled', value: `${fmt1(totalMiles)} mi`, highlight: true },
  { icon: '⏱', label: 'Moving Time', value: formatDuration(totalSecs) },
  { icon: '🔥', label: 'Calories Burned', value: `${fmtInt(totalCalories)} kcal` },
  { icon: '❤️', label: 'Avg Heart Rate', value: overallAvgHR ? `${overallAvgHR} bpm` : '—' },
  { icon: '⬆️', label: 'Total Ascent', value: `${fmtInt(totalAscent)} ft` },
  { icon: '⬇️', label: 'Total Descent', value: `${fmtInt(totalDescent)} ft` },
  { icon: '🌡', label: 'Avg Temperature', value: `${Math.round(overallAvgTemp)}°F` },
  { icon: '💨', label: 'Avg Speed', value: `${fmt1(totalAvgMPH)} mph` },
];

// ─── Segmented table data ──────────────────────────────────────────────────────
// Mountain States Exploration: Jul 24, 2026 onward
// Coast to Coast to Canyon: Feb 27 – Jul 4, 2026 (Jul 4 Flagstaff ride is the final C2C2C ride)

const MSE_CUTOFF = '2026-07-24';

const mseActivities = activities.filter((a) => a.date >= MSE_CUTOFF);
const c2c2cActivities = activities.filter((a) => a.date < MSE_CUTOFF);

const mseDateRows = dateRows.filter((r) => r.date >= MSE_CUTOFF).slice().sort((a, b) => b.date.localeCompare(a.date));
const c2c2cDateRows = dateRows.filter((r) => r.date < MSE_CUTOFF).slice().sort((a, b) => b.date.localeCompare(a.date));

const cumulativeSummary = {
  count: activities.length,
  distance: totalMiles,
  calories: totalCalories,
  ascent: totalAscent,
  descent: totalDescent,
};

const mseSummary = {
  count: mseActivities.length,
  distance: sumBy(mseActivities, 'distance'),
  calories: sumBy(mseActivities, 'calories'),
  ascent: sumBy(mseActivities, 'totalAscent'),
  descent: sumBy(mseActivities, 'totalDescent'),
};

const c2c2cSummary = {
  count: c2c2cActivities.length,
  distance: sumBy(c2c2cActivities, 'distance'),
  calories: sumBy(c2c2cActivities, 'calories'),
  ascent: sumBy(c2c2cActivities, 'totalAscent'),
  descent: sumBy(c2c2cActivities, 'totalDescent'),
};

// ─── Column definitions (display only — table is not sortable) ────────────────

const COLUMN_LABELS = [
  'Route', 'Date', 'Miles', 'Time', 'Avg HR', 'Max HR',
  '↑ Ascent', '↓ Descent', 'Max Elev', 'Avg MPH', 'Calories', 'Min °F', 'Max °F', 'Avg °F',
];

// ─── Row renderers ──────────────────────────────────────────────────────────

function DataRow({ row }: { row: DateRow }) {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-gray-700 dark:text-gray-300">
      <td className="px-3 py-3">
        <RouteImageCell date={row.date} dateLabel={formatDateLabel(row.date)} />
      </td>
      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white">{formatDateLabel(row.date)}</td>
      <td className="px-3 py-3 text-right">{fmt1(row.distance)}</td>
      <td className="px-3 py-3">{formatDuration(row.totalSecs)}</td>
      <td className="px-3 py-3 text-right">{row.avgHR !== null ? Math.round(row.avgHR) : '—'}</td>
      <td className="px-3 py-3 text-right">{row.maxHR !== null ? row.maxHR : '—'}</td>
      <td className="px-3 py-3 text-right">{fmtInt(row.ascent)}</td>
      <td className="px-3 py-3 text-right">{fmtInt(row.descent)}</td>
      <td className="px-3 py-3 text-right">{fmtInt(row.maxElev)}</td>
      <td className="px-3 py-3 text-right">{fmt1(row.avgMPH)}</td>
      <td className="px-3 py-3 text-right">{fmtInt(row.calories)}</td>
      <td className="px-3 py-3 text-right">{fmt1(row.minTemp)}</td>
      <td className="px-3 py-3 text-right">{fmt1(row.maxTemp)}</td>
      <td className="px-3 py-3 text-right">{fmt1(row.avgTemp)}</td>
    </tr>
  );
}

type SegmentSummary = { count: number; distance: number; calories: number; ascent: number; descent: number };

function SummaryRow({
  label,
  summary,
  className,
}: {
  label: string;
  summary: SegmentSummary;
  className: string;
}) {
  return (
    <tr className={className}>
      <td colSpan={2} className="px-3 py-3">
        {label} · {summary.count} {summary.count === 1 ? 'ride' : 'rides'}
      </td>
      <td className="px-3 py-3 text-right">{fmt1(summary.distance)}</td>
      <td className="px-3 py-3">—</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">{fmtInt(summary.ascent)}</td>
      <td className="px-3 py-3 text-right">{fmtInt(summary.descent)}</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">{fmtInt(summary.calories)}</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">—</td>
    </tr>
  );
}

function SectionHeaderRow({ label, className }: { label: string; className: string }) {
  return (
    <tr>
      <td colSpan={14} className={`px-3 py-2 font-bold text-sm uppercase tracking-wide ${className}`}>
        {label}
      </td>
    </tr>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 transition-colors">

      {/* Hero */}
      <div style={{ backgroundColor: '#2a1a08' }} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-block mb-4 text-r4n-tan-dark hover:text-r4n-tan transition text-sm font-semibold"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-r4n-grass">Cycling Stats</h1>
          <p className="text-r4n-tan text-lg">
            Roll 4 Nature 2026 — Key West, FL to Flagstaff, AZ
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── Summary Cards ─────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center text-center gap-1"
              >
                <span className="text-2xl" aria-hidden="true">{card.icon}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {card.label}
                </span>
                <span
                  className={`text-xl font-bold font-mono ${
                    card.highlight
                      ? 'text-r4n-primary dark:text-r4n-primary-hover'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {card.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Route Progress ────────────────────────────────── */}
        <section>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {routeProgress.toFixed(2)}% of {ROUTE_TOTAL_MILES.toLocaleString('en-US')} mi route complete
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-r4n-primary rounded-full"
              style={{ width: `${routeProgress.toFixed(2)}%` }}
              role="progressbar"
              aria-valuenow={parseFloat(routeProgress.toFixed(2))}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {fmt1(totalMiles)} / {ROUTE_TOTAL_MILES.toLocaleString('en-US')} mi
          </p>
        </section>

        {/* ── Workout Breakdown Table ───────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Workout Breakdown</h2>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-r4n-secondary text-white text-xs uppercase tracking-wide">
                    {COLUMN_LABELS.map((label) => (
                      <th key={label} className={`px-3 py-3 ${label !== 'Route' && label !== 'Date' && label !== 'Time' ? 'text-right' : ''}`}>
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                  <SummaryRow
                    label="🗺️ All Rides — Cumulative Total"
                    summary={cumulativeSummary}
                    className="bg-gray-200 dark:bg-gray-700 font-bold text-gray-900 dark:text-white border-b-2 border-gray-400 dark:border-gray-500"
                  />

                  <SectionHeaderRow
                    label="🏔️ Mountain States Exploration — Jul 24, 2026 onward"
                    className="bg-r4n-sage text-white"
                  />
                  {mseDateRows.map((row) => (
                    <DataRow key={row.date} row={row} />
                  ))}
                  <SummaryRow
                    label="🏔️ Mountain States Exploration Subtotal"
                    summary={mseSummary}
                    className="bg-r4n-sage-light/40 dark:bg-r4n-sage/20 font-semibold text-gray-900 dark:text-white"
                  />

                  <SectionHeaderRow
                    label="🚴 Coast to Coast to Canyon — Feb 27 – Jul 4, 2026"
                    className="bg-r4n-primary text-white"
                  />
                  {c2c2cDateRows.map((row) => (
                    <DataRow key={row.date} row={row} />
                  ))}
                  <SummaryRow
                    label="🚴 Coast to Coast to Canyon Subtotal"
                    summary={c2c2cSummary}
                    className="bg-r4n-primary/10 dark:bg-r4n-primary/20 font-semibold text-gray-900 dark:text-white"
                  />

                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Multiple rides on the same date are combined into a single row.
          </p>
        </section>

      </div>
    </div>
  );
}
