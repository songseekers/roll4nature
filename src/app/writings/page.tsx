import Button from '@/components/ui/Button';

export default function WritingsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors pt-16">

      {/* SUMMARY / HERO */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
        <div className="text-sm font-bold text-r4n-primary uppercase tracking-widest mb-3">
          Roll 4 Nature
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-none">
          JT&apos;s Writings
        </h1>
        <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 italic max-w-xl mx-auto leading-relaxed">
          Journals from the road, a new voyage just getting started, and an unfinished story
          that&apos;s been waiting a while for its ending.
        </p>
      </div>

      {/* MOUNTAIN STATES EXPLORATION */}
      <section className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.1]"
          style={{
            backgroundImage: "url('/images/writings/route-mse.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'min(60%, 640px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-r4n-sage px-3 py-1 rounded-full mb-5">
            New Entries Added Weekly
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Mountain States Exploration
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
            The next chapter of the journey: a swing north from Bodaway Gap through Utah&apos;s
            canyon country and up into Idaho. The page is live and waiting — entries will start
            appearing as the miles roll by.
          </p>
          <Button href="/journal-mse" variant="primary" size="lg">
            Visit the Journal
          </Button>
        </div>
      </section>

      {/* COAST TO COAST TO CANYON */}
      <section className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.1]"
          style={{
            backgroundImage: "url('/images/writings/route-c2c2c.svg')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'min(70%, 720px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-r4n-primary px-3 py-1 rounded-full mb-5">
            Complete · 143 Days
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Coast to Coast to Canyon
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
            Key West to Los Angeles to the bottom of the Grand Canyon — a bicycle, a trailer named
            Cleo, a river named the Colorado, and a hundred and forty-three days of dispatches
            from the road. The full journal, start to finish.
          </p>
          <Button href="/journal" variant="primary" size="lg">
            Read the Journal
          </Button>
        </div>
      </section>

      {/* THE CATERPILLAR AND THE DRAGONFLY */}
      <section className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.1]"
          style={{
            backgroundImage: "url('/images/writings/candd-illustration.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'min(75%, 760px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-purple-500 px-3 py-1 rounded-full mb-5">
            21 Chapters · Unfinished
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Caterpillar and the Dragonfly
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
            A children&apos;s story, based on a true story, about a shy caterpillar named Gus and
            an injured dragonfly named Lacey. Twenty-one chapters are written. The ending is ready
            too — it just needs a reason to get finished.
          </p>
          <Button href="/writings/caterpillar-and-dragonfly" variant="primary" size="lg">
            Read the Story
          </Button>
        </div>
      </section>

      {/* PURPOSE PATHFINDER GUIDEBOOK */}
      <section className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] dark:hidden"
          style={{
            backgroundImage: "url('/resources/PP.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'min(55%, 560px)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden dark:block opacity-[0.1]"
          style={{
            backgroundImage: "url('/resources/PP_dk.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'min(55%, 560px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 py-20 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-r4n-earth px-3 py-1 rounded-full mb-5">
            Free Guidebook
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The Purpose Pathfinder
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
            The same framework guiding this whole journey, mile by mile — an eight-petal map of
            Physical, Mental, Emotional, and Lifestyle health, built around a simple idea: purpose
            isn&apos;t a mask you wear, it&apos;s the truest stance you can take. Explore the
            framework, and download the free guidebook to work through it yourself.
          </p>
          <Button href="/purpose" variant="primary" size="lg">
            Explore the Guidebook
          </Button>
        </div>
      </section>

    </div>
  );
}
