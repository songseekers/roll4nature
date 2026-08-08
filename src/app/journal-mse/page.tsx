import { journalDays, stateOrder, stateConfig, JournalDay } from '@/data/journalData';
import JournalSidebar from '@/components/journal/JournalSidebar';

const MSE_FIRST_DAY = 144;

export default function JournalMSEPage() {
  const byState: Record<string, JournalDay[]> = {};
  journalDays.filter(d => d.num >= MSE_FIRST_DAY).forEach(d => {
    if (!byState[d.state]) byState[d.state] = [];
    const existing = byState[d.state].findIndex(x => x.num === d.num);
    if (existing >= 0) byState[d.state][existing] = d;
    else byState[d.state].push(d);
  });

  const sidebarStates = stateOrder
    .filter(state => byState[state])
    .map(state => ({
      state,
      displayName: stateConfig[state]?.displayName,
      days: byState[state]
        .slice()
        .sort((a, b) => a.num - b.num)
        .map(d => ({ num: d.num, date: d.date })),
    }));

  const hasEntries = Object.keys(byState).length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="flex pt-16">

        <JournalSidebar
          states={sidebarStates}
          bannerTitle="MOUNTAIN STATES"
          emptyMessage="The journey hasn't started yet — entries will appear here once it does."
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 py-16 max-w-3xl relative">

          {/* ROUTE WATERMARK */}
          <div
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] dark:opacity-[0.08]"
            style={{
              backgroundImage: "url('/images/writings/route-mse.svg')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 30%',
              backgroundSize: 'min(70%, 700px)',
            }}
          />

          {/* TITLE BLOCK */}
          <div className="mb-20 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-bold text-r4n-primary uppercase tracking-widest mb-3">
              Roll 4 Nature
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-none">
              MOUNTAIN STATES EXPLORATION
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 italic mb-6">
              A new chronicle begins
            </p>
            <p className="text-base text-gray-400 dark:text-gray-500 font-medium tracking-wide">
              JT Tracy &nbsp;·&nbsp; July 20, 2026 —
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-400">
              <span>Flagstaff, AZ</span>
              <span>→</span>
              <span>Utah</span>
              <span>→</span>
              <span>Idaho</span>
            </div>

            {/* NOTE — title page only */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 max-w-xl">
              <p className="text-base font-semibold text-gray-500 dark:text-gray-400 italic mb-3">
                A Note to the Reader
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 italic leading-relaxed mb-3">
                Coast to Coast to Canyon is finished — 143 days, a bicycle, a canyon, and a river.
                This is the next chapter: an interlude back in civilization, then a swing north
                through the Mountain States.
              </p>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 italic">
                More entries will be added here as the miles roll by. Check back soon.
              </p>
            </div>
          </div>

          {hasEntries ? (
            <>
              {/* CHAPTERS */}
              {stateOrder.map((state, stateIndex) => {
                if (!byState[state]) return null;
                const { color, subtitle, displayName } = stateConfig[state];
                const stateId = `state-${state.toLowerCase().replace(/\s+/g, '-')}`;
                const days = byState[state].sort((a, b) => a.num - b.num);
                let currentRegion = '';

                return (
                  <section key={state} className="mb-24">
                    {stateIndex > 0 && (
                      <div className="flex items-center gap-4 mb-14">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-300 dark:text-gray-600 px-2">
                          {state}
                        </span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                      </div>
                    )}

                    <div id={stateId} className="mb-14 pb-6 border-t-4 scroll-mt-20" style={{ borderColor: color }}>
                      <div className="pt-10 text-center">
                        <div className="text-sm uppercase tracking-widest text-gray-400 mb-3">Chapter</div>
                        <h2 className="text-5xl font-bold mb-3" style={{ color }}>
                          The {displayName ?? state} Chapter
                        </h2>
                        <p className="text-lg text-gray-400 italic mb-5">{subtitle}</p>
                        <div className="text-gray-300 dark:text-gray-600 text-lg">✦ &nbsp; ✦ &nbsp; ✦</div>
                      </div>
                    </div>

                    {days.map(d => {
                      const showRegion = d.region !== currentRegion;
                      if (showRegion) currentRegion = d.region;
                      return (
                        <div key={d.num}>
                          {showRegion && (
                            <div className="text-center my-12">
                              <span className="text-sm font-bold uppercase tracking-widest px-4" style={{ color: `${color}99` }}>
                                ── {d.region} ──
                              </span>
                            </div>
                          )}
                          <article id={`day-${d.num}`} className="mb-16 pb-16 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
                            <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
                              <span className="text-2xl font-bold" style={{ color }}>Day {d.num}</span>
                              <span className="text-gray-300 dark:text-gray-600">·</span>
                              <span className="text-gray-400 italic text-lg">{d.date}</span>
                            </div>
                            <div className="text-base text-r4n-grass italic mb-8">{d.location}</div>
                            {d.title && (
                              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center italic">
                                {d.title}
                              </h3>
                            )}
                            <div className="space-y-5">
                              {d.entry.split('\n\n').map((para, i) => (
                                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{para}</p>
                              ))}
                            </div>
                            <div className="mt-8 flex flex-wrap gap-2">
                              {d.hashtags.map(tag => (
                                <span key={tag} className="text-sm italic text-r4n-grass dark:text-r4n-grass-hover">{tag}</span>
                              ))}
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </section>
                );
              })}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="text-3xl text-gray-200 dark:text-gray-700 mb-6">✦ &nbsp; ✦ &nbsp; ✦</div>
              <p className="text-xl text-gray-400 dark:text-gray-500 italic">
                The trail hasn&apos;t started yet.
              </p>
              <p className="text-base text-gray-400 dark:text-gray-500 mt-2">
                Come back once the wheels are rolling again.
              </p>
            </div>
          )}

          {/* FOOTER */}
          <div className="text-center py-16 border-t border-gray-200 dark:border-gray-700">
            <div className="text-2xl text-gray-300 dark:text-gray-600 mb-4">✦ &nbsp; ✦ &nbsp; ✦</div>
            <p className="text-gray-400 italic text-base">The road continues...</p>
          </div>
        </main>
      </div>
    </div>
  );
}
