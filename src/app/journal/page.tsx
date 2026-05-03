'use client';

import { useState, useEffect } from 'react';
import { journalDays, stateOrder, stateConfig, JournalDay } from '@/data/journalData';

export default function JournalPage() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({
    Florida: true,
    Mississippi: true,
    Louisiana: true,
    Texas: true,
    'New Mexico': true,
  });

  // Group days by state
  const byState: Record<string, JournalDay[]> = {};
  journalDays.forEach(d => {
    if (!byState[d.state]) byState[d.state] = [];
    // Deduplicate by num (take last occurrence)
    const existing = byState[d.state].findIndex(x => x.num === d.num);
    if (existing >= 0) byState[d.state][existing] = d;
    else byState[d.state].push(d);
  });

  const toggleState = (state: string) => {
    setExpandedStates(prev => ({ ...prev, [state]: !prev[state] }));
  };

  const scrollToDay = (dayNum: number) => {
    setActiveDay(dayNum);
    const el = document.getElementById(`day-${dayNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="flex pt-16">

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col w-72 min-w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <div className="text-xs font-bold text-r4v-primary uppercase tracking-widest mb-1">Roll for Veterans</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Journal</div>
          </div>
          <nav className="p-4 flex-1">
            {stateOrder.map(state => {
              if (!byState[state]) return null;
              const { color } = stateConfig[state];
              const days = byState[state].sort((a, b) => a.num - b.num);
              return (
                <div key={state} className="mb-3">
                  <button
                    onClick={() => toggleState(state)}
                    className="w-full flex items-center justify-between py-1.5 px-2 rounded text-left group"
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color }}
                    >
                      {state}
                    </span>
                    <span className="text-gray-400 text-xs">{expandedStates[state] ? '▾' : '▸'}</span>
                  </button>
                  {expandedStates[state] && (
                    <ul className="ml-3 mt-1 space-y-0.5">
                      {days.map(d => (
                        <li key={d.num}>
                          <button
                            onClick={() => scrollToDay(d.num)}
                            className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                              activeDay === d.num
                                ? 'bg-r4v-primary/10 text-r4v-primary font-semibold'
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
              );
            })}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 py-16 max-w-3xl">

          {/* Title Block */}
          <div className="mb-20 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-bold text-r4v-primary uppercase tracking-widest mb-3">
              Roll for Veterans
            </div>
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-none">
              ROLLING
            </h1>
            <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 italic mb-6">
              A cross-country chronicle
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wide">
              JT Tracy &nbsp;·&nbsp; February 27, 2026 —
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-400">
              <span>Key West, FL</span>
              <span>→</span>
              <span>Los Angeles, CA</span>
              <span>→</span>
              <span>Grand Canyon, AZ</span>
            </div>
          </div>

          {/* Chapters */}
          {stateOrder.map(state => {
            if (!byState[state]) return null;
            const { color, subtitle } = stateConfig[state];
            const days = byState[state].sort((a, b) => a.num - b.num);
            let currentRegion = '';

            return (
              <section key={state} className="mb-24">
                {/* Chapter header */}
                <div className="mb-12 pb-6 border-t-4" style={{ borderColor: color }}>
                  <div className="pt-8 text-center">
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">Chapter</div>
                    <h2 className="text-4xl font-bold mb-2" style={{ color }}>
                      The {state} Chapter
                    </h2>
                    <p className="text-sm text-gray-400 italic mb-4">{subtitle}</p>
                    <div className="text-gray-300 dark:text-gray-600">✦ &nbsp; ✦ &nbsp; ✦</div>
                  </div>
                </div>

                {/* Days */}
                {days.map(d => {
                  const showRegion = d.region !== currentRegion;
                  if (showRegion) currentRegion = d.region;

                  return (
                    <div key={d.num}>
                      {showRegion && (
                        <div className="text-center my-10">
                          <span
                            className="text-xs font-bold uppercase tracking-widest px-4"
                            style={{ color: `${color}99` }}
                          >
                            ── {d.region} ──
                          </span>
                        </div>
                      )}

                      <article
                        id={`day-${d.num}`}
                        className="mb-14 pb-14 border-b border-gray-100 dark:border-gray-800 scroll-mt-20"
                      >
                        {/* Day header */}
                        <div className="mb-2">
                          <span className="text-lg font-bold" style={{ color }}>
                            Day {d.num}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600 mx-3">·</span>
                          <span className="text-gray-400 italic text-sm">{d.date}</span>
                        </div>
                        <div className="text-xs text-blue-400 italic mb-6">{d.location}</div>

                        {/* Entry text */}
                        <div className="space-y-4">
                          {d.entry.split('\n\n').map((para, i) => (
                            <p
                              key={i}
                              className="text-gray-700 dark:text-gray-300 leading-relaxed text-base"
                            >
                              {para}
                            </p>
                          ))}
                        </div>

                        {/* Hashtags */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {d.hashtags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs italic text-blue-400 dark:text-blue-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>
                  );
                })}
              </section>
            );
          })}

          {/* Footer */}
          <div className="text-center py-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-2xl text-gray-300 dark:text-gray-600 mb-4">✦ &nbsp; ✦ &nbsp; ✦</div>
            <p className="text-gray-400 italic text-sm">The road continues...</p>
            <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">
              Updated through Day 65 · May 2, 2026
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
