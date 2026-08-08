import Image from 'next/image';
import Button from '@/components/ui/Button';
import { candDChapters, candDClosingNote } from '@/data/candDBook';
import BookSidebar from '@/components/writings/BookSidebar';

const MAILTO_HREF =
  "mailto:jt.songseeker@gmail.com?subject=The%20Caterpillar%20and%20the%20Dragonfly&body=I%20read%20the%20first%2021%20chapters%20and%20I%27d%20love%20to%20see%20how%20it%20ends!";

export default function CaterpillarAndDragonflyPage() {
  const chapterNav = candDChapters.map(c => ({ num: c.num, title: c.title }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="flex pt-16">

        <BookSidebar chapters={chapterNav} />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 lg:px-16 py-16 max-w-3xl relative">

          {/* COVER WATERMARK */}
          <div
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] dark:opacity-[0.07]"
            style={{
              backgroundImage: "url('/images/writings/candd-illustration.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 25%',
              backgroundSize: 'min(85%, 800px)',
            }}
          />

          {/* TITLE BLOCK */}
          <div className="mb-16 pb-12 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-bold text-r4n-primary uppercase tracking-widest mb-3">
              JT&apos;s Writings
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              The Caterpillar and the Dragonfly
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 italic mb-8">
              Based on a true story
            </p>

            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-xl mb-8">
              <Image
                src="/images/writings/candd-illustration.png"
                alt="Gus the caterpillar meets Lacey the dragonfly"
                width={890}
                height={580}
                className="w-full h-auto"
              />
            </div>

            <p className="text-base text-gray-400 dark:text-gray-500 font-medium tracking-wide">
              JT Tracy
            </p>

            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 max-w-xl">
              <p className="text-sm text-gray-400 dark:text-gray-500 italic leading-relaxed">
                A children&apos;s story, written a chapter at a time, about a shy caterpillar named
                Gus, an injured dragonfly named Lacey, and the unlikely friendship that carries them
                both somewhere neither expected to go. The first twenty-one chapters are below — the
                story is still unfinished, and there&apos;s a note about that at the end.
              </p>
            </div>
          </div>

          {/* CHAPTERS */}
          {candDChapters.map((chapter, idx) => (
            <article key={chapter.num} id={`chapter-${chapter.num}`} className="mb-20 pb-16 border-b border-gray-100 dark:border-gray-800 scroll-mt-20">
              <div className="mb-8 text-center">
                <div className="text-sm uppercase tracking-widest text-gray-400 mb-2">
                  Chapter {chapter.num}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {chapter.title}
                </h2>
              </div>
              <div className="space-y-5">
                {chapter.paragraphs.map((para, i) => (
                  <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {para}
                  </p>
                ))}
              </div>
              {idx === candDChapters.length - 1 && (
                <div className="text-center mt-10 text-gray-300 dark:text-gray-600 text-lg">
                  ✦ &nbsp; ✦ &nbsp; ✦
                </div>
              )}
            </article>
          ))}

          {/* A TEMPORARY ENDING */}
          <section id="chapter-ending" className="scroll-mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              A Temporary Ending
            </h2>
            <div className="space-y-5 text-left max-w-xl mx-auto mb-10">
              {candDClosingNote.map((para, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>

            <Button href={MAILTO_HREF} variant="primary" size="lg">
              Email JT — I want to see the ending
            </Button>

            <div className="mt-16 text-2xl text-gray-300 dark:text-gray-600">
              ✦ &nbsp; ✦ &nbsp; ✦
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
