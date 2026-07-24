'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import activitiesData from '@/data/activities.json';
import eventsJson from '@/data/countdownEvents.json';

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
  locationAddress?: string;
  locationUrl?: string;
  expiryDays?: number;
  expiryTime?: string;
  expirationMessage: string;
  expirationLine2?: string;
  expirationLine3?: string;
  eventTime: number;
  midnightTime: number;
}

const START_TIME = new Date('2026-02-27T10:00:00').getTime();

const EVENTS: CountdownEvent[] = (
  eventsJson.events as {
    city: string;
    label: string;
    isoDateTime: string;
    location: string;
    locationAddress?: string;
    locationUrl?: string;
    expiryDays?: number;
    expiryTime?: string;
    expirationMessage: string;
    expirationLine2?: string;
    expirationLine3?: string;
  }[]
).map((e) => {
  const eventTime = new Date(e.isoDateTime).getTime();
  let midnightTime: number;
  if (e.expiryTime) {
    midnightTime = new Date(e.expiryTime).getTime();
  } else {
    const d = new Date(e.isoDateTime);
    const hoursToMidnight = 24 * (e.expiryDays ?? 1);
    d.setHours(hoursToMidnight, 0, 0, 0);
    midnightTime = d.getTime();
  }
  return { ...e, eventTime, midnightTime };
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

// All inline styles — no Tailwind color classes on the container
// to avoid class resolution issues
const CONTAINER: React.CSSProperties = {
  backgroundColor: '#2a1a08',
  borderRadius: '12px',
  padding: '32px',
  border: 'none',
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
};

const LABEL: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#E8D0B0',
  textAlign: 'center',
};

const NUMBER: React.CSSProperties = {
  fontSize: '36px',
  fontWeight: '700',
  fontFamily: 'monospace',
  color: '#E8D0B0',
};

const UNIT: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  color: '#D4B896',
};

const DIVIDER_CHAR: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  color: 'rgba(212,184,150,0.5)',
  alignSelf: 'flex-start',
  paddingTop: '4px',
};

const SEPARATOR_H: React.CSSProperties = {
  width: '1px',
  height: '64px',
  backgroundColor: 'rgba(212,184,150,0.2)',
};

const SEPARATOR_V: React.CSSProperties = {
  width: '96px',
  height: '1px',
  backgroundColor: 'rgba(212,184,150,0.2)',
};

const SECONDARY_TEXT: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#D4B896',
  textAlign: 'center',
};

function TimerBlock({ value, label }: { value: number | null; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={NUMBER}>{value !== null ? String(value).padStart(2, '0') : '--'}</span>
      <span style={UNIT}>{label}</span>
    </div>
  );
}

function Divider() {
  return <span style={DIVIDER_CHAR}>|</span>;
}

function SectionSeparator({ mobile }: { mobile?: boolean }) {
  return mobile
    ? <div style={SEPARATOR_V} />
    : <div style={SEPARATOR_H} />;
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

      const recentlyPassed = EVENTS.find((e) => e.eventTime <= now && e.midnightTime > now);
      if (recentlyPassed) {
        setActiveEvent(recentlyPassed);
        setActiveCountdown(null);
        setShowExpiration(true);
        return;
      }

      const upcoming = EVENTS.find((e) => e.eventTime > now);
      setActiveEvent(upcoming);
      if (upcoming) {
        setActiveCountdown(calcCountdown(upcoming.eventTime));
        setShowExpiration(false);
      } else {
        setActiveCountdown(null);
        setShowExpiration(false);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const timerBlocks = (time: TimerTime | null) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TimerBlock value={time?.days ?? null} label="days" />
      <Divider />
      <TimerBlock value={time?.hours ?? null} label="hrs" />
      <Divider />
      <TimerBlock value={time?.minutes ?? null} label="min" />
      <Divider />
      <TimerBlock value={time?.seconds ?? null} label="sec" />
    </div>
  );

  return (
    <div style={CONTAINER} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

      {/* Count-UP: time since Key West */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <p style={LABEL}>Time on The Path</p>
        {timerBlocks(elapsed)}
      </div>

      <div className="hidden md:block"><SectionSeparator /></div>
      <div className="block md:hidden"><SectionSeparator mobile /></div>

      {/* Miles Cycled */}
      <Link href="/stats" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', textDecoration: 'none' }}>
        <p style={LABEL}>Miles Cycled</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ ...NUMBER, borderBottom: '1px solid #D4B896', paddingBottom: '2px' }}>
            {totalMilesCycled.toFixed(1)}
          </span>
          <span style={UNIT}>miles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
          <span style={SECONDARY_TEXT}>Click ↑ to see stats</span>
        </div>
      </Link>

      <div className="hidden md:block"><SectionSeparator /></div>
      <div className="block md:hidden"><SectionSeparator mobile /></div>

      {/* What's Next */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <p style={LABEL}>What&apos;s Next</p>
        {activeEvent ? (
          showExpiration ? (
            <>
              <p style={SECONDARY_TEXT}>{activeEvent.expirationMessage}</p>
              {activeEvent.expirationLine2 && (
                <p style={SECONDARY_TEXT}>{activeEvent.expirationLine2}</p>
              )}
              {activeEvent.expirationLine3 && (
                activeEvent.expirationLine3.startsWith('https://') ? (
                  <a href={activeEvent.expirationLine3} target="_blank" rel="noopener noreferrer"
                    style={{ ...SECONDARY_TEXT, textDecoration: 'underline' }}>
                    📍 View on Maps
                  </a>
                ) : (
                  <p style={SECONDARY_TEXT}>{activeEvent.expirationLine3}</p>
                )
              )}
            </>
          ) : (
            <>
              <p style={SECONDARY_TEXT}>{activeEvent.label}</p>
              {activeEvent.location && activeEvent.location !== 'TBD' && (
                activeEvent.locationUrl ? (
                  <a href={activeEvent.locationUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...SECONDARY_TEXT, textDecoration: 'underline' }}>
                    📍 {activeEvent.location}
                  </a>
                ) : (
                  <p style={SECONDARY_TEXT}>{activeEvent.location}</p>
                )
              )}
              {activeEvent.locationAddress && (
                activeEvent.locationUrl ? (
                  <a href={activeEvent.locationUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...SECONDARY_TEXT, textDecoration: 'underline' }}>
                    {activeEvent.locationAddress}
                  </a>
                ) : (
                  <p style={SECONDARY_TEXT}>{activeEvent.locationAddress}</p>
                )
              )}
              {timerBlocks(activeCountdown)}
            </>
          )
        ) : (
          <p style={SECONDARY_TEXT}>Stay tuned for the next stop!</p>
        )}
      </div>

    </div>
  );
}
