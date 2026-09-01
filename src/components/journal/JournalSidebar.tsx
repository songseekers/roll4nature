'use client';

import { useEffect, useState } from 'react';

interface DayNav {
  num: number;
  date: string;
}

interface StateNav {
  state: string;
  displayName?: string;
  days: DayNav[];
}

interface JournalSidebarProps {
  states: StateNav[];
  bannerLabel?: string;
  bannerTitle?: string;
  emptyMessage?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// "Monday, July 30, 2026" -> "7-30-26"
function formatShortDate(dateStr: string): string {
  const parts = dateStr.split(', ');
  if (parts.length < 3) return dateStr;
  const [monthName, dayStr] = parts[1].split(' ');
  const month = MONTHS.indexOf(monthName) + 1;
  const day = parseInt(dayStr, 10);
  const yy = parts[2].slice(-2);
  if (!month || Number.isNaN(day)) return dateStr;
  return `${month}-${day}-${yy}`;
}

// "Monday, July 30, 2026" -> "Mon"
function formatWeekdayAbbr(dateStr: string): string {
  return dateStr.split(',')[0].slice(0, 3);
}

export default function JournalSidebar({
  states,
  bannerLabel = 'Roll 4 Nature',
  bannerTitle = 'ROLLING',
  emptyMessage = 'No entries yet. Check back soon!',
}: JournalSidebarProps) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(
    () => Object.fromEntries(states.map(s => [s.state, true]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const latestDay = states
    .flatMap(s => s.days)
    .reduce((max, d) => (d.num > max ? d.num : max), 0);

  const toggleState = (state: string) => {
    setExpandedStates(prev => ({ ...prev, [state]: !prev[state] }));
  };

  const scrollToDay = (dayNum: number) => {
    setActiveDay(dayNum);
    const el = document.getElementById(`day-${dayNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const scrollToState = (state: string) => {
    const el = document.getElementById(`state-${state.toLowerCase().replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const jumpToLatest = () => {
    if (latestDay > 0) scrollToDay(latestDay);
  };

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (mobileOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [mobileOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const navContent = (
    <nav className="p-4 flex-1">
      {states.length === 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic px-2 py-4">{emptyMessage}</p>
      )}
      {states.map((s, stateIndex) => (
        <div key={s.state}>
          {stateIndex > 0 && (
            <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
          )}
          <div className="mb-2">
            <button
              onClick={() => scrollToState(s.state)}
              className="w-full flex items-center justify-between py-2 px-2 rounded text-left group"
            >
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#1a5276' }}>
                {s.displayName ?? s.state}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); toggleState(s.state); }}
                className="text-gray-400 text-sm ml-2"
              >
                {expandedStates[s.state] ? '▾' : '▸'}
              </button>
            </button>
            {expandedStates[s.state] && (
              <ul className="ml-3 mt-1 space-y-0.5">
                {s.days.map(d => (
                  <li key={d.num}>
                    <button
                      onClick={() => scrollToDay(d.num)}
                      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                        activeDay === d.num
                          ? 'bg-r4n-primary/10 text-r4n-primary font-semibold'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      Day {d.num} · {formatShortDate(d.date)} · {formatWeekdayAbbr(d.date)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 min-w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800">
          <div className="text-xs font-bold text-r4n-primary uppercase tracking-widest mb-1">{bannerLabel}</div>
          <div className="text-base font-semibold text-gray-700 dark:text-gray-200">{bannerTitle}</div>
        </div>
        {navContent}
      </aside>

      {/* MOBILE FLOATING CONTROLS */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex flex-row items-center gap-3">
        {latestDay > 0 && (
          <button
            onClick={jumpToLatest}
            aria-label={`Jump to latest entry, Day ${latestDay}`}
            className="flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 active:scale-95 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ color: '#1a5276' }}>
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>
            Latest
          </button>
        )}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open journal navigation"
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform"
          style={{ backgroundColor: '#1a5276' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-xs bg-gray-50 dark:bg-gray-900 shadow-xl flex flex-col overflow-y-auto transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-r4n-primary uppercase tracking-widest mb-1">{bannerLabel}</div>
              <div className="text-base font-semibold text-gray-700 dark:text-gray-200">{bannerTitle}</div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {navContent}
        </aside>
      </div>
    </>
  );
}
