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
  .reduce((sum: number, activity: { distance: number }) => sum + activity.distance, 0)
  .toFixed(0);

// Days rolling since Feb 27, 2026
function getDaysOnPath(): number {
  const start = new Date('2026-02-27T00:00:00');
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

const BROWN = '#5C3317';
const TAN = '#E8D0B0';
const TAN_DIM = '#D4B896';
const TAN_BORDER = 'rgba(232,208,176,0.25)';

export default function JourneyHero({ showBanner = false }: JourneyHeroProps) {
  const daysOnPath = getDaysOnPath();

  return (
    <div className="bg-gradient-to-b from-r4n-tan-light to-white dark:from-r4n-forest dark:to-gray-950 pt-40 sm:pt-36 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">

      {/* Telegram Banner */}
      <div className="max-w-4xl mx-auto mb-8">
        <TelegramBanner />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">

        {/* Route title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-r4n-warm-cream mb-4 leading-tight">
          Mountain States Exploration
        </h1>

        {/* Dynamic mileage — tan color matching the design */}
        <p style={{ fontSize: '28px', fontWeight: '700', color: BROWN, marginBottom: '24px' }}
           className="dark:text-r4n-tan">
          {Number(totalMiles).toLocaleString()} Miles of Purpose in Motion
        </p>

        {/* Body paragraph 1 */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Nature is not a backdrop — it is the medicine. Research continues to confirm what those who spend time outdoors already know: time in nature reduces cortisol, quiets the mind, restores emotional balance, and reconnects the spirit to something larger than itself. This journey is built on that truth.
        </p>

        {/* Body paragraph 2 */}
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          From the coastline to the canyon to the mountain states, we roll through America's wild places not to conquer them, but to listen. Every mile is an invitation — to step away from the noise, to breathe, to move, and to discover what becomes clear when you get outside and stay there.
        </p>

        {/* Rolling tagline */}
        <p style={{ fontSize: '15px', fontWeight: '600', color: BROWN, marginBottom: '32px' }}
           className="dark:text-r4n-tan">
          Rolling 4 Purpose | Rolling 4 Health | Rolling 4 Discovery | Rolling 4 Nature
        </p>

        {/* Days on The Path — brown container, tan text */}
        <div style={{
          backgroundColor: BROWN,
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '280px',
          margin: '0 auto 32px',
          border: `1px solid ${TAN_BORDER}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: TAN, lineHeight: 1 }}>
            {daysOnPath}
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: TAN, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '8px' }}>
            Days Rolling on The Path
          </div>
          <div style={{ fontSize: '11px', color: TAN_DIM, marginTop: '6px' }}>
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
