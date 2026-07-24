'use client';

import CountdownTimer from '@/components/home/CountdownTimer';
import FlagstaffBanner from '@/components/home/FlagstaffBanner';
import TelegramBanner from '@/components/home/TelegramBanner';
import activitiesData from '@/data/activities.json';

interface JourneyHeroProps {
  showBanner?: boolean;
}

// Calculate total miles dynamically from activities
const totalMiles = activitiesData
  .reduce((sum, activity) => sum + activity.distance, 0)
  .toFixed(1);

// Days rolling since Feb 27, 2026
function getDaysOnPath(): number {
  const start = new Date('2026-02-27T00:00:00');
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

export default function JourneyHero({ showBanner = false }: JourneyHeroProps) {
  const daysOnPath = getDaysOnPath();

  return (
    <div className="bg-gradient-to-b from-r4n-tan-light to-white dark:from-r4n-forest dark:to-gray-950 pt-40 sm:pt-36 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">

      {/* Telegram Banner — first visual element */}
      <div className="max-w-4xl mx-auto mb-8">
        <TelegramBanner />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">

        {/* Route title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-r4n-warm-cream mb-4 leading-tight">
          Mountain States Exploration
        </h1>

        {/* Dynamic mileage */}
        <p className="text-2xl md:text-3xl text-r4n-primary dark:text-r4n-tan font-bold mb-6">
          {Number(totalMiles).toLocaleString()} Miles of Purpose in Motion
        </p>

        {/* Body paragraph 1 — nature focus */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Nature is not a backdrop — it is the medicine. Research continues to confirm what those who spend time outdoors already know: time in nature reduces cortisol, quiets the mind, restores emotional balance, and reconnects the spirit to something larger than itself. This journey is built on that truth.
        </p>

        {/* Body paragraph 2 — community and purpose */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          From the coastline to the canyon to the mountain states, we roll through America's wild places not to conquer them, but to listen. Every mile is an invitation — to step away from the noise, to breathe, to move, and to discover what becomes clear when you get outside and stay there.
        </p>

        {/* Rolling tagline */}
        <p className="text-base font-semibold text-r4n-primary dark:text-r4n-tan mb-8">
          Rolling 4 Purpose | Rolling 4 Health | Rolling 4 Discovery | Rolling 4 Nature
        </p>

        {/* Days on The Path counter */}
        <div className="bg-r4n-primary dark:bg-r4n-forest-mid rounded-lg p-6 shadow-sm max-w-sm mx-auto mb-8 border border-r4n-tan/30">
          <div className="text-4xl font-bold text-r4n-grass mb-1">{daysOnPath}</div>
          <div className="text-r4n-tan text-sm font-semibold tracking-wide uppercase">
            Days Rolling on The Path
          </div>
          <div className="text-r4n-tan-dark text-xs mt-2">
            Since 27 February 2026
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
      <div className="bg-white dark:bg-r4n-forest-mid rounded-lg p-8 shadow-sm">
        <CountdownTimer />
      </div>
    </div>
  );
}
