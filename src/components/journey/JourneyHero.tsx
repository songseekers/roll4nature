'use client';

import CountdownTimer from '@/components/home/CountdownTimer';
import FlagstaffBanner from '@/components/home/FlagstaffBanner';
import TelegramBanner from '@/components/home/TelegramBanner';
import activitiesData from '@/data/activities.json';

interface JourneyHeroProps {
  showBanner?: boolean;
}

// Calculate total miles dynamically from activities
const totalMiles = (activitiesData as Array<{ distance: number }>)
  .reduce((sum, activity) => sum + activity.distance, 0)
  .toFixed(0);

export default function JourneyHero({ showBanner = false }: JourneyHeroProps) {
  return (
    <div className="bg-r4n-tan-light dark:bg-[#2a1a08] pt-40 sm:pt-36 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">

      {/* Telegram Banner */}
      <div className="max-w-4xl mx-auto mb-8">
        <TelegramBanner />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">

        {/* Route title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-r4n-warm-cream mb-4 leading-tight">
          Roll 4 Nature
        </h1>

        {/* Dynamic mileage */}
        <p className="text-2xl md:text-3xl font-bold mb-6 text-r4v-primary dark:text-r4n-tan">
          {Number(totalMiles).toLocaleString()} Miles of Purpose in Motion
        </p>

        {/* Body paragraph 1 — nature as medicine */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Nature is not a backdrop — it is the medicine. Research continues to confirm what those who spend time outdoors already know: time in nature reduces cortisol, quiets the mind, restores emotional balance, and reconnects the spirit to something larger than itself. This journey is built on that truth.
        </p>

        {/* Body paragraph 2 — the invitation */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          From the coastline to the canyon and on into canyon country, we roll through America&apos;s wild places not to conquer them, but to listen. Every mile is an invitation — to step away from the noise, to breathe, to move, and to discover what becomes clear when you get outside and stay there.
        </p>

        {/* Body paragraph 3 — route context */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
          <span className="font-semibold text-gray-900 dark:text-r4n-warm-cream">A pause on the road, not on nature.</span> I&apos;m taking a break from the cross-country travel and staying in San Antonio for a while, spending time with family and friends and exploring the natural beauty of Texas. The miles keep adding up through local rides, and the route I&apos;ve ridden so far is on the map below. Stay tuned for what&apos;s next on The Path.
        </p>

        {/* Updated tagline */}
        <p className="text-base font-semibold text-r4v-primary dark:text-r4n-tan mb-8">
          4 Purpose | 4 Veterans | 4 Everyone | 4 Nature
        </p>

      </div>

      {/* Flagstaff Celebration Banner */}
      {showBanner && (
        <div className="mb-6">
          <FlagstaffBanner />
        </div>
      )}

      {/* Countdown Timer */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-r4n-forest-mid rounded-lg p-8 shadow-sm">
        <CountdownTimer />
      </div>
    </div>
  );
}
