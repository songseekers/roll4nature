'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function MissionStatement() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mission Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why We Roll
            </h2>

            <p className="text-base text-gray-700 dark:text-gray-400 mb-4 leading-relaxed">
              Roll 4 Nature is riding coast-to-coast in 2026 to raise awareness of and support for Team Red, White & Blue (Team RWB). Founded in 2010, Team RWB has become a nationwide community empowering veterans through physical activity, meaningful connection, and shared purpose.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-400 mb-4 leading-relaxed">
              As we pass through communities across the country, this ride exists to amplify Team RWB's impact, strengthen local engagement, and remind veterans that they are not alone— there is a team ready for them to join.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-400 mb-8 leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-white">Not broken. Still moving.</span><br />
              Every mile is gratitude. Every community is connection. Every veteran matters.
            </p>

            <Button variant="primary" size="md" href="https://teamrwb.org/programs" target="_blank" rel="noopener noreferrer">
              Learn More About Team RWB
            </Button>
          </div>

          {/* Right: Stats Box */}
          <div className="bg-gradient-to-br from-r4v-tan to-r4v-tan-dark dark:from-r4v-secondary dark:to-r4v-secondary-hover rounded-lg p-8 border-2 border-r4v-primary">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Team RWB Impact
            </h3>

            <div className="flex items-center justify-between gap-6">
              {/* Left: Statistics */}
              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-4xl font-bold text-r4v-primary dark:text-r4v-primary-hover mb-2">300,000+</div>
                  <p className="text-lg text-gray-700 dark:text-gray-200">Members and supporters</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-r4v-primary dark:text-r4v-primary-hover mb-2">173,768</div>
                  <p className="text-lg text-gray-700 dark:text-gray-200">Event check-ins in 2025</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-r4v-primary dark:text-r4v-primary-hover mb-2">18,490</div>
                  <p className="text-lg text-gray-700 dark:text-gray-200">Total events nationwide</p>
                </div>
              </div>

              {/* Right: Team RWB Logo - Centered in remaining space */}
              <div className="flex items-center justify-center" style={{width: '180px'}}>
                <Image
                  src="/images/rwb_white.png"
                  alt="Team Red, White, and Blue Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-r4v-primary">
              <Button variant="primary" size="md" href="https://members.teamrwb.org/registration" target="_blank" rel="noopener noreferrer" className="w-full">
                Join Team RWB Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
