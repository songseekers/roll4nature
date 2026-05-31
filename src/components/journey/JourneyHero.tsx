'use client';

import CountdownTimer from '@/components/home/CountdownTimer';
import FlagstaffBanner from '@/components/home/FlagstaffBanner';

interface JourneyHeroProps {
  showBanner?: boolean;
}

export default function JourneyHero({ showBanner = false }: JourneyHeroProps) {
  return (
    <div className="bg-gradient-to-b from-r4v-tan to-white dark:from-r4v-secondary dark:to-gray-950 pt-40 sm:pt-36 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          R4V 2026: Coast to Coast to Canyon
        </h1>

        <p className="text-2xl md:text-3xl text-r4v-primary dark:text-r4v-primary-hover font-bold mb-6">
          4,444 Miles of Purpose in Motion
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          This isn't a race or a commercial venture—it's a sustained, purpose-driven ride built around endurance, logistics, and community. If you're looking for answers, there's a good chance you'll find them with us on The Path.
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-4">
          Join us on an epic cross-country bike journey from Key West, Florida, to Los Angeles, California, to Flagstaff, Arizona,
          supporting Team RWB and connecting with veterans in every community along the way.
        </p>

        <p className="text-base font-semibold text-r4v-primary dark:text-r4v-primary-hover mb-8">
          Rolling 4 Purpose | Rolling 4 Health | Rolling 4 Discovery | Rolling 4 Veterans
        </p>

        {/* Key Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm max-w-md mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-r4v-primary dark:text-r4v-primary-hover">4,444</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Miles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-r4v-primary dark:text-r4v-primary-hover">120</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-r4v-primary dark:text-r4v-primary-hover">48</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Communities</div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold dark:text-white">Feb 27 - May 27 - Jun 22, 2026</span></p>
            <p>Key West, FL → Los Angeles, CA → Flagstaff, AZ</p>
          </div>
        </div>
      </div>

      {/* Flagstaff Celebration Banner */}
      {showBanner && (
        <div className="mb-6">
          <FlagstaffBanner />
        </div>
      )}

      {/* Countdown Timer */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
        <CountdownTimer />
      </div>
    </div>
  );
}
