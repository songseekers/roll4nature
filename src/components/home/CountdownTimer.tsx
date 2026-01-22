'use client';

import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer() {
  const targetDate = new Date('2026-02-27T06:00:00');
  const countdown = useCountdown(targetDate);

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {countdown.isOver ? '🎉 Journey Started! 🎉' : 'Days Until Key West'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
        {/* Days */}
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-4xl md:text-5xl font-bold text-blue-600 font-mono">
            {String(countdown.days).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">
            Days
          </div>
        </div>

        {/* Hours */}
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-4xl md:text-5xl font-bold text-blue-600 font-mono">
            {String(countdown.hours).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">
            Hours
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-4xl md:text-5xl font-bold text-blue-600 font-mono">
            {String(countdown.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">
            Minutes
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <div className="text-4xl md:text-5xl font-bold text-blue-600 font-mono">
            {String(countdown.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">
            Seconds
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-6 text-lg">
        <span className="font-semibold">February 27, 2026</span> - Starting our 4,434-mile journey!
      </p>
    </div>
  );
}
