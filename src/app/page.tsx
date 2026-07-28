import JourneyHero from '@/components/journey/JourneyHero';
import MissionStatement from '@/components/journey/MissionStatement';
import FacebookComments from '@/components/home/FacebookComments';
import RouteMapLoader from '@/components/map/RouteMapLoader';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'R4N 2026: Coast to Coast to Canyon | 4,444 Miles of Purpose',
  description: 'Join our epic bike journey from Key West, FL to Flagstaff, AZ, connecting with veterans in 57 communities. Rolling 4 Purpose, Health, Discovery, and Veterans. Feb 27 - July 1, 2026.',
};

export default function HomePage() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
  const showFlagstaffBanner = today < '2026-07-03';
  const showCelebrationBanner = Date.now() < new Date('2026-07-04T17:00:00Z').getTime();

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
      <JourneyHero showBanner={showFlagstaffBanner} />

      {/* 4th of July Parade — expires July 4 at noon CT */}
      {showCelebrationBanner && (
        <section className="bg-gradient-to-r from-red-600 to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              🎆 Celebrate the Finish 🎆
            </h2>
            <p className="text-xl text-white mb-8 leading-relaxed">
              Join us for the Flagstaff 4th of July Parade—the perfect way to celebrate 4,444 miles of purpose, connection, and community.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8 max-w-2xl mx-auto border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left sm:text-center">
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-2">DATE & TIME</p>
                  <p className="text-2xl font-bold">July 4, 2026</p>
                  <p className="text-lg">9:00 AM</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 mb-2">LOCATION</p>
                  <p className="text-2xl font-bold">Beaver St & Elm St</p>
                  <p className="text-lg">Flagstaff, Arizona</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re local or traveling from afar, come celebrate the end of a journey with Team RWB, Team Bravo, and everyone who made this ride possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://maps.google.com/?q=Beaver+St+and+Elm+St,+Flagstaff,+AZ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
              >
                View Location on Map
              </a>
              <a
                href="mailto:roll4veterans@gmail.com?subject=4th%20of%20July%20Parade%20-%20Flagstaff"
                className="bg-blue-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition text-lg"
              >
                Get More Info
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 1. Interactive Route Map ── */}
      <section id="map" className="bg-gray-50 dark:bg-gray-800 pb-8 pt-0 px-4 sm:px-6 lg:px-8 transition-colors">
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

      {/* ── 2. Live Tracking — sits below map ── */}
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

      {/* ── 3. Team Bravo — human connection before mission ── */}
      <section style={{ backgroundColor: '#2a1a08' }} className="py-16 px-4 sm:px-6 lg:px-8">
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
          <p style={{ color: '#F2DFC0' }} className="text-lg mb-8 max-w-2xl mx-auto">
            Ready to be part of this epic journey? Find out more about Team Bravo and the ride across America.
          </p>
          <a
            href="/team-bravo"
            style={{ backgroundColor: '#3d2810', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
            className="inline-block px-10 py-3 rounded-lg font-bold transition text-lg hover:opacity-90"
          >
            Learn About Team Bravo
          </a>
        </div>
      </section>

      {/* ── 4. Discover Your Purpose ── */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Your Purpose
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            JT is a certified integrative health coach. The same framework guiding him across 4,000+ miles is available to you — free.
          </p>
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
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-6 mb-4">
            Click the image to explore the framework, or go straight to the guidebook.
          </p>
          <a
            href="/purpose"
            style={{ backgroundColor: '#2a1a08', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
            className="inline-block px-8 py-3 rounded-lg font-semibold transition text-base hover:opacity-90"
          >
            Find Your Purpose
          </a>
        </div>
      </section>

      {/* ── 5. About Team RWB (was "Why We Roll") ── */}
      <MissionStatement />

      {/* ── 6. Facebook Comments ── */}
      <FacebookComments />

      {/* ── 7. Main CTA ── */}
      <section style={{ backgroundColor: '#2a1a08' }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ color: '#A8D878' }} className="text-4xl font-bold mb-6">
            Ready to Support the Mission?
          </h2>
          <p style={{ color: '#F2DFC0' }} className="text-xl mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              style={{ backgroundColor: '#F2DFC0', color: '#2a1a08' }}
              className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition inline-block"
            >
              Help Fuel the Mission
            </a>
            <a
              href="/partner"
              style={{ backgroundColor: '#3d2810', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
              className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition inline-block"
            >
              Become a Partner
            </a>
            <a
              href="/team-bravo"
              style={{ backgroundColor: '#3d2810', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
              className="px-8 py-3 rounded-lg font-bold hover:opacity-90 transition inline-block"
            >
              Join Team Bravo
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
