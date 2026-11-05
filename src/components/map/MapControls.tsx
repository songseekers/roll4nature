import type { ReactNode } from 'react';
import { Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getAllCities } from '@/lib/data-helpers';
import type { MapLayer, MapMode } from './RouteMap';

interface MapControlsProps {
  layer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
  mode: MapMode;
  onModeChange: (mode: MapMode) => void;
  routeColors: { c2c2c: string; cce: string };
}

const BASE = 'px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap cursor-pointer';
// the selected button is a solid color; the others stay plain gray
const IDLE =
  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
const ACTIVE = 'shadow-md';

// A bordered group of buttons with a centered label on its top edge
function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg px-3 pt-5 pb-3">
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {label}
      </span>
      <div className="flex flex-wrap gap-2 justify-center">{children}</div>
    </div>
  );
}

export default function MapControls({
  layer,
  onLayerChange,
  mode,
  onModeChange,
  routeColors,
}: MapControlsProps) {
  const views: { label: string; value: MapMode; color: string; description: string }[] = [
    {
      label: 'Journey Replay',
      value: 'replay',
      color: '#2a1a08',
      description: 'Watch the whole route draw itself',
    },
    {
      label: 'Coast to Coast to Canyon',
      value: 'c2c2c',
      color: routeColors.c2c2c,
      description: 'Key West to Flagstaff',
    },
    {
      label: 'Canyon Country Exploration',
      value: 'cce',
      color: routeColors.cce,
      description: 'Flagstaff to South Jordan',
    },
  ];

  const layers: { label: string; value: MapLayer; description: string }[] = [
    {
      label: 'Milestones',
      value: 'milestones',
      description: 'The start, the Pacific, the Grand Canyon, and the finish',
    },
    {
      label: 'All Stops',
      value: 'major',
      description: `${getAllCities().length} communities on our route`,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row md:justify-between gap-5">
      <Group label="Map Views">
        {views.map((view) => {
          const active = mode === view.value;
          return (
            <button
              key={view.value}
              onClick={() => onModeChange(view.value)}
              aria-pressed={active}
              title={view.description}
              style={active ? { backgroundColor: view.color, color: '#F2DFC0' } : undefined}
              className={`${BASE} ${active ? ACTIVE : IDLE}`}
            >
              {view.value === 'replay' ? (
                <span className="inline-flex items-center gap-1">
                  <Play size={14} />
                  {view.label}
                </span>
              ) : (
                view.label
              )}
            </button>
          );
        })}
      </Group>

      <Group label="Route Layers">
        {layers.map((control) => (
          <button
            key={control.value}
            onClick={() => onLayerChange(control.value)}
            aria-pressed={layer === control.value}
            title={control.description}
            style={layer === control.value ? { backgroundColor: '#2a1a08', color: '#F2DFC0' } : undefined}
            className={`${BASE} ${layer === control.value ? ACTIVE : IDLE}`}
          >
            {control.label}
          </button>
        ))}

        <Button variant="dark" size="sm" href="/route-list" className="shadow-md whitespace-nowrap">
          Route List
        </Button>
      </Group>
    </div>
  );
}
