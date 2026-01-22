import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

export default function HeroSection() {
  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto py-16 px-6 sm:py-20 sm:px-10 text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Roll for Veterans 2026
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-blue-100 mb-8 leading-relaxed">
            4,434 Miles. 80+ Cities. One Mission: Gratitude
          </p>

          {/* Description */}
          <p className="text-blue-50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join us on an epic cross-country bike journey from Key West, Florida to the Grand Canyon,
            Arizona, supporting Team RWB (Red, White & Blue) and connecting with veterans in every
            community along the way.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/#map"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
            >
              Explore the Route
            </Link>
            <a
              href="https://zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition inline-block"
            >
              Support Our Mission
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-white">
            <div>
              <div className="text-3xl font-bold">4,434</div>
              <div className="text-sm text-blue-100">Miles</div>
            </div>
            <div>
              <div className="text-3xl font-bold">80+</div>
              <div className="text-sm text-blue-100">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold">108</div>
              <div className="text-sm text-blue-100">Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="mt-20 bg-gradient-to-b from-gray-50 to-white rounded-xl p-8 sm:p-12">
        <CountdownTimer />
      </div>
    </div>
  );
}
