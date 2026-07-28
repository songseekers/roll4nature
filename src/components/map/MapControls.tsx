import Button from '@/components/ui/Button';
import { MapLayer } from './RouteMap';

interface MapControlsProps {
  layer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
}

export default function MapControls({ layer, onLayerChange }: MapControlsProps) {
  const controls: { label: string; value: MapLayer; description: string }[] = [
    {
      label: 'Overview',
      value: 'overview',
      description: 'Key West → Flagstaff → Rigby',
    },
    {
      label: 'Planned Stops',
      value: 'major',
      description: '78 communities on our route',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex flex-col sm:flex-row gap-3">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 self-center hidden sm:block">
        Route Layers:
      </p>

      <div className="flex gap-2 flex-wrap">
        {controls.map((control) => (
          <button
            key={control.value}
            onClick={() => onLayerChange(control.value)}
            style={layer === control.value ? { backgroundColor: '#2a1a08', color: '#F2DFC0' } : undefined}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap ${
              layer === control.value
                ? 'shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={control.description}
          >
            {control.label}
          </button>
        ))}

        <Button variant="dark" size="sm" href="/route-list" className="shadow-md whitespace-nowrap">
          Route List
        </Button>
      </div>
    </div>
  );
}
