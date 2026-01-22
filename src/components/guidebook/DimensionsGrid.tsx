'use client';

interface Dimension {
  id: string;
  label: string;
  description: string;
  color: string;
}

interface DomainGroup {
  name: string;
  subtitle: string;
  dimensions: Dimension[];
}

const domains: DomainGroup[] = [
  {
    name: 'Physical',
    subtitle: 'Body',
    dimensions: [
      {
        id: 'vitality',
        label: 'Vitality',
        description: 'Energy, stamina, and recovery',
        color: '#8B5B9E',
      },
      {
        id: 'nourishment',
        label: 'Nourishment',
        description: 'Daily fuel and nutrient balance',
        color: '#7A5F95',
      },
    ],
  },
  {
    name: 'Mental',
    subtitle: 'Mind',
    dimensions: [
      {
        id: 'perspective',
        label: 'Perspective',
        description: 'Seeing the big picture, flexible thinking',
        color: '#B39968',
      },
      {
        id: 'clarity',
        label: 'Clarity',
        description: 'Focused understanding, thoughtful decision-making',
        color: '#C4A574',
      },
    ],
  },
  {
    name: 'Emotional',
    subtitle: 'Heart',
    dimensions: [
      {
        id: 'presence',
        label: 'Presence',
        description: 'Full attunement to others and genuine engagement',
        color: '#5B9467',
      },
      {
        id: 'regulation',
        label: 'Regulation',
        description: 'Emotional self-mastery and consistency',
        color: '#4A8356',
      },
    ],
  },
  {
    name: 'Lifestyle',
    subtitle: 'World',
    dimensions: [
      {
        id: 'environment',
        label: 'Environment',
        description: 'Supportive spaces and surroundings',
        color: '#4A7BA7',
      },
      {
        id: 'rhythm',
        label: 'Rhythm',
        description: 'Daily routines that sustain energy and focus',
        color: '#5A8CB8',
      },
    ],
  },
];

export default function DimensionsGrid() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            All 8 Dimensions of Purpose
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organized across four life domains, these dimensions work together to create whole-person health.
          </p>
        </div>

        <div className="space-y-12">
          {domains.map((domain) => (
            <div key={domain.name}>
              {/* Domain Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{domain.name}</h3>
                <p className="text-sm text-gray-600 italic">{domain.subtitle}</p>
              </div>

              {/* Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {domain.dimensions.map((dim) => (
                  <div
                    key={dim.id}
                    className="rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(${hexToRgb(dim.color)}, 0.05) 0%, rgba(${hexToRgb(dim.color)}, 0) 100%)`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Color Dot */}
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 mt-1 shadow-md"
                        style={{
                          backgroundColor: dim.color,
                          boxShadow: `0 2px 8px ${dim.color}40`,
                        }}
                      />

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {dim.label}
                        </h4>
                        <p className="text-sm text-gray-600">{dim.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spiritual Center */}
        <div className="mt-12 pt-12 border-t border-gray-200 text-center">
          <div className="inline-block">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300 flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Spiritual</h3>
            <p className="text-base text-gray-600 italic max-w-md">
              The center that connects all dimensions—your sense of purpose and meaning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '0, 0, 0';
}
