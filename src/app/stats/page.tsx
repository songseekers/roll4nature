import Link from 'next/link';
import activitiesData from '@/data/activities.json';
import WorkoutTable from '@/components/stats/WorkoutTable';
import type { DateRow, WorkoutTableSegment } from '@/components/stats/WorkoutTable';

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

function sumBy(acts: Activity[], key: 'distance' | 'calories' | 'totalAscent' | 'totalDescent'): number {
  return acts.reduce((s, a) => s + a[key], 0);
}

function sumSeconds(acts: Activity[]): number {
  return acts.reduce((s, a) => s + parseSeconds(a.movingTime), 0);
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
  totalSecs,
  calories: totalCalories,
  ascent: totalAscent,
  descent: totalDescent,
};

const mseSummary = {
  count: mseActivities.length,
  distance: sumBy(mseActivities, 'distance'),
  totalSecs: sumSeconds(mseActivities),
  calories: sumBy(mseActivities, 'calories'),
  ascent: sumBy(mseActivities, 'totalAscent'),
  descent: sumBy(mseActivities, 'totalDescent'),
};

const c2c2cSummary = {
  count: c2c2cActivities.length,
  distance: sumBy(c2c2cActivities, 'distance'),
  totalSecs: sumSeconds(c2c2cActivities),
  calories: sumBy(c2c2cActivities, 'calories'),
  ascent: sumBy(c2c2cActivities, 'totalAscent'),
  descent: sumBy(c2c2cActivities, 'totalDescent'),
};

const tableSegments: WorkoutTableSegment[] = [
  {
    key: 'mse',
    headerLabel: '🏔️ Mountain States Exploration — Jul 24, 2026 onward',
    headerClassName: 'bg-r4n-sage text-white',
    rows: mseDateRows,
    summaryLabel: '🏔️ Mountain States Exploration Subtotal',
    summary: mseSummary,
    summaryClassName: 'bg-r4n-sage-light/40 dark:bg-r4n-sage/20 font-semibold text-gray-900 dark:text-white',
  },
  {
    key: 'c2c2c',
    headerLabel: '🚴 Coast to Coast to Canyon — Feb 27 – Jul 4, 2026',
    headerClassName: 'bg-r4n-primary text-white',
    rows: c2c2cDateRows,
    summaryLabel: '🚴 Coast to Coast to Canyon Subtotal',
    summary: c2c2cSummary,
    summaryClassName: 'bg-r4n-primary/10 dark:bg-r4n-primary/20 font-semibold text-gray-900 dark:text-white',
  },
];

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
          <WorkoutTable
            cumulativeLabel="🗺️ All Rides — Cumulative Total"
            cumulativeSummary={cumulativeSummary}
            cumulativeClassName="bg-gray-200 dark:bg-gray-700 font-bold text-gray-900 dark:text-white border-b-2 border-gray-400 dark:border-gray-500"
            segments={tableSegments}
          />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Multiple rides on the same date are combined into a single row.
          </p>
        </section>

      </div>
    </div>
  );
}
