'use client';

import { useState, useEffect } from 'react';

interface TimerTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Count-UP from February 27, 2026 at 10:00 AM local time
const START_TIME = new Date('2026-02-27T10:00:00').getTime();

// Count-DOWN to March 8, 2026 at 6:00 PM local time
const NEXT_STOP_TIME = new Date('2026-03-08T18:00:00').getTime();

function calcElapsed(from: number): TimerTime {
  const diff = Math.max(0, Date.now() - from);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function calcCountdown(to: number): TimerTime & { isOver: boolean } {
  const diff = to - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isOver: false,
  };
}

function TimerBlock({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold font-mono text-r4v-primary dark:text-r4v-primary-hover">
        {value !== null ? String(value).padStart(2, '0') : '--'}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

function Divider() {
  return <span className="text-2xl font-bold text-gray-400 dark:text-gray-500 self-start pt-1">|</span>;
}

export default function CountdownTimer() {
  const [elapsed, setElapsed] = useState<TimerTime | null>(null);
  const [countdown, setCountdown] = useState<(TimerTime & { isOver: boolean }) | null>(null);

  useEffect(() => {
    const tick = () => {
      setElapsed(calcElapsed(START_TIME));
      setCountdown(calcCountdown(NEXT_STOP_TIME));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      {/* Count-UP */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
          Rolling time since Key West
        </p>
        <div className="flex items-center gap-2">
          <TimerBlock value={elapsed?.days ?? null} label="days" />
          <Divider />
          <TimerBlock value={elapsed?.hours ?? null} label="hrs" />
          <Divider />
          <TimerBlock value={elapsed?.minutes ?? null} label="min" />
          <Divider />
          <TimerBlock value={elapsed?.seconds ?? null} label="sec" />
        </div>
      </div>

      {/* Visual separator between the two timers */}
      <div className="hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600" />
      <div className="block md:hidden w-24 h-px bg-gray-300 dark:bg-gray-600" />

      {/* Count-DOWN */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
          {countdown?.isOver
            ? "We've reached Daytona Beach, FL!"
            : 'Next stop: Daytona Beach, FL (Exact location TBD)'}
        </p>
        {!countdown?.isOver && (
          <div className="flex items-center gap-2">
            <TimerBlock value={countdown?.days ?? null} label="days" />
            <Divider />
            <TimerBlock value={countdown?.hours ?? null} label="hrs" />
            <Divider />
            <TimerBlock value={countdown?.minutes ?? null} label="min" />
            <Divider />
            <TimerBlock value={countdown?.seconds ?? null} label="sec" />
          </div>
        )}
      </div>
    </div>
  );
}
