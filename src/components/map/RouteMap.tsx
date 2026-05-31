'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Maximize2, Minimize2 } from 'lucide-react';
import { City } from '@/types/city';
import { getMajorCities, getAllCities } from '@/lib/data-helpers';
import MapControls from './MapControls';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export type MapLayer = 'overview' | 'major' | 'all';

// TODO: Consider driving completed segment from live GPS data in a future update
function getRouteSegments(): { completed: number[][], remaining: number[][] } {
  const sortedCities = getAllCities().sort((a, b) => a.dayNumber - b.dayNumber);
  const allCoords = sortedCities.map((c) => c.coordinates as number[]);
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }); // YYYY-MM-DD in local time

  if (today >= '2026-06-23') {
    return { completed: allCoords, remaining: [] };
  }

  let cutoffIndex = -1;
  for (let i = 0; i < sortedCities.length; i++) {
    if (sortedCities[i].arrivalDate <= today) {
      cutoffIndex = i;
    }
  }

  if (cutoffIndex === -1) {
    return { completed: [], remaining: allCoords };
  }

  return {
    completed: allCoords.slice(0, cutoffIndex + 1),
    // cutoff city included in both so the two lines connect seamlessly
    remaining: allCoords.slice(cutoffIndex),
  };
}

export default function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layer, setLayer] = useState<MapLayer>('major');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const hoverPopupRef = useRef<mapboxgl.Popup | null>(null);

  // Escape key exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Resize map after DOM repaints on fullscreen toggle
  useEffect(() => {
    const timer = setTimeout(() => {
      map.current?.resize();
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-98.5, 39.5],
      zoom: 4,
      pitch: 0,
      bearing: 0,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Split route into completed (grey) and remaining (orange) segments
      const { completed, remaining } = getRouteSegments();

      map.current?.addSource('route-remaining', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: remaining },
          properties: {},
        },
      });

      map.current?.addSource('route-completed', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: completed },
          properties: {},
        },
      });

      // Completed segment (grey) — added first so it renders beneath
      map.current?.addLayer({
        id: 'route-line-completed',
        type: 'line',
        source: 'route-completed',
        paint: {
          'line-color': '#6B7280',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });

      // Remaining segment (orange) — added second so it renders on top at join point
      map.current?.addLayer({
        id: 'route-line-remaining',
        type: 'line',
        source: 'route-remaining',
        paint: {
          'line-color': '#C1592B',
          'line-width': 4,
          'line-opacity': 0.8,
        },
      });

      // Fit map to show all cities
      const allCities = getAllCities();
      if (allCities.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        allCities.forEach((city) => {
          bounds.extend(city.coordinates);
        });

        // Fit to bounds with very minimal padding to zoom in closer
        map.current?.fitBounds(bounds, {
          padding: { top: 10, bottom: 10, left: 10, right: 10 },
          duration: 0, // No animation on initial load
        });
      }

      setIsLoading(false);
    });

    return () => {
      // Clean up
      markersRef.current.forEach((marker) => marker.remove());
      if (popupRef.current) {
        popupRef.current.remove();
      }
      if (hoverPopupRef.current) {
        hoverPopupRef.current.remove();
      }
      map.current?.remove();
    };
  }, []);

  // Update markers when layer changes
  useEffect(() => {
    if (!map.current || isLoading) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Get cities to display based on layer
    let citiesToShow: City[] = [];
    if (layer === 'overview') {
      citiesToShow = getAllCities().filter((city) =>
        ['key-west', 'flagstaff'].includes(city.slug)
      );
    } else if (layer === 'major') {
      citiesToShow = getMajorCities();
    } else {
      citiesToShow = getAllCities();
    }

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }); // YYYY-MM-DD in local time

    // Add markers
    citiesToShow.forEach((city) => {
      const isMajor = city.tier === 'major';
      const isPast = city.arrivalDate <= today;

      // Create marker element
      const el = document.createElement('div');
      el.className = 'city-marker';
      const markerSize = isMajor ? 16 : 12;
      const borderWidth = isMajor ? 3 : 2;

      el.style.width = markerSize + 'px';
      el.style.height = markerSize + 'px';
      el.style.backgroundColor = isPast ? '#6B7280' : (isMajor ? '#8B4513' : '#C1592B');
      el.style.border = `${borderWidth}px solid white`;
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.display = 'block';

      // Hover effects - show hover popup
      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';

        // Remove any existing hover popup
        if (hoverPopupRef.current) {
          hoverPopupRef.current.remove();
        }

        // Create hover popup content
        const hoverContent = document.createElement('div');
        hoverContent.style.cssText = `
          padding: 12px;
          min-width: 220px;
          background: linear-gradient(135deg, #E8C9A1 0%, #D4A574 100%);
          border: 2px solid #C1592B;
          border-radius: 8px;
          color: #1F2937;
        `;

        hoverContent.innerHTML = `
          <div style="font-weight: 700; font-size: 16px; color: #8B4513; margin-bottom: 8px;">
            ${city.name}, ${city.state}
          </div>
          <div style="font-size: 14px; line-height: 1.5;">
            <div style="margin-bottom: 4px;">
              <strong style="color: #C1592B;">Arriving:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style="margin-bottom: 4px;">
              <strong style="color: #C1592B;">Day:</strong> ${city.dayNumber}
            </div>
            <div>
              <strong style="color: #C1592B;">Distance from start:</strong> ${city.distanceFromStart} miles
            </div>
          </div>
        `;

        // Create and show hover popup
        hoverPopupRef.current = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          maxWidth: '280px',
          offset: 15,
          className: 'hover-popup',
        })
          .setLngLat(city.coordinates)
          .setDOMContent(hoverContent)
          .addTo(map.current!);
      });

      el.addEventListener('mouseleave', () => {
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

        // Remove hover popup
        if (hoverPopupRef.current) {
          hoverPopupRef.current.remove();
          hoverPopupRef.current = null;
        }
      });

      // Click to show popup
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedCity(city);

        // Remove old popup if exists
        if (popupRef.current) {
          popupRef.current.remove();
        }

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'city-popup';
        popupContent.style.padding = '12px';
        popupContent.style.minWidth = '200px';
        popupContent.style.maxWidth = '300px';

        popupContent.innerHTML = `
          <div>
            <h3 style="font-weight: bold; font-size: 18px; color: #8B4513; margin-bottom: 8px;">
              ${city.name}, ${city.state}
            </h3>
            <div style="font-size: 15px; color: #1F2937;">
              <div style="margin-bottom: 4px;"><strong style="color: #C1592B;">Day ${city.dayNumber}:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div style="margin-bottom: 4px;"><strong style="color: #C1592B;">Distance from start:</strong> ${city.distanceFromStart} miles</div>
              ${city.rwbChapter ? `
                <div style="margin-top: 8px; padding: 8px; background-color: #E8C9A1; border-radius: 4px; font-size: 14px; border: 1px solid #C1592B;">
                  <strong style="color: #8B4513;">Team RWB:</strong><br/>
                  <span style="color: #1F2937;">${city.rwbChapter.name}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;

        // Create and show popup with automatic positioning
        // Removing fixed anchor allows Mapbox to auto-position based on viewport
        popupRef.current = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          maxWidth: '300px',
          offset: 25, // Offset from the marker
          // No anchor specified - allows automatic smart positioning to keep popup in viewport
        })
          .setLngLat(city.coordinates)
          .setDOMContent(popupContent)
          .addTo(map.current!);
      });

      // Create and add marker with center anchor
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat(city.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [layer, isLoading]);

  const toggleButton = (
    <button
      onClick={() => setIsFullscreen((prev) => !prev)}
      className="absolute top-2 left-6 z-10 flex items-center gap-1 bg-white dark:bg-gray-800 text-r4v-primary dark:text-r4v-primary-hover border border-r4v-primary rounded-full px-3 py-1 text-sm font-semibold shadow hover:shadow-md transition cursor-pointer"
    >
      {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
    </button>
  );

  const legend = (
    <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 transition-colors max-w-3xl mx-auto">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Map Legend</h3>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#8B4513] border-[3px] border-white"></div>
          <span className="text-gray-700 dark:text-gray-300">Planned Stops</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1 w-8 bg-[#C1592B] rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Miles Remaining</span>
        </div>
        {new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }) >= '2026-02-27' && (
          <div className="flex items-center space-x-2">
            <div className="h-1 w-8 bg-[#6B7280] rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Miles Completed</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      id={isFullscreen ? undefined : 'map'}
      className={isFullscreen
        ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col overflow-hidden'
        : 'w-full'
      }
    >
      <MapControls layer={layer} onLayerChange={setLayer} />

      <div className={isFullscreen
        ? 'relative flex-1 min-h-0'
        : 'relative max-w-3xl mx-auto px-4'
      }>
        <div
          ref={mapContainer}
          className={isFullscreen
            ? 'w-full h-full'
            : 'w-full h-64 sm:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg'
          }
        />
        {toggleButton}

        {isLoading && (
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center${isFullscreen ? '' : ' rounded-lg'}`}>
            <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-gray-700 font-semibold">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {!isFullscreen && legend}
    </div>
  );
}
