import { Fragment } from 'react';
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

export type SegmentSummary = {
  count: number;
  distance: number;
  totalSecs: number;
  calories: number;
  ascent: number;
  descent: number;
};

export interface WorkoutTableSegment {
  key: string;
  headerLabel: string;
  headerClassName: string;
  rows: DateRow[];
  summaryLabel: string;
  summary: SegmentSummary;
  summaryClassName: string;
}

interface Props {
  cumulativeLabel: string;
  cumulativeSummary: SegmentSummary;
  cumulativeClassName: string;
  segments: WorkoutTableSegment[];
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

// ─── Column definitions (display only — table is not sortable) ────────────────

const COLUMN_LABELS = [
  'Route', 'Date', 'Miles', 'Time', 'Avg HR', 'Max HR',
  '↑ Ascent', '↓ Descent', 'Max Elev', 'Avg MPH', 'Calories', 'Min °F', 'Max °F', 'Avg °F',
];
const COLUMN_COUNT = COLUMN_LABELS.length;

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

// Summary rows only ever show ride count, distance, moving time, calories,
// ascent, descent — date/title/HR/temp/elevation/route image don't apply to
// a rollup.
function SummaryRow({ label, summary, className }: { label: string; summary: SegmentSummary; className: string }) {
  const avgMPH = summary.distance / (summary.totalSecs / 3600);
  return (
    <tr className={className}>
      <td colSpan={2} className="px-3 py-3">
        {label} · {summary.count} {summary.count === 1 ? 'ride' : 'rides'}
      </td>
      <td className="px-3 py-3 text-right">{fmt1(summary.distance)}</td>
      <td className="px-3 py-3">{formatDuration(summary.totalSecs)}</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">{fmtInt(summary.ascent)}</td>
      <td className="px-3 py-3 text-right">{fmtInt(summary.descent)}</td>
      <td className="px-3 py-3 text-right">—</td>
      <td className="px-3 py-3 text-right">{fmt1(avgMPH)}</td>
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
      <td colSpan={COLUMN_COUNT} className={`px-3 py-2 font-bold text-sm uppercase tracking-wide ${className}`}>
        {label}
      </td>
    </tr>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkoutTable({ cumulativeLabel, cumulativeSummary, cumulativeClassName, segments }: Props) {
  return (
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
            <SummaryRow label={cumulativeLabel} summary={cumulativeSummary} className={cumulativeClassName} />
            {segments.map((segment) => (
              <Fragment key={segment.key}>
                <SectionHeaderRow label={segment.headerLabel} className={segment.headerClassName} />
                {segment.rows.map((row) => (
                  <DataRow key={row.date} row={row} />
                ))}
                <SummaryRow
                  label={segment.summaryLabel}
                  summary={segment.summary}
                  className={segment.summaryClassName}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
