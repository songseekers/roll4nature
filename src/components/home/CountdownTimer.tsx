'use client';

import { useState, useEffect } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

function calculateCountdown(targetTime: number): CountdownTime {
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isOver: false,
  };
}

const TARGET_TIME = new Date('2026-02-27T06:00:00').getTime();

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState<CountdownTime | null>(null);

  useEffect(() => {
    // Initialize client-side only to avoid hydration mismatch
    setCountdown(calculateCountdown(TARGET_TIME));

    const interval = setInterval(() => {
      setCountdown(calculateCountdown(TARGET_TIME));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {!countdown ? 'Days Until Launch' : countdown.isOver ? 'Journey Started!' : 'Days Until Launch'}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
        {/* Days */}
        <div className="bg-r4v-tan dark:bg-r4v-secondary rounded-lg p-4 border-2 border-r4v-primary">
          <div className="text-4xl md:text-5xl font-bold text-r4v-primary dark:text-r4v-primary-hover font-mono">
            {countdown ? String(countdown.days).padStart(2, '0') : '--'}
          </div>
          <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Days
          </div>
        </div>

        {/* Hours */}
        <div className="bg-r4v-tan dark:bg-r4v-secondary rounded-lg p-4 border-2 border-r4v-primary">
          <div className="text-4xl md:text-5xl font-bold text-r4v-primary dark:text-r4v-primary-hover font-mono">
            {countdown ? String(countdown.hours).padStart(2, '0') : '--'}
          </div>
          <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Hours
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-r4v-tan dark:bg-r4v-secondary rounded-lg p-4 border-2 border-r4v-primary">
          <div className="text-4xl md:text-5xl font-bold text-r4v-primary dark:text-r4v-primary-hover font-mono">
            {countdown ? String(countdown.minutes).padStart(2, '0') : '--'}
          </div>
          <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Minutes
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-r4v-tan dark:bg-r4v-secondary rounded-lg p-4 border-2 border-r4v-primary">
          <div className="text-4xl md:text-5xl font-bold text-r4v-primary dark:text-r4v-primary-hover font-mono">
            {countdown ? String(countdown.seconds).padStart(2, '0') : '--'}
          </div>
          <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-semibold mt-2 uppercase tracking-wide">
            Seconds
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mt-6 text-lg">
        <span className="font-semibold dark:text-white">February 27, 2026</span> - Starting our 4,463-mile journey!
      </p>
    </div>
  );
}
