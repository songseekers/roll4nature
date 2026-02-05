'use client';

import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer() {
  const targetDate = new Date('2026-02-27T06:00:00');
  const countdown = useCountdown(targetDate);

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {countdown.isOver ? '🎉 Journey Started! 🎉' : 'Days Until Launch'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
        {/* Days */}
        <div className="bg-[#E8C9A1] dark:bg-[#8B4513] rounded-lg p-4 border-2 border-[#C1592B]">
          <div className="text-4xl md:text-5xl font-bold text-[#C1592B] dark:text-[#E07B4F] font-mono">
            {String(countdown.days).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Days
          </div>
        </div>

        {/* Hours */}
        <div className="bg-[#E8C9A1] dark:bg-[#8B4513] rounded-lg p-4 border-2 border-[#C1592B]">
          <div className="text-4xl md:text-5xl font-bold text-[#C1592B] dark:text-[#E07B4F] font-mono">
            {String(countdown.hours).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Hours
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-[#E8C9A1] dark:bg-[#8B4513] rounded-lg p-4 border-2 border-[#C1592B]">
          <div className="text-4xl md:text-5xl font-bold text-[#C1592B] dark:text-[#E07B4F] font-mono">
            {String(countdown.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Minutes
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-[#E8C9A1] dark:bg-[#8B4513] rounded-lg p-4 border-2 border-[#C1592B]">
          <div className="text-4xl md:text-5xl font-bold text-[#C1592B] dark:text-[#E07B4F] font-mono">
            {String(countdown.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Seconds
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg">
        <span className="font-semibold dark:text-white">February 27, 2026</span> - Starting our 4,463-mile journey!
      </p>

      <div className="mt-6">
        <a
          href="/sponsor#sponsors"
          className="inline-block bg-[#C1592B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition"
        >
          Meet Our Sponsors
        </a>
      </div>
    </div>
  );
}
