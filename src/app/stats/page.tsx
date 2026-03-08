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

// ─── Computations ─────────────────────────────────────────────────────────────

const activities: Activity[] = activitiesData as Activity[];

// Group by date
const grouped = activities.reduce<Record<string, Activity[]>>((acc, a) => {
  if (!acc[a.date]) acc[a.date] = [];
  acc[a.date].push(a);
  return acc;
}, {});

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

// Summary stats
const totalMiles = activities.reduce((s, a) => s + a.distance, 0);
const totalSecs = activities.reduce((s, a) => s + parseSeconds(a.movingTime), 0);
const totalCalories = activities.reduce((s, a) => s + a.calories, 0);
const totalAscent = activities.reduce((s, a) => s + a.totalAscent, 0);
const totalDescent = activities.reduce((s, a) => s + a.totalDescent, 0);

const allHR = activities.filter((a) => a.avgHR !== null).map((a) => a.avgHR as number);
const overallAvgHR = allHR.length > 0 ? Math.round(allHR.reduce((s, v) => s + v, 0) / allHR.length) : null;

const allMidTemps = activities.map((a) => (a.minTemp + a.maxTemp) / 2);
const overallAvgTemp = allMidTemps.reduce((s, v) => s + v, 0) / allMidTemps.length;

const ROUTE_TOTAL_MILES = 4434;
const routeProgress = (totalMiles / ROUTE_TOTAL_MILES) * 100;

// Totals row values
const totalMaxHR = Math.max(...activities.filter((a) => a.maxHR !== null).map((a) => a.maxHR as number));
const totalMaxElev = Math.max(...activities.map((a) => a.maxElevation));
const totalAvgMPH = totalMiles / (totalSecs / 3600);

// Temperature averages across date rows for totals
const avgMinTempAcrossDates = dateRows.reduce((s, r) => s + r.minTemp, 0) / dateRows.length;
const avgMaxTempAcrossDates = dateRows.reduce((s, r) => s + r.maxTemp, 0) / dateRows.length;
const avgTempAcrossDates = dateRows.reduce((s, r) => s + r.avgTemp, 0) / dateRows.length;

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 transition-colors">

      {/* Hero */}
      <div className="bg-gradient-to-r from-r4v-primary to-r4v-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-block mb-4 text-white/80 hover:text-white transition text-sm font-semibold"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cycling Stats</h1>
          <p className="text-white/80 text-lg">
            Roll for Veterans 2026 — Key West, FL to Flagstaff, AZ
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
                      ? 'text-r4v-primary dark:text-r4v-primary-hover'
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
              className="h-full bg-r4v-primary rounded-full"
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
                  <tr className="bg-r4v-secondary text-white text-xs uppercase tracking-wide">
                    <th className="px-3 py-3">Route</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3 text-right">Miles</th>
                    <th className="px-3 py-3">Time</th>
                    <th className="px-3 py-3 text-right">Avg HR</th>
                    <th className="px-3 py-3 text-right">Max HR</th>
                    <th className="px-3 py-3 text-right">↑ Ascent</th>
                    <th className="px-3 py-3 text-right">↓ Descent</th>
                    <th className="px-3 py-3 text-right">Max Elev</th>
                    <th className="px-3 py-3 text-right">Avg MPH</th>
                    <th className="px-3 py-3 text-right">Calories</th>
                    <th className="px-3 py-3 text-right">Min °F</th>
                    <th className="px-3 py-3 text-right">Max °F</th>
                    <th className="px-3 py-3 text-right">Avg °F</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dateRows.map((row) => (
                    <tr
                      key={row.date}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800/60 transition text-gray-700 dark:text-gray-300"
                    >
                      <td className="px-3 py-3">
                        <RouteImageCell date={row.date} dateLabel={formatDateLabel(row.date)} />
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                        {formatDateLabel(row.date)}
                      </td>
                      <td className="px-3 py-3 text-right">{fmt1(row.distance)}</td>
                      <td className="px-3 py-3">{formatDuration(row.totalSecs)}</td>
                      <td className="px-3 py-3 text-right">
                        {row.avgHR !== null ? Math.round(row.avgHR) : '—'}
                      </td>
                      <td className="px-3 py-3 text-right">
                        {row.maxHR !== null ? row.maxHR : '—'}
                      </td>
                      <td className="px-3 py-3 text-right">{fmtInt(row.ascent)}</td>
                      <td className="px-3 py-3 text-right">{fmtInt(row.descent)}</td>
                      <td className="px-3 py-3 text-right">{fmtInt(row.maxElev)}</td>
                      <td className="px-3 py-3 text-right">{fmt1(row.avgMPH)}</td>
                      <td className="px-3 py-3 text-right">{fmtInt(row.calories)}</td>
                      <td className="px-3 py-3 text-right">{fmt1(row.minTemp)}</td>
                      <td className="px-3 py-3 text-right">{fmt1(row.maxTemp)}</td>
                      <td className="px-3 py-3 text-right">{fmt1(row.avgTemp)}</td>
                    </tr>
                  ))}
                </tbody>
                {/* Totals row */}
                <tfoot>
                  <tr className="bg-r4v-primary/10 dark:bg-r4v-primary/20 font-semibold text-gray-900 dark:text-white border-t-2 border-r4v-primary/30">
                    <td className="px-3 py-3">—</td>
                    <td className="px-3 py-3">Totals / Avg</td>
                    <td className="px-3 py-3 text-right text-r4v-primary dark:text-r4v-primary-hover">
                      {fmt1(totalMiles)}
                    </td>
                    <td className="px-3 py-3">{formatDuration(totalSecs)}</td>
                    <td className="px-3 py-3 text-right">
                      {overallAvgHR ? `${overallAvgHR} avg` : '—'}
                    </td>
                    <td className="px-3 py-3 text-right">{totalMaxHR} max</td>
                    <td className="px-3 py-3 text-right">{fmtInt(totalAscent)}</td>
                    <td className="px-3 py-3 text-right">{fmtInt(totalDescent)}</td>
                    <td className="px-3 py-3 text-right">{totalMaxElev} max</td>
                    <td className="px-3 py-3 text-right">{fmt1(totalAvgMPH)}</td>
                    <td className="px-3 py-3 text-right">{fmtInt(totalCalories)}</td>
                    <td className="px-3 py-3 text-right">{fmt1(avgMinTempAcrossDates)} avg</td>
                    <td className="px-3 py-3 text-right">{fmt1(avgMaxTempAcrossDates)} avg</td>
                    <td className="px-3 py-3 text-right">{fmt1(avgTempAcrossDates)}</td>
                  </tr>
                </tfoot>
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
