'use client';

import { useState } from 'react';

interface PetalData {
  id: string;
  label: string;
  subdomain: string;
  domain: string;
  description: string;
  color: string;
  lightColor: string;
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
    lightColor: '#B08FBF',
    angle: 0,
  },
  {
    id: 'nourishment',
    label: 'Nourishment',
    subdomain: 'Nourishment',
    domain: 'Physical',
    description: 'Daily fuel and nutrient balance',
    color: '#7A5F95',
    lightColor: '#A88DB8',
    angle: 45,
  },
  {
    id: 'perspective',
    label: 'Perspective',
    subdomain: 'Perspective',
    domain: 'Mental',
    description: 'Seeing the big picture, flexible thinking',
    color: '#B39968',
    lightColor: '#D4BFA0',
    angle: 90,
  },
  {
    id: 'clarity',
    label: 'Clarity',
    subdomain: 'Clarity',
    domain: 'Mental',
    description: 'Focused understanding, thoughtful decision-making',
    color: '#C4A574',
    lightColor: '#DCC4A4',
    angle: 135,
  },
  {
    id: 'presence',
    label: 'Presence',
    subdomain: 'Presence',
    domain: 'Emotional',
    description: 'Full attunement to others and genuine engagement',
    color: '#5B9467',
    lightColor: '#8DB5A0',
    angle: 180,
  },
  {
    id: 'regulation',
    label: 'Regulation',
    subdomain: 'Regulation',
    domain: 'Emotional',
    description: 'Emotional self-mastery and consistency',
    color: '#4A8356',
    lightColor: '#7BA587',
    angle: 225,
  },
  {
    id: 'environment',
    label: 'Environment',
    subdomain: 'Environment',
    domain: 'Lifestyle',
    description: 'Supportive spaces and surroundings',
    color: '#4A7BA7',
    lightColor: '#7BA4CA',
    angle: 270,
  },
  {
    id: 'rhythm',
    label: 'Rhythm',
    subdomain: 'Rhythm',
    domain: 'Lifestyle',
    description: 'Daily routines that sustain energy and focus',
    color: '#5A8CB8',
    lightColor: '#8CB0D4',
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
        className="w-full max-w-md mx-auto drop-shadow-xl"
        style={{ maxWidth: size === 'large' ? '500px' : size === 'medium' ? '400px' : '300px' }}
      >
        <defs>
          {/* Gradients for each petal */}
          {petals.map((petal) => (
            <defs key={`grad-${petal.id}`}>
              <radialGradient id={`grad-${petal.id}`} cx="40%" cy="40%">
                <stop offset="0%" stopColor={petal.lightColor} stopOpacity="1" />
                <stop offset="100%" stopColor={petal.color} stopOpacity="0.9" />
              </radialGradient>
              <filter id={`shadow-${petal.id}`}>
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>
          ))}
        </defs>

        {/* Petals */}
        {petals.map((petal) => {
          const angleRad = (petal.angle * Math.PI) / 180;
          const cx = 250 + petalRadius * 1.1 * Math.cos(angleRad);
          const cy = 250 + petalRadius * 1.1 * Math.sin(angleRad);

          const isHovered = hoveredPetal === petal.id;
          const isSelected = selectedPetal?.id === petal.id;

          // Create petal path - oblong circle/ellipse shape
          const petalWidth = petalRadius * 0.55;
          const petalHeight = petalRadius * 0.95;

          const petalPath = `
            M ${cx} ${cy - petalHeight}
            Q ${cx + petalWidth} ${cy - petalHeight * 0.5} ${cx + petalWidth} ${cy + petalHeight * 0.15}
            Q ${cx + petalWidth} ${cy + petalHeight * 0.6} ${cx} ${cy + petalHeight * 0.65}
            Q ${cx - petalWidth} ${cy + petalHeight * 0.6} ${cx - petalWidth} ${cy + petalHeight * 0.15}
            Q ${cx - petalWidth} ${cy - petalHeight * 0.5} ${cx} ${cy - petalHeight}
          `;

          // Position label at petal tip with proper rotation
          const labelDistance = petalRadius * 1.85;
          const labelX = 250 + labelDistance * Math.cos(angleRad);
          const labelY = 250 + labelDistance * Math.sin(angleRad);

          // Calculate rotation for text - keep it readable by flipping at bottom half
          let textRotation = petal.angle;
          if (petal.angle > 90 && petal.angle < 270) {
            textRotation = petal.angle + 180;
          }

          return (
            <g key={petal.id}>
              {/* Petal with gradient */}
              <path
                d={petalPath}
                fill={`url(#grad-${petal.id})`}
                filter={`url(#shadow-${petal.id})`}
                stroke={isSelected ? '#ffffff' : 'none'}
                strokeWidth={isSelected ? '2' : '0'}
                className={interactive ? 'cursor-pointer transition-all duration-200' : ''}
                onMouseEnter={() => interactive && setHoveredPetal(petal.id)}
                onMouseLeave={() => interactive && setHoveredPetal(null)}
                onClick={() => interactive && handlePetalClick(petal)}
                style={{
                  filter: isHovered
                    ? `drop-shadow(0 4px 12px rgba(0,0,0,0.4))`
                    : `url(#shadow-${petal.id})`,
                  opacity: isHovered || isSelected ? 1 : 0.9,
                  transform: isHovered ? `scale(1.08)` : 'scale(1)',
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: 'all 0.2s ease',
                }}
              />

              {/* Petal Label - Positioned at Tip with Rotation */}
              {size !== 'small' && (
                <g transform={`translate(${labelX},${labelY}) rotate(${textRotation})`}>
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none font-semibold fill-gray-700"
                    fontSize={size === 'large' ? '13' : size === 'medium' ? '11' : '9'}
                    fontWeight="600"
                    style={{
                      letterSpacing: '0.3px',
                    }}
                  >
                    {petal.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center Circle with gradient */}
        <defs>
          <radialGradient id="centerGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#f8f8f8" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8e8e8" stopOpacity="1" />
          </radialGradient>
          <filter id="centerShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Main center circle */}
        <circle
          cx="250"
          cy="250"
          r={centerRadius}
          fill="url(#centerGradient)"
          filter="url(#centerShadow)"
          stroke="#ddd"
          strokeWidth="1"
        />

        {/* Inner ring accent */}
        <circle
          cx="250"
          cy="250"
          r={centerRadius * 0.85}
          fill="none"
          stroke="#ccc"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Center Text - PUR-POSE (Single Line) */}
        <text
          x="250"
          y={size === 'large' ? '250' : size === 'medium' ? '250' : '250'}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-bold"
          fill="#333"
          fontSize={size === 'large' ? '36' : size === 'medium' ? '26' : '20'}
          letterSpacing="1"
          style={{ fontWeight: '800' }}
        >
          PURPOSE
        </text>

        {/* Spiritual label */}
        <text
          x="250"
          y={size === 'large' ? '275' : size === 'medium' ? '270' : '268'}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-500"
          fontSize={size === 'large' ? '9' : '8'}
          fontStyle="italic"
          opacity="0.6"
          letterSpacing="0.5"
        >
          Spiritual
        </text>
      </svg>

      {/* Selected Petal Info */}
      {interactive && selectedPetal && (
        <div
          className="rounded-xl p-6 max-w-sm w-full shadow-lg border border-opacity-20 animate-fadeIn"
          style={{
            background: `linear-gradient(135deg, ${selectedPetal.lightColor}20 0%, ${selectedPetal.color}15 100%)`,
            borderColor: selectedPetal.color,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5 shadow-md"
              style={{
                backgroundColor: selectedPetal.color,
                boxShadow: `0 4px 12px ${selectedPetal.color}40`,
              }}
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{selectedPetal.label}</h3>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-semibold rounded-full px-3 py-1 bg-white bg-opacity-60" style={{ color: selectedPetal.color }}>
                  {selectedPetal.domain}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{selectedPetal.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {size === 'large' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl text-sm mt-4">
          {[
            { color: '#8B5B9E', name: 'Physical', sub: 'Body' },
            { color: '#B39968', name: 'Mental', sub: 'Mind' },
            { color: '#5B9467', name: 'Emotional', sub: 'Heart' },
            { color: '#4A7BA7', name: 'Lifestyle', sub: 'World' },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-gray-900">{item.name}</span>
              </div>
              <p className="text-xs text-gray-600 ml-7 italic">{item.sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
