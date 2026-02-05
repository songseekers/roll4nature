import JourneyHero from '@/components/journey/JourneyHero';
import MissionStatement from '@/components/journey/MissionStatement';
import RouteMap from '@/components/map/RouteMap';
import Image from 'next/image';

export const metadata = {
  title: 'R4V 2026: Coast to Coast to Canyon | 4,463 Miles of Purpose',
  description: 'Join our epic bike journey from Key West, FL to Los Angeles, CA to Flagstaff, AZ, connecting with veterans in 72 communities. Feb 27 - June 21, 2026.',
};

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Journey Hero */}
      <JourneyHero />

      {/* Mission Statement */}
      <MissionStatement />

      {/* Interactive Route Map */}
      <section id="map" className="bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Explore Our Route
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-center mb-8 max-w-xl mx-auto">
            Click on any city to see arrival dates and Team RWB chapter information.
          </p>
          <RouteMap />
        </div>
      </section>

      {/* Team Bravo Section */}
      <section className="bg-gradient-to-b from-[#E8C9A1] dark:from-[#8B4513] to-white dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Image
              src="/images/TeamBravoFlag.png"
              alt="Team Bravo Flag"
              width={400}
              height={200}
              className="mx-auto object-contain"
            />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to be part of this epic journey? Find out more about Team Bravo and the ride across America in the video below.
          </p>

          <a
            href="https://youtu.be/4tmbTdqWGbI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C1592B] text-white px-10 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition text-lg"
          >
            Learn About Team Bravo
          </a>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Support the Mission?
          </h2>

          <p className="text-xl text-[#E8C9A1] mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.zeffy.com/en-US/team/roll-for-veterans"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#C1592B] px-8 py-3 rounded-lg font-bold hover:bg-[#E8C9A1] transition inline-block"
            >
              Donate Now
            </a>
            <a
              href="/sponsor"
              className="bg-[#E07B4F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#C1592B] transition inline-block"
            >
              Become a Sponsor
            </a>
            <a
              href="/team-bravo"
              className="bg-[#D4A574] text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-[#E8C9A1] transition inline-block"
            >
              Join Team Bravo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
