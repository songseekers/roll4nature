'use client';

export default function MissionStatement() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mission Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why We Roll
            </h2>

            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Team RWB (Red, White & Blue) empowers veterans through physical and social engagement.
              Our cross-country journey connects 80+ communities and celebrates the resilience of America's veterans.
            </p>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <span className="font-semibold">Not broken, still moving.</span> Every mile represents gratitude,
              every city represents connection, and every veteran matters.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              This journey honors the 8 dimensions of whole-person health—the same framework that guides
              our Purpose Pathfinder work. We're embodying Physical vitality, Mental clarity, Emotional presence,
              and a Lifestyle of purpose as we ride.
            </p>

            <a
              href="https://teamrwb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Learn More About Team RWB
            </a>
          </div>

          {/* Right: Stats Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Team RWB Impact
            </h3>

            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">173,768</div>
                <p className="text-gray-700">Event check-ins in 2025</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">18,490</div>
                <p className="text-gray-700">Total events nationwide</p>
              </div>

              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
                <p className="text-gray-700">Communities on our route</p>
              </div>

              <div className="pt-6 border-t border-blue-300">
                <a
                  href="https://teamrwb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Join Team RWB Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
