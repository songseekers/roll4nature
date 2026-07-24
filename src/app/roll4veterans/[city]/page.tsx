import { getCityBySlug, getAllCityNames } from '@/lib/data-helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, Calendar } from 'lucide-react';

interface Props {
  params: {
    city: string;
  };
}

export async function generateStaticParams() {
  return getAllCityNames().map((slug) => ({
    city: slug,
  }));
}

export function generateMetadata({ params }: Props) {
  const city = getCityBySlug(params.city);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `${city.name}, ${city.state} | Roll 4 Nature 2026`,
    description: `Join the Roll 4 Nature on Day ${city.dayNumber} in ${city.name}. Population: ${city.population.toLocaleString()}. Team RWB chapter information and signup form included.`,
  };
}

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  const arrivalDate = new Date(city.arrivalDate);
  const formattedDate = arrivalDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-r4n-grass hover:text-r4n-grass-hover font-semibold mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Journey
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-r4n-primary to-[#3D220F] text-r4n-tan py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 inline-block bg-r4n-primary-hover px-4 py-1 rounded-full">
            <span className="text-sm font-bold">Day {city.dayNumber} of 108</span>
          </div>

          <h1 className="text-5xl font-bold mb-4">
            {city.name}, {city.state}
          </h1>

          <p className="text-xl text-r4n-tan mb-6">
            {formattedDate}
          </p>

          <p className="text-r4n-tan text-lg max-w-2xl">
            {city.description || `Join us for Day ${city.dayNumber} of the Roll 4 Nature journey in ${city.name}, ${city.state}.`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - City Info */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-r4n-primary rounded-lg p-6 border-2 border-r4n-tan">
                <div className="flex items-center mb-2">
                  <Users size={24} className="text-r4n-grass mr-2" />
                  <span className="text-r4n-tan font-semibold">Population</span>
                </div>
                <div className="text-3xl font-bold text-r4n-tan">
                  {city.population.toLocaleString()}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-center mb-2">
                  <MapPin size={24} className="text-green-600 mr-2" />
                  <span className="text-gray-600 font-semibold">Miles</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {city.distanceFromStart}
                </div>
                <div className="text-sm text-gray-600">from Key West</div>
              </div>

              {city.distanceFromPrevious > 0 && (
                <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 font-semibold">Daily Ride</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {city.distanceFromPrevious}
                  </div>
                  <div className="text-sm text-gray-600">miles to reach</div>
                </div>
              )}

              <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                <div className="flex items-center mb-2">
                  <Calendar size={24} className="text-orange-600 mr-2" />
                  <span className="text-gray-600 font-semibold">Day</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {city.dayNumber}/108
                </div>
              </div>
            </div>

            {/* Team RWB Chapter Info */}
            {city.rwbChapter && (
              <div className="bg-r4n-primary border-2 border-r4n-tan rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-r4n-tan mb-4">
                  Team RWB Chapter
                </h3>
                <p className="text-xl text-r4n-tan font-semibold mb-2">
                  {city.rwbChapter.name}
                </p>
                <p className="text-r4n-tan mb-4">
                  Email: <a href={`mailto:${city.rwbChapter.contactEmail}`} className="text-r4n-grass hover:underline">
                    {city.rwbChapter.contactEmail}
                  </a>
                </p>
                {city.rwbChapter.website && (
                  <a
                    href={city.rwbChapter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-r4n-primary-hover text-r4n-tan px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Visit Chapter Website
                  </a>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <a
                href="https://zeffy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition text-center"
              >
                Support Our Mission
              </a>
              <Link
                href="/team-bravo"
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition text-center"
              >
                Join Team Bravo
              </Link>
            </div>
          </div>

          {/* Right Column - Signup */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-r4n-primary to-r4n-primary-hover border-2 border-r4n-tan rounded-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-r4n-tan mb-4">
                Join Us Here
              </h3>

              <p className="text-r4n-tan mb-6">
                Want to meet us, ride with us, or volunteer in {city.name}?
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-r4n-tan mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-r4n-grass focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-r4n-tan mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-r4n-grass focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-r4n-tan mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-r4n-grass focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-r4n-tan mb-2">
                    How can you help?
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-r4n-grass focus:border-transparent">
                    <option>Select an option</option>
                    <option>Ride with us</option>
                    <option>Meet & greet</option>
                    <option>Volunteer</option>
                    <option>Host us</option>
                  </select>
                </div>

                <button className="w-full bg-r4n-tan text-r4n-primary py-2 rounded-lg font-bold hover:bg-r4n-tan-hover transition">
                  Sign Me Up!
                </button>
              </div>

              <p className="text-xs text-r4n-tan text-center mt-6">
                100% of donations go to Team RWB
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Between Cities */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Continue Your Journey</h3>

          <div className="flex gap-4 flex-col sm:flex-row">
            {city.dayNumber > 1 && (
              <Link
                href="/#map"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                ← Back to Map
              </Link>
            )}
            <Link
              href="/#cities"
              className="flex-1 bg-r4n-primary hover:bg-r4n-primary-hover text-r4n-tan px-6 py-3 rounded-lg font-semibold transition text-center"
            >
              Explore All 42+ Communities →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
