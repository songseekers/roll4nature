'use client';

import { useState } from 'react';
import PurposeFlower from './PurposeFlower';

interface PetalMapping {
  id: string;
  title: string;
  petalLabel: string;
  journeyTitle: string;
  journeyDescription: string;
  journeyPoints: string[];
  journeyMessage: string;
}

const petalMappings: PetalMapping[] = [
  {
    id: 'vitality',
    title: 'Building the Engine',
    petalLabel: 'Vitality',
    journeyTitle: 'How Our Journey Honors Vitality',
    journeyDescription:
      'Every pedal stroke builds endurance, resilience, and the living energy that propels us forward.',
    journeyPoints: [
      '4,463 miles of sustained physical challenge',
      '55 miles per day average across 107 days',
      'Training now for peak performance in Feb-June 2026',
      "Celebrating the body's remarkable capacity to show up",
    ],
    journeyMessage:
      '"Every pedal stroke builds vitality for ourselves and the veterans we ride to honor"',
  },
  {
    id: 'nourishment',
    title: 'Fueling the Mission',
    petalLabel: 'Nourishment',
    journeyTitle: 'How Our Journey Honors Nourishment',
    journeyDescription:
      'We nourish not just our bodies, but our spirits through intentional community support and care.',
    journeyPoints: [
      'Nutritious fuel for 107 days of cross-country riding',
      'Community meals in 80+ cities celebrating local culture',
      'Gratitude and care woven into every bite',
      'Nourishing body and spirit as one practice',
    ],
    journeyMessage: `"Nourishment is more than fuel—it's a daily practice of care and gratitude"`,
  },
  {
    id: 'perspective',
    title: 'Seeing America from a Saddle',
    petalLabel: 'Perspective',
    journeyTitle: 'How Our Journey Honors Perspective',
    journeyDescription:
      'Cross-country travel opens eyes to the vast beauty and diversity of America and its veterans.',
    journeyPoints: [
      'Geographic diversity: coasts, deserts, mountains, plains',
      'Meeting veterans with different stories and experiences',
      'Understanding RWB chapters and communities nationwide',
      'Broadening view of what it means to serve and connect',
    ],
    journeyMessage: `"Perspective is not dismissing your own view—it's expanding it to honor all narratives"`,
  },
  {
    id: 'clarity',
    title: 'Finding Focus on the Road',
    petalLabel: 'Clarity',
    journeyTitle: 'How Our Journey Honors Clarity',
    journeyDescription:
      'The open road provides space for clear thinking about what matters most: purpose, connection, service.',
    journeyPoints: [
      'Daily clarity about our core mission: supporting veterans',
      'Focused presence with each community we visit',
      'Clear communication of RWB values and impact',
      'Alignment of action with deepest purpose',
    ],
    journeyMessage: `"Clarity is not forcing answers—it's cultivating space for understanding to emerge"`,
  },
  {
    id: 'presence',
    title: 'Genuine Connection Across Miles',
    petalLabel: 'Presence',
    journeyTitle: 'How Our Journey Honors Presence',
    journeyDescription:
      'We meet veterans face-to-face, listen deeply, and create sanctuary through authentic engagement.',
    journeyPoints: [
      'Meeting veterans in 42+ communities along our route',
      'Listening to stories that matter and have gone unheard',
      'Creating spaces where veterans feel truly seen',
      'Full attunement and care in every interaction',
    ],
    journeyMessage:
      '"Presence is meeting others where they are—with your whole being and without judgment"',
  },
  {
    id: 'regulation',
    title: 'Emotional Resilience on the Journey',
    petalLabel: 'Regulation',
    journeyTitle: 'How Our Journey Honors Regulation',
    journeyDescription:
      'Managing emotions through 107 days of physical, mental, and emotional demands while staying centered.',
    journeyPoints: [
      'Navigating challenges with emotional steadiness',
      'Staying grounded in our core mission and values',
      'Supporting each other through difficult moments',
      'Modeling emotional resilience for veterans we meet',
    ],
    journeyMessage:
      '"Regulation allows you to weather storms without losing your center"',
  },
  {
    id: 'environment',
    title: 'Creating Community Spaces',
    petalLabel: 'Environment',
    journeyTitle: 'How Our Journey Honors Environment',
    journeyDescription:
      'We shape supportive environments in 80+ cities where veterans feel welcome, valued, and connected.',
    journeyPoints: [
      'Creating welcoming gathering spaces in each city',
      'Supporting local RWB chapters and organizations',
      'Building community infrastructure for veteran connection',
      'Environment becomes an ally for healing and growth',
    ],
    journeyMessage:
      '"Environment becomes more than backdrop—it becomes an ally for your inner purpose"',
  },
  {
    id: 'rhythm',
    title: 'Sustainable Pace of Purpose',
    petalLabel: 'Rhythm',
    journeyTitle: 'How Our Journey Honors Rhythm',
    journeyDescription:
      'Finding sustainable rhythm between the push of cycling and the pause of community connection.',
    journeyPoints: [
      'Daily cycles: ride, recover, engage with community',
      'Balance between pushing forward and honoring rest',
      'Rhythm that sustains vitality over 107 days',
      'Movement with flow, where rest and action partner together',
    ],
    journeyMessage:
      '"Rhythm is less about pushing through fatigue and more about moving with flow"',
  },
];

export default function PurposeJourney() {
  const [selectedPetalId, setSelectedPetalId] = useState<string | null>(null);
  const selectedMapping = petalMappings.find((m) => m.id === selectedPetalId);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Purpose Journey Starts Here</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Click on any petal to explore how this journey honors each dimension of whole-person health and
            connects to supporting veterans.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Flower */}
          <div className="flex justify-center sticky top-8">
            <div className="w-full max-w-sm">
              <PurposeFlower
                onPetalClick={(petal) => {
                  const mapping = petalMappings.find((m) => m.id === petal.id);
                  if (mapping) setSelectedPetalId(petal.id);
                }}
                interactive={true}
                size="large"
              />
            </div>
          </div>

          {/* Right: Selected Petal Info */}
          <div>
            {selectedMapping ? (
              <div className="space-y-6 animate-fadeIn">
                {/* Petal Title */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedMapping.journeyTitle}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{selectedMapping.journeyDescription}</p>
                </div>

                {/* Journey Points */}
                <div className="bg-r4n-primary border-l-4 border-r4n-tan-dark p-6 rounded-lg">
                  <h4 className="font-bold text-r4n-grass mb-4">On This Journey:</h4>
                  <ul className="space-y-3">
                    {selectedMapping.journeyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-r4n-grass font-bold mt-1">→</span>
                        <span className="text-r4n-tan">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Journey Message */}
                <div style={{ backgroundColor: '#2a1a08' }} className="p-6 rounded-lg border border-r4n-tan-dark">
                  <p className="text-lg italic text-r4n-tan leading-relaxed">{selectedMapping.journeyMessage}</p>
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-3">
                  <a
                    href="https://songseekers.org/guidebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    Download Full Purpose Guidebook
                  </a>
                  <p className="text-center text-sm text-gray-600">
                    Learn more about the 8 dimensions of whole-person health
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-12 text-center">
                <p className="text-lg text-gray-600 mb-4">Select a petal to explore how Roll 4 Nature 2026</p>
                <p className="text-lg text-gray-600">honors each dimension of purpose</p>
              </div>
            )}
          </div>
        </div>

        {/* All Petals Overview */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">All 8 Dimensions of Purpose</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {petalMappings.map((mapping) => (
              <button
                key={mapping.id}
                onClick={() => setSelectedPetalId(mapping.id)}
                className={`p-6 rounded-lg text-center transition transform hover:scale-105 cursor-pointer ${
                  selectedPetalId === mapping.id
                    ? 'bg-r4n-primary text-r4n-grass shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-900 hover:border-r4n-tan'
                }`}
              >
                <h4 className="font-bold mb-2">{mapping.petalLabel}</h4>
                <p className={`text-sm ${selectedPetalId === mapping.id ? 'text-r4n-tan' : 'text-gray-600'}`}>
                  {mapping.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
