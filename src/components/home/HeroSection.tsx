import Link from 'next/link';
import CountdownTimer from './CountdownTimer';
import PurposeFlower from './PurposeFlower';
import { useState } from 'react';

export default function HeroSection() {
  const [selectedPetal, setSelectedPetal] = useState<any>(null);

  return (
    <div className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Background */}
      <div className="relative bg-gradient-to-b from-gray-50 to-blue-50 rounded-xl overflow-hidden">
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto py-12 px-6 sm:py-16 sm:px-10">
          {/* Purpose Statement */}
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-700 italic mb-4 leading-relaxed max-w-3xl mx-auto">
              "Too many dwell in silent despair—their true purpose unrealized,{' '}
              <span className="font-bold text-blue-700">songs yet unsung!</span>"
            </p>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              This journey is about more than miles. It's about discovering and living your purpose.
            </p>
          </div>

          {/* Grid: Flower + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left: Purpose Flower */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <PurposeFlower
                  onPetalClick={setSelectedPetal}
                  interactive={true}
                  size="large"
                />
              </div>
            </div>

            {/* Right: Purpose Context */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Where Blooming Meets Rolling
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The <span className="font-semibold">Purpose Pathfinder</span> guides whole-person health
                  across eight interconnected domains. This journey brings that framework into motion.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                <h3 className="font-bold text-gray-900 mb-3">The 8 Petals of Purpose:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Physical:</span> Vitality, Nourishment
                  </div>
                  <div>
                    <span className="font-semibold">Mental:</span> Perspective, Clarity
                  </div>
                  <div>
                    <span className="font-semibold">Emotional:</span> Presence, Regulation
                  </div>
                  <div>
                    <span className="font-semibold">Lifestyle:</span> Environment, Rhythm
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                <span className="font-bold text-blue-700">Click on any petal</span> to see how this journey
                honors each dimension of whole-person health.
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12 pt-8 border-t border-gray-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Roll for Veterans 2026
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-blue-700 mb-8 font-bold">
              4,434 Miles of Purpose in Motion
            </p>

            {/* Description */}
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join us on an epic cross-country bike journey from Key West, Florida to the Grand Canyon,
              Arizona, supporting Team RWB (Red, White & Blue) and connecting with veterans in every
              community along the way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 bg-white rounded-lg p-6 mb-10 shadow-sm">
              <div>
                <div className="text-3xl font-bold text-blue-600">4,434</div>
                <div className="text-sm text-gray-600">Miles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">80+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">107</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#map"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
              >
                Explore the Route
              </Link>
              <a
                href="https://songseekers.org/guidebook"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition inline-block"
              >
                Download Purpose Guidebook
              </a>
              <a
                href="https://zeffy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition inline-block"
              >
                Support Our Mission
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="mt-16 bg-gradient-to-b from-gray-50 to-white rounded-xl p-8 sm:p-12">
        <CountdownTimer />
      </div>
    </div>
  );
}
