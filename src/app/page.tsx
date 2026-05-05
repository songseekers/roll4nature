import JourneyHero from '@/components/journey/JourneyHero';
import MissionStatement from '@/components/journey/MissionStatement';
import FacebookComments from '@/components/home/FacebookComments';
import RouteMapLoader from '@/components/map/RouteMapLoader';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'R4V 2026: Coast to Coast to Canyon | 4,545 Miles of Purpose',
  description: 'Join our epic bike journey from Key West, FL to Los Angeles, CA to Flagstaff, AZ, connecting with veterans in 48 communities. Feb 27 - June 22, 2026.',
};

export default function HomePage() {
  const trackingRaw = fs.readFileSync(
    path.join(process.cwd(), 'src/data/tracking.json'),
    'utf-8'
  );
  const trackingData = JSON.parse(trackingRaw) as { url: string; expires: number };
  const isTrackingActive = (() => {
    const { url, expires } = trackingData;
    const now = Math.floor(Date.now() / 1000);
    return !!url && expires > 0 && now < expires;
  })();

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Journey Hero */}
      <JourneyHero />

      {/* Interactive Route Map */}
      <section id="map" className="bg-gray-50 dark:bg-gray-800 pb-16 pt-0 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Explore Our Route
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Click on any city to see arrival dates and Team RWB chapter information.
          </p>
          <RouteMapLoader />
        </div>
      </section>

      {/* Live Tracking Banner — only rendered when a session is active */}
      {isTrackingActive && (
        <section className="bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-white font-semibold text-sm">
                  JT is currently on The Path
                </span>
              </div>
              <p className="text-gray-400 text-xs text-center sm:text-left">
                Location is shared only while JT is riding
              </p>
            </div>
            <a
              href="/track"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-2 rounded-lg transition text-sm whitespace-nowrap"
            >
              Track Live Location →
            </a>
          </div>
        </section>
      )}

      {/* Mission Statement */}
      <MissionStatement />

      {/* Facebook Comments */}
      <FacebookComments />

      {/* Team Bravo Section */}
      <section className="bg-gradient-to-b from-[#E8C9A1] dark:from-[#8B4513] to-white dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/images/TeamBravoPatch.png"
              alt="Team Bravo Patch"
              width={400}
              height={200}
              className="mx-auto object-contain dark:hidden"
            />
            <Image
              src="/images/TeamBravoFlag.png"
              alt="Team Bravo Flag"
              width={400}
              height={200}
              className="mx-auto object-contain hidden dark:block"
            />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to be part of this epic journey? Find out more about Team Bravo and the ride across America in the video below.
          </p>

          <a
            href="/team-bravo"
            className="inline-block bg-[#C1592B] text-white px-10 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition text-lg"
          >
            Learn About Team Bravo
          </a>

          <div className="mt-10 pt-8 border-t border-[#C1592B]/30">
            <a href="/purpose">
              <Image
                src="/resources/PP_dk.png"
                alt="The Purpose Pathfinder — click to learn more"
                width={350}
                height={350}
                className="mx-auto object-contain dark:hidden hover:opacity-80 transition cursor-pointer"
              />
              <Image
                src="/resources/PP.png"
                alt="The Purpose Pathfinder — click to learn more"
                width={350}
                height={350}
                className="mx-auto object-contain hidden dark:block hover:opacity-80 transition cursor-pointer"
              />
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 mt-4">
              Interested in working with JT &amp; Sean as your integrative health coaches?
            </p>
            <a
              href="/purpose"
              className="inline-block bg-[#8B4513] text-white px-8 py-2 rounded-lg font-semibold hover:bg-[#6d360f] transition text-base"
            >
              Find Your Purpose
            </a>
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Support the Mission?
          </h2>

          <p className="text-xl text-white mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-[#D4A574] text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-[#c49464] transition inline-block"
            >
              Help Fuel the Mission
            </a>
            <a
              href="/sponsor"
              className="bg-[#C1592B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#a84d25] transition inline-block"
            >
              Become a Partner
            </a>
            <a
              href="/team-bravo"
              className="bg-[#8B4513] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#6d360f] transition inline-block"
            >
              Join Team Bravo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
