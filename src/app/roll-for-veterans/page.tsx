import JourneyHero from '@/components/journey/JourneyHero';
import MissionStatement from '@/components/journey/MissionStatement';
import RouteMapLoader from '@/components/map/RouteMapLoader';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'R4N 2026: Coast to Coast to Canyon | 4,545 Miles of Purpose',
  description: 'Join our epic bike journey from Key West, FL to Los Angeles, CA to Flagstaff, AZ, connecting with veterans in 42+ communities. Feb 27 - June 27, 2026.',
};

export default function RollForVeteransPage() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors">
      {/* Journey Hero */}
      <JourneyHero />

      {/* Interactive Route Map */}
      <section id="map" className="bg-white dark:bg-gray-900 pb-16 pt-0 px-4 sm:px-6 lg:px-8 transition-colors">
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

      {/* Mission Statement */}
      <MissionStatement />

      {/* Team Bravo Section */}
      <section className="bg-r4n-primary py-16 px-4 sm:px-6 lg:px-8 transition-colors">
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

          <p className="text-lg text-r4n-tan mb-8 max-w-2xl mx-auto">
            Ready to be part of this epic journey? Find out more about Team Bravo and the ride across America in the video below.
          </p>

          <Link
            href="/team-bravo"
            style={{ backgroundColor: '#3d2810', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
            className="inline-flex items-center justify-center rounded-lg font-bold px-8 py-4 text-lg transition hover:opacity-90"
          >
            Learn About Team Bravo
          </Link>
        </div>
      </section>

      {/* Main CTA Section */}
      <section style={{ backgroundColor: '#2a1a08' }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-r4n-grass">
            Ready to Support the Mission?
          </h2>

          <p className="text-xl text-r4n-tan mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="md" href="https://www.zeffy.com/en-US/team/roll-for-veterans" target="_blank" rel="noopener noreferrer">
              Donate to Team RWB
            </Button>
            <Button variant="tan-dark" size="md" href="https://gofund.me/fdff623ca" target="_blank" rel="noopener noreferrer">
              R4N GoFundMe
            </Button>
            <Link
              href="/sponsor"
              style={{ backgroundColor: '#3d2810', color: '#F2DFC0', border: '1px solid #E0C4A0' }}
              className="inline-flex items-center justify-center rounded-lg font-bold px-6 py-3 text-base transition hover:opacity-90"
            >
              Become a Partner
            </Link>
            <Button variant="dark" size="md" href="/team-bravo">
              Join Team Bravo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
