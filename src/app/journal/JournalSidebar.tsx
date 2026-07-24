'use client';

import { useState } from 'react';

interface DayNav {
  num: number;
  date: string;
}

interface StateNav {
  state: string;
  displayName?: string;
  days: DayNav[];
}

export default function JournalSidebar({ states }: { states: StateNav[] }) {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>(
    () => Object.fromEntries(states.map(s => [s.state, true]))
  );

  const toggleState = (state: string) => {
    setExpandedStates(prev => ({ ...prev, [state]: !prev[state] }));
  };

  const scrollToDay = (dayNum: number) => {
    setActiveDay(dayNum);
    const el = document.getElementById(`day-${dayNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToState = (state: string) => {
    const el = document.getElementById(`state-${state.toLowerCase().replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 min-w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="text-xs font-bold text-r4n-primary uppercase tracking-widest mb-1">Roll 4 Nature</div>
        <div className="text-base font-semibold text-gray-700 dark:text-gray-200">ROLLING</div>
      </div>
      <nav className="p-4 flex-1">
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
                        Day {d.num} · {d.date.split(',')[0]}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
