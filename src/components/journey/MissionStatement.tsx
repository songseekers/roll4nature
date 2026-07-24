'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';

// Tan palette used on brown containers
const TAN = '#E8D0B0';        // light tan — headings and numbers
const TAN_DIM = '#D4B896';    // medium tan — body text
const BROWN = '#5C3317';      // dark brown — container background
const BROWN_MID = '#3d2010';  // darker brown — button background
const TAN_BORDER = 'rgba(232,208,176,0.25)';

export default function MissionStatement() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Mission Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-r4n-warm-cream mb-6 text-center">
              Why We Roll
            </h2>

            <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Roll 4 Nature is riding in support of Team Red, White and Blue (Team RWB) — a nationwide community dedicated to enriching the lives of veterans through physical activity, meaningful connection, and shared purpose. Founded in 2010, Team RWB has become the heartbeat of veteran wellness across America.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Nature is one of the most powerful and underutilized tools for mental, physical, and spiritual health. Time outdoors reduces anxiety and depression, lowers blood pressure, sharpens focus, and restores the sense of meaning that too many veterans — and too many people — lose after major life transitions. This ride is our way of proving that point, mile by mile.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-r4n-warm-cream">Not broken. Still moving.</span><br />
              Every mile is gratitude. Every trail is a classroom. Every community is connection.
            </p>

            <Button variant="primary" size="md" href="https://teamrwb.org/programs" target="_blank" rel="noopener noreferrer">
              Learn More About Team RWB
            </Button>
          </div>

          {/* Right: Team RWB Impact — brown container, tan text throughout */}
          <div style={{
            backgroundColor: BROWN,
            borderRadius: '8px',
            padding: '32px',
            border: `1px solid ${TAN_BORDER}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontSize: '28px', fontWeight: '700', color: TAN, textAlign: 'center', marginBottom: '24px' }}>
              Team RWB Impact
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>

              {/* Statistics — tan numbers, dimmer tan labels */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', color: TAN, marginBottom: '4px' }}>300,000+</div>
                  <p style={{ fontSize: '16px', color: TAN_DIM }}>Members and supporters</p>
                </div>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', color: TAN, marginBottom: '4px' }}>173,768</div>
                  <p style={{ fontSize: '16px', color: TAN_DIM }}>Event check-ins in 2025</p>
                </div>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', color: TAN, marginBottom: '4px' }}>18,490</div>
                  <p style={{ fontSize: '16px', color: TAN_DIM }}>Total events nationwide</p>
                </div>
              </div>

              {/* RWB Logo */}
              <div style={{ width: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  src="/images/rwb_ob_white.png"
                  alt="Team Red, White, and Blue Logo"
                  width={120}
                  height={120}
                  style={{ objectFit: 'contain', opacity: 0.9 }}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${TAN_BORDER}` }}>
              <a
                href="https://members.teamrwb.org/registration"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 24px',
                  backgroundColor: BROWN_MID,
                  color: TAN,
                  border: `1px solid ${TAN_DIM}`,
                  borderRadius: '8px',
                  fontWeight: '700',
                  textDecoration: 'none',
                }}
              >
                Join Team RWB Today
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
