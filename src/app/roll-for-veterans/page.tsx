import JourneyHero from '@/components/journey/JourneyHero';
import JourneyStats from '@/components/journey/JourneyStats';
import MissionStatement from '@/components/journey/MissionStatement';
import RouteMap from '@/components/map/RouteMap';
import { getMajorCities } from '@/lib/data-helpers';
import Link from 'next/link';

export const metadata = {
  title: 'Roll for Veterans 2026 | 4,434 Miles of Purpose',
  description: 'Join our epic bike journey from Key West to Grand Canyon, connecting with veterans in 80+ communities. Feb 27 - Jun 13, 2026.',
};

export default function RollForVeteransPage() {
  const majorCities = getMajorCities();

  return (
    <div className="bg-white">
      {/* Journey Hero */}
      <JourneyHero />

      {/* Journey Stats */}
      <JourneyStats />

      {/* Mission Statement */}
      <MissionStatement />

      {/* Interactive Route Map */}
      <section id="map" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Explore Our Route
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Click on any city to see arrival dates, population, and local Team RWB chapter information.
          </p>
          <RouteMap />
        </div>
      </section>

      {/* Featured Cities Section */}
      <section id="cities" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Major Stops
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            19 key cities along our 4,434-mile journey from Key West to the Grand Canyon
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorCities.map((city) => (
              <Link key={city.slug} href={`/roll4veterans/${city.slug}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer h-full border border-gray-200">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-12 flex items-center px-6">
                    <span className="text-white font-bold">Day {city.dayNumber}</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {city.name}, {city.state}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-semibold">Arrival:</span> {new Date(city.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p>
                        <span className="font-semibold">Population:</span> {city.population.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold">Distance from start:</span> {city.distanceFromStart} miles
                      </p>
                    </div>

                    {city.rwbChapter && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs mb-4">
                        <p className="font-bold text-blue-900">{city.rwbChapter.name}</p>
                        <p className="text-blue-700">{city.rwbChapter.contactEmail}</p>
                      </div>
                    )}

                    <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Bravo Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Team Bravo
          </h2>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready to be part of this epic journey? Join our core cycling team and ride across America
            in support of Team RWB veterans.
          </p>

          <Link
            href="/team-bravo"
            className="inline-block bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 transition text-lg"
          >
            Learn About Team Bravo
          </Link>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Support the Mission?
          </h2>

          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Whether you want to donate, volunteer, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
            >
              Donate Now
            </a>
            <Link
              href="/team-bravo"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition inline-block"
            >
              Join Team Bravo
            </Link>
          </div>
        </div>
      </section>

      {/* Purpose Framework Connection */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center border-t border-gray-200 pt-16">
          <p className="text-gray-600 mb-4">
            Want to explore the bigger picture?
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            The Purpose Framework Behind This Journey
          </h3>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            This journey embodies all 8 dimensions of whole-person health: Physical vitality,
            Mental clarity, Emotional presence, and a Lifestyle of purpose.
          </p>

          <Link
            href="/guidebook"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Explore the Purpose Pathfinder →
          </Link>
        </div>
      </section>
    </div>
  );
}
