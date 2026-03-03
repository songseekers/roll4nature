import JourneyHero from '@/components/journey/JourneyHero';
import MissionStatement from '@/components/journey/MissionStatement';
import RouteMapLoader from '@/components/map/RouteMapLoader';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata = {
  title: 'R4V 2026: Coast to Coast to Canyon | 4,463 Miles of Purpose',
  description: 'Join our epic bike journey from Key West, FL to Los Angeles, CA to Flagstaff, AZ, connecting with veterans in 42+ communities. Feb 27 - June 21, 2026.',
};

export default function RollForVeteransPage() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors">
      {/* Journey Hero */}
      <JourneyHero />

      {/* Interactive Route Map */}
      <section id="map" className="bg-gray-50 dark:bg-gray-900 pb-16 pt-0 px-4 sm:px-6 lg:px-8 transition-colors">
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
      <section className="bg-gradient-to-b from-r4v-tan dark:from-r4v-secondary to-white dark:to-gray-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
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

          <Button variant="primary" size="lg" href="/team-bravo">
            Learn About Team Bravo
          </Button>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="bg-gradient-to-r from-r4v-primary to-r4v-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Support the Mission?
          </h2>

          <p className="text-xl text-white mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="md" href="https://www.zeffy.com/en-US/team/roll-for-veterans" target="_blank" rel="noopener noreferrer">
              Donate to Team RWB
            </Button>
            <Button variant="tan-dark" size="md" href="https://gofund.me/fdff623ca" target="_blank" rel="noopener noreferrer">
              R4V GoFundMe
            </Button>
            <Button variant="primary" size="md" href="/sponsor">
              Become a Partner
            </Button>
            <Button variant="dark" size="md" href="/team-bravo">
              Join Team Bravo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
