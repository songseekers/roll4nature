'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import activitiesData from '@/data/activities.json';
import eventsJson from '@/data/countdownEvents.json';

// Total miles from activities data (computed once at module level)
const totalMilesCycled = (activitiesData as { distance: number }[]).reduce(
  (sum, a) => sum + (a as { distance: number }).distance,
  0
);

interface TimerTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownEvent {
  city: string;
  label: string;
  isoDateTime: string;
  location: string;
  expirationMessage: string;
  eventTime: number;
  midnightTime: number;
}

// Count-UP from February 27, 2026 at 10:00 AM local time
const START_TIME = new Date('2026-02-27T10:00:00').getTime();

// Build typed events array from JSON — compute timestamps once at module level
const EVENTS: CountdownEvent[] = (
  eventsJson.events as {
    city: string;
    label: string;
    isoDateTime: string;
    location: string;
    expirationMessage: string;
  }[]
).map((e) => {
  const eventTime = new Date(e.isoDateTime).getTime();
  const d = new Date(e.isoDateTime);
  d.setHours(24, 0, 0, 0); // midnight at end of event day
  return { ...e, eventTime, midnightTime: d.getTime() };
});

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
  const [activeEvent, setActiveEvent] = useState<CountdownEvent | undefined>(undefined);
  const [activeCountdown, setActiveCountdown] = useState<(TimerTime & { isOver: boolean }) | null>(null);
  const [showExpiration, setShowExpiration] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setElapsed(calcElapsed(START_TIME));

      // Find the current active event:
      // - If midnightTime > now, this event is either counting down or showing expiration
      // - Once midnight passes, move to the next event
      const active = EVENTS.find((e) => e.midnightTime > now);
      setActiveEvent(active);

      if (active) {
        if (now < active.eventTime) {
          // Still counting down to event
          setActiveCountdown(calcCountdown(active.eventTime));
          setShowExpiration(false);
        } else {
          // Event has passed but midnight hasn't — show expiration message
          setActiveCountdown(null);
          setShowExpiration(true);
        }
      } else {
        setActiveCountdown(null);
        setShowExpiration(false);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      {/* Count-UP: time since Key West */}
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
      <Link href="/stats" className="flex flex-col items-center gap-1 group cursor-pointer">
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
          <span className="text-sm font-semibold text-r4v-primary dark:text-gray-300 group-hover:underline transition-all">
            Click
          </span>
          <span className="text-r4v-primary dark:text-gray-300 text-base leading-none">↑</span>
          <span className="text-sm font-semibold text-r4v-primary dark:text-gray-300 group-hover:underline transition-all">
            to see stats
          </span>
        </div>
      </Link>

      <SectionSeparator />

      {/* Next event countdown or expiration message */}
      <div className="flex flex-col items-center gap-2">
        {activeEvent ? (
          showExpiration ? (
            // Post-event: show expiration message until midnight
            <>
              <p className="text-sm font-semibold text-r4v-primary dark:text-r4v-primary-hover text-center">
                {activeEvent.expirationMessage}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {activeEvent.city}
              </p>
            </>
          ) : (
            // Pre-event: show countdown
            <>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                {activeEvent.label}
              </p>
              {activeEvent.location && activeEvent.location !== 'TBD' && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center -mt-1">
                  {activeEvent.location}
                </p>
              )}
              <div className="flex items-center gap-2">
                <TimerBlock value={activeCountdown?.days ?? null} label="days" />
                <Divider />
                <TimerBlock value={activeCountdown?.hours ?? null} label="hrs" />
                <Divider />
                <TimerBlock value={activeCountdown?.minutes ?? null} label="min" />
                <Divider />
                <TimerBlock value={activeCountdown?.seconds ?? null} label="sec" />
              </div>
            </>
          )
        ) : (
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
            Stay tuned for the next stop!
          </p>
        )}
      </div>
    </div>
  );
}
