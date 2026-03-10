'use client';

import { useState } from 'react';
import RouteImageCell from './RouteImageCell';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DateRow = {
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

type SortKey = keyof DateRow;
type SortDir = 'asc' | 'desc';

export interface WorkoutTableTotals {
  totalMiles: number;
  totalSecs: number;
  totalCalories: number;
  totalAscent: number;
  totalDescent: number;
  overallAvgHR: number | null;
  totalMaxHR: number;
  totalMaxElev: number;
  totalAvgMPH: number;
  avgMinTemp: number;
  avgMaxTemp: number;
  avgTemp: number;
}

interface Props {
  rows: DateRow[];
  totals: WorkoutTableTotals;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return `${h}h ${m}m`;
}

function fmt1(n: number) { return n.toFixed(1); }
function fmtInt(n: number) { return Math.round(n).toLocaleString('en-US'); }

function formatDateLabel(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

// ─── Sort helpers ─────────────────────────────────────────────────────────────

function getValue(row: DateRow, key: SortKey): number | string {
  const v = row[key];
  return v === null ? -Infinity : v;
}

function sortRows(rows: DateRow[], key: SortKey, dir: SortDir): DateRow[] {
  return [...rows].sort((a, b) => {
    const av = getValue(a, key);
    const bv = getValue(b, key);
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });
}

// ─── Column definitions ───────────────────────────────────────────────────────

type ColDef = { label: string; key: SortKey | null; align?: 'right' };

const COLUMNS: ColDef[] = [
  { label: 'Route',    key: null },
  { label: 'Date',     key: 'date' },
  { label: 'Miles',    key: 'distance',  align: 'right' },
  { label: 'Time',     key: 'totalSecs' },
  { label: 'Avg HR',   key: 'avgHR',     align: 'right' },
  { label: 'Max HR',   key: 'maxHR',     align: 'right' },
  { label: '↑ Ascent', key: 'ascent',    align: 'right' },
  { label: '↓ Descent',key: 'descent',   align: 'right' },
  { label: 'Max Elev', key: 'maxElev',   align: 'right' },
  { label: 'Avg MPH',  key: 'avgMPH',    align: 'right' },
  { label: 'Calories', key: 'calories',  align: 'right' },
  { label: 'Min °F',   key: 'minTemp',   align: 'right' },
  { label: 'Max °F',   key: 'maxTemp',   align: 'right' },
  { label: 'Avg °F',   key: 'avgTemp',   align: 'right' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutTable({ rows, totals }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  function handleSort(key: SortKey | null) {
    if (!key) return;
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const sorted = sortRows(rows, sortKey, sortDir);

  function indicator(key: SortKey | null) {
    if (!key) return null;
    if (key !== sortKey) return <span className="ml-1 opacity-30">⇅</span>;
    return <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>;
  }

  const t = totals;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead>
            <tr className="bg-r4v-secondary text-white text-xs uppercase tracking-wide">
              {COLUMNS.map((col) => (
                <th
                  key={col.label}
                  className={`px-3 py-3 ${col.align === 'right' ? 'text-right' : ''} ${col.key ? 'cursor-pointer select-none hover:bg-white/10 transition' : ''}`}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{indicator(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sorted.map((row) => (
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
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-r4v-primary/10 dark:bg-r4v-primary/20 font-semibold text-gray-900 dark:text-white border-t-2 border-r4v-primary/30">
              <td className="px-3 py-3">—</td>
              <td className="px-3 py-3">Totals / Avg</td>
              <td className="px-3 py-3 text-right text-r4v-primary dark:text-r4v-primary-hover">{fmt1(t.totalMiles)}</td>
              <td className="px-3 py-3">{formatDuration(t.totalSecs)}</td>
              <td className="px-3 py-3 text-right">{t.overallAvgHR ? `${t.overallAvgHR} avg` : '—'}</td>
              <td className="px-3 py-3 text-right">{t.totalMaxHR} max</td>
              <td className="px-3 py-3 text-right">{fmtInt(t.totalAscent)}</td>
              <td className="px-3 py-3 text-right">{fmtInt(t.totalDescent)}</td>
              <td className="px-3 py-3 text-right">{t.totalMaxElev} max</td>
              <td className="px-3 py-3 text-right">{fmt1(t.totalAvgMPH)}</td>
              <td className="px-3 py-3 text-right">{fmtInt(t.totalCalories)}</td>
              <td className="px-3 py-3 text-right">{fmt1(t.avgMinTemp)} avg</td>
              <td className="px-3 py-3 text-right">{fmt1(t.avgMaxTemp)} avg</td>
              <td className="px-3 py-3 text-right">{fmt1(t.avgTemp)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
