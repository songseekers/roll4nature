'use client';

import { useState } from 'react';

interface PetalData {
  id: string;
  label: string;
  subdomain: string;
  domain: string;
  description: string;
  color: string;
  angle: number;
}

const petals: PetalData[] = [
  {
    id: 'vitality',
    label: 'Vitality',
    subdomain: 'Vitality',
    domain: 'Physical',
    description: 'Energy, stamina, and recovery',
    color: '#8B5B9E',
    angle: 0,
  },
  {
    id: 'nourishment',
    label: 'Nourishment',
    subdomain: 'Nourishment',
    domain: 'Physical',
    description: 'Daily fuel and nutrient balance',
    color: '#7A5F95',
    angle: 45,
  },
  {
    id: 'perspective',
    label: 'Perspective',
    subdomain: 'Perspective',
    domain: 'Mental',
    description: 'Seeing the big picture, flexible thinking',
    color: '#B39968',
    angle: 90,
  },
  {
    id: 'clarity',
    label: 'Clarity',
    subdomain: 'Clarity',
    domain: 'Mental',
    description: 'Focused understanding, thoughtful decision-making',
    color: '#C4A574',
    angle: 135,
  },
  {
    id: 'presence',
    label: 'Presence',
    subdomain: 'Presence',
    domain: 'Emotional',
    description: 'Full attunement to others and genuine engagement',
    color: '#5B9467',
    angle: 180,
  },
  {
    id: 'regulation',
    label: 'Regulation',
    subdomain: 'Regulation',
    domain: 'Emotional',
    description: 'Emotional self-mastery and consistency',
    color: '#4A8356',
    angle: 225,
  },
  {
    id: 'environment',
    label: 'Environment',
    subdomain: 'Environment',
    domain: 'Lifestyle',
    description: 'Supportive spaces and surroundings',
    color: '#4A7BA7',
    angle: 270,
  },
  {
    id: 'rhythm',
    label: 'Rhythm',
    subdomain: 'Rhythm',
    domain: 'Lifestyle',
    description: 'Daily routines that sustain energy and focus',
    color: '#5A8CB8',
    angle: 315,
  },
];

interface PurposeFlowerProps {
  onPetalClick?: (petal: PetalData) => void;
  interactive?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function PurposeFlower({
  onPetalClick,
  interactive = true,
  size = 'large',
}: PurposeFlowerProps) {
  const [hoveredPetal, setHoveredPetal] = useState<string | null>(null);
  const [selectedPetal, setSelectedPetal] = useState<PetalData | null>(null);

  const sizeMap = {
    small: { viewBox: '0 0 300 300', petalRadius: 50, centerRadius: 35 },
    medium: { viewBox: '0 0 400 400', petalRadius: 70, centerRadius: 45 },
    large: { viewBox: '0 0 500 500', petalRadius: 90, centerRadius: 60 },
  };

  const { viewBox, petalRadius, centerRadius } = sizeMap[size];

  const handlePetalClick = (petal: PetalData) => {
    setSelectedPetal(petal);
    onPetalClick?.(petal);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <svg
        viewBox={viewBox}
        className="w-full max-w-md mx-auto drop-shadow-lg"
        style={{ maxWidth: size === 'large' ? '500px' : size === 'medium' ? '400px' : '300px' }}
      >
        {/* Petals */}
        {petals.map((petal) => {
          const angleRad = (petal.angle * Math.PI) / 180;
          const cx = 250 + petalRadius * 1.2 * Math.cos(angleRad);
          const cy = 250 + petalRadius * 1.2 * Math.sin(angleRad);

          const isHovered = hoveredPetal === petal.id;
          const isSelected = selectedPetal?.id === petal.id;

          return (
            <g key={petal.id}>
              {/* Petal */}
              <ellipse
                cx={cx}
                cy={cy}
                rx={petalRadius * 0.5}
                ry={petalRadius}
                fill={petal.color}
                opacity={isHovered || isSelected ? 1 : 0.85}
                stroke={isSelected ? '#ffffff' : 'none'}
                strokeWidth={isSelected ? 3 : 0}
                transform={`rotate(${petal.angle + 90} ${cx} ${cy})`}
                className={interactive ? 'cursor-pointer transition-all duration-200' : ''}
                onMouseEnter={() => interactive && setHoveredPetal(petal.id)}
                onMouseLeave={() => interactive && setHoveredPetal(null)}
                onClick={() => interactive && handlePetalClick(petal)}
                style={{
                  filter: isHovered ? 'drop-shadow(0 0 12px rgba(0,0,0,0.3))' : 'none',
                  transform: isHovered ? `scale(1.05)` : 'scale(1)',
                }}
              />

              {/* Petal Label */}
              {size !== 'small' && (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-bold fill-white pointer-events-none"
                  fontSize={size === 'large' ? '16' : '12'}
                >
                  {petal.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Center Stage - Octagon */}
        <circle cx="250" cy="250" r={centerRadius} fill="#8B8B8B" opacity="0.3" />

        {/* Inner octagon */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const x = 250 + (centerRadius * 0.7) * Math.cos(rad);
            const y = 250 + (centerRadius * 0.7) * Math.sin(rad);
            const nextAngle = (((i + 1) * 360) / 8) * (Math.PI / 180);
            const nextX = 250 + (centerRadius * 0.7) * Math.cos(nextAngle);
            const nextY = 250 + (centerRadius * 0.7) * Math.sin(nextAngle);

            if (i === 0) {
              return (
                <path
                  key="octagon"
                  d={
                    Array.from({ length: 8 })
                      .map((_, idx) => {
                        const a = ((idx * 360) / 8) * (Math.PI / 180);
                        const px = 250 + (centerRadius * 0.7) * Math.cos(a);
                        const py = 250 + (centerRadius * 0.7) * Math.sin(a);
                        return `${idx === 0 ? 'M' : 'L'} ${px} ${py}`;
                      })
                      .join(' ') + ' Z'
                  }
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  opacity="0.3"
                />
              );
            }
            return null;
          })}
        </g>

        {/* Center Text - PUR-POSE */}
        <text
          x="250"
          y="245"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold fill-gray-700"
          fontSize={size === 'large' ? '28' : size === 'medium' ? '20' : '14'}
        >
          PUR-
        </text>
        <text
          x="250"
          y="270"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold fill-gray-700"
          fontSize={size === 'large' ? '28' : size === 'medium' ? '20' : '14'}
        >
          POSE
        </text>
      </svg>

      {/* Selected Petal Info */}
      {interactive && selectedPetal && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 max-w-sm border-2 border-blue-200 w-full">
          <div className="flex items-start gap-4">
            <div
              className="w-6 h-6 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: selectedPetal.color }}
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{selectedPetal.label}</h3>
              <p className="text-sm font-semibold text-gray-600 mb-2">{selectedPetal.domain}</p>
              <p className="text-gray-700 leading-relaxed">{selectedPetal.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {size === 'large' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl text-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#8B5B9E' }} />
              <span className="font-semibold text-gray-900">Physical</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">Body</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B39968' }} />
              <span className="font-semibold text-gray-900">Mental</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">Mind</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#5B9467' }} />
              <span className="font-semibold text-gray-900">Emotional</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">Heart</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4A7BA7' }} />
              <span className="font-semibold text-gray-900">Lifestyle</span>
            </div>
            <p className="text-xs text-gray-600 ml-6">World</p>
          </div>
        </div>
      )}
    </div>
  );
}
