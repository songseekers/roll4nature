'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import activitiesData from '@/data/activities.json';

// Total miles from activities data (computed once at module level)
const totalMilesCycled = (activitiesData as { distance: number }[]).reduce((sum, a) => sum + a.distance, 0);

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

// PENSACOLA — Yoga and Social: March 20, 2026 at 3:00 PM local time
const PENSACOLA_STOP_TIME = new Date('2026-03-20T15:00:00').getTime();

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

function SectionSeparator() {
  return (
    <>
      <div className="hidden md:block w-px h-16 bg-gray-300 dark:bg-gray-600" />
      <div className="block md:hidden w-24 h-px bg-gray-300 dark:bg-gray-600" />
    </>
  );
}

export default function CountdownTimer() {
  const [elapsed, setElapsed] = useState<TimerTime | null>(null);
  const [countdown, setCountdown] = useState<(TimerTime & { isOver: boolean }) | null>(null);
  const [pensacolaCountdown, setPensacolaCountdown] = useState<(TimerTime & { isOver: boolean }) | null>(null);

  useEffect(() => {
    const tick = () => {
      setElapsed(calcElapsed(START_TIME));
      setCountdown(calcCountdown(NEXT_STOP_TIME));
      setPensacolaCountdown(calcCountdown(PENSACOLA_STOP_TIME));
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

      <SectionSeparator />

      {/* Miles Cycled — links to /stats */}
      <Link
        href="/stats"
        className="flex flex-col items-center gap-1 group cursor-pointer"
      >
        <p className="text-sm font-semibold text-r4v-primary dark:text-r4v-primary-hover text-center">
          Miles Cycled
        </p>
        <div className="flex flex-col items-center transition-transform group-hover:-translate-y-0.5">
          <span className="text-2xl md:text-3xl font-bold font-mono text-r4v-primary dark:text-r4v-primary-hover border-b border-r4v-primary dark:border-r4v-primary-hover pb-0.5">
            {totalMilesCycled.toFixed(1)}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">miles</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm font-semibold text-r4v-primary dark:text-white group-hover:underline transition-all">
            Click
          </span>
          <span className="text-r4v-primary dark:text-white text-base leading-none">↑</span>
          <span className="text-sm font-semibold text-r4v-primary dark:text-white group-hover:underline transition-all">
            to see stats
          </span>
        </div>
      </Link>

      <SectionSeparator />

      {/* Pensacola countdown */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
          {pensacolaCountdown?.isOver
            ? "See you next time, Pensacola!"
            : 'Pensacola — Yoga and Social'}
        </p>
        {!pensacolaCountdown?.isOver && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center -mt-1">
            2601 N 13th Ave, Pensacola, FL 32503
          </p>
        )}
        {!pensacolaCountdown?.isOver && (
          <div className="flex items-center gap-2">
            <TimerBlock value={pensacolaCountdown?.days ?? null} label="days" />
            <Divider />
            <TimerBlock value={pensacolaCountdown?.hours ?? null} label="hrs" />
            <Divider />
            <TimerBlock value={pensacolaCountdown?.minutes ?? null} label="min" />
            <Divider />
            <TimerBlock value={pensacolaCountdown?.seconds ?? null} label="sec" />
          </div>
        )}
      </div>
    </div>
  );
}
