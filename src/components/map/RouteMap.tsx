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
export type RouteKey = 'c2c2c' | 'mse';

const ROUTE_COLORS: Record<RouteKey, string> = {
  c2c2c: '#5C3317',
  mse: '#4a7c59',
};

const ROUTE_LABELS: Record<City['route'], string> = {
  c2c2c: 'Coast to Coast to Canyon',
  mse: 'Mountain States Exploration',
  both: 'Coast to Coast to Canyon → Mountain States Exploration',
};

function citiesForRoute(route: RouteKey): City[] {
  return getAllCities()
    .filter((c) => c.route === route || c.route === 'both')
    .sort((a, b) => a.dayNumber - b.dayNumber);
}

export default function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layer, setLayer] = useState<MapLayer>('major');
  const [selectedRoute, setSelectedRoute] = useState<RouteKey>('mse');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const hoverPopupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.current?.resize();
    }, 100);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-98.5, 39.5],
      zoom: 4,
      pitch: 0,
      bearing: 0,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      const c2c2cCoords = citiesForRoute('c2c2c').map((c) => c.coordinates as number[]);
      const mseCoords = citiesForRoute('mse').map((c) => c.coordinates as number[]);

      map.current?.addSource('route-c2c2c', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: c2c2cCoords },
          properties: {},
        },
      });

      map.current?.addSource('route-mse', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: mseCoords },
          properties: {},
        },
      });

      map.current?.addLayer({
        id: 'route-line-c2c2c',
        type: 'line',
        source: 'route-c2c2c',
        paint: {
          'line-color': ROUTE_COLORS.c2c2c,
          'line-width': 4,
          'line-opacity': 0.12,
        },
      });

      map.current?.addLayer({
        id: 'route-line-mse',
        type: 'line',
        source: 'route-mse',
        paint: {
          'line-color': ROUTE_COLORS.mse,
          'line-width': 4,
          'line-opacity': 1,
        },
      });

      setIsLoading(false);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      if (popupRef.current) popupRef.current.remove();
      if (hoverPopupRef.current) hoverPopupRef.current.remove();
      map.current?.remove();
    };
  }, []);

  // Selected route drives line opacity and which route the map is framed on.
  useEffect(() => {
    if (!map.current || isLoading) return;

    (['c2c2c', 'mse'] as RouteKey[]).forEach((route) => {
      const layerId = `route-line-${route}`;
      if (map.current?.getLayer(layerId)) {
        map.current.setPaintProperty(layerId, 'line-opacity', route === selectedRoute ? 1 : 0.12);
      }
    });

    const targetCities = citiesForRoute(selectedRoute);
    if (targetCities.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      targetCities.forEach((city) => bounds.extend(city.coordinates));
      map.current.fitBounds(bounds, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        duration: 800,
      });
    }
  }, [selectedRoute, isLoading]);

  useEffect(() => {
    if (!map.current || isLoading) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    let citiesToShow: City[] = [];
    if (layer === 'overview') {
      citiesToShow = getAllCities().filter((city) =>
        ['key-west', 'flagstaff', 'rigby'].includes(city.slug)
      );
    } else if (layer === 'major') {
      citiesToShow = getMajorCities();
    } else {
      citiesToShow = getAllCities();
    }

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

    citiesToShow.forEach((city) => {
      const isMajor = city.tier === 'major';
      const isPast = city.arrivalDate <= today;

      const markerColor = isPast
        ? '#6B7280'
        : city.route === 'both'
        ? ROUTE_COLORS[selectedRoute]
        : ROUTE_COLORS[city.route];

      const matchesSelectedRoute = city.route === 'both' || city.route === selectedRoute;
      const markerOpacity = matchesSelectedRoute ? 1 : 0.25;

      const el = document.createElement('div');
      el.className = 'city-marker';
      const baseSize = isMajor ? 16 : 12;
      const markerSize = matchesSelectedRoute ? baseSize : baseSize * 0.6;
      const borderWidth = isMajor ? 3 : 2;

      el.style.width = markerSize + 'px';
      el.style.height = markerSize + 'px';
      el.style.backgroundColor = markerColor;
      el.style.opacity = String(markerOpacity);
      el.style.border = `${borderWidth}px solid white`;
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      el.style.display = 'block';

      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
        if (hoverPopupRef.current) hoverPopupRef.current.remove();

        const hoverContent = document.createElement('div');
        hoverContent.style.cssText = `
          padding: 12px;
          min-width: 220px;
          background: linear-gradient(135deg, #E8C9A1 0%, #D4A574 100%);
          border: 2px solid #5C3317;
          border-radius: 8px;
          color: #1F2937;
        `;
        hoverContent.innerHTML = `
          <div style="font-weight: 700; font-size: 16px; color: #8B4513; margin-bottom: 8px;">
            ${city.name}, ${city.state}
          </div>
          <div style="font-size: 14px; line-height: 1.5;">
            <div style="margin-bottom: 4px;">
              <strong style="color: #5C3317;">Arriving:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style="margin-bottom: 4px;">
              <strong style="color: #5C3317;">Day:</strong> ${city.dayNumber}
            </div>
            <div>
              <strong style="color: #5C3317;">Route:</strong> ${ROUTE_LABELS[city.route]}
            </div>
          </div>
        `;

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
        if (hoverPopupRef.current) {
          hoverPopupRef.current.remove();
          hoverPopupRef.current = null;
        }
      });

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedCity(city);
        if (popupRef.current) popupRef.current.remove();

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
              <div style="margin-bottom: 4px;"><strong style="color: #5C3317;">Day ${city.dayNumber}:</strong> ${new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div style="margin-bottom: 4px;"><strong style="color: #5C3317;">Route:</strong> ${ROUTE_LABELS[city.route]}</div>
              ${city.rwbChapter ? `
                <div style="margin-top: 8px; padding: 8px; background-color: #E8C9A1; border-radius: 4px; font-size: 14px; border: 1px solid #5C3317;">
                  <strong style="color: #8B4513;">Team RWB:</strong><br/>
                  <span style="color: #1F2937;">${city.rwbChapter.name}</span>
                </div>
              ` : ''}
            </div>
          </div>
        `;

        popupRef.current = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
          maxWidth: '300px',
          offset: 25,
        })
          .setLngLat(city.coordinates)
          .setDOMContent(popupContent)
          .addTo(map.current!);
      });

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat(city.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [layer, isLoading, selectedRoute]);

  const toggleButton = (
    <button
      onClick={() => setIsFullscreen((prev) => !prev)}
      className="absolute top-2 left-6 z-10 flex items-center gap-1 bg-white dark:bg-gray-800 text-r4n-primary dark:text-r4n-primary-hover border border-r4n-primary rounded-full px-3 py-1 text-sm font-semibold shadow hover:shadow-md transition cursor-pointer"
    >
      {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
    </button>
  );

  const routeToggle = (
    <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-4">
      <button
        onClick={() => setSelectedRoute('c2c2c')}
        aria-pressed={selectedRoute === 'c2c2c'}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap border-2 cursor-pointer ${
          selectedRoute === 'c2c2c'
            ? 'bg-r4n-primary border-r4n-tan text-r4n-tan shadow-md'
            : 'bg-transparent border-r4n-tan text-r4n-tan hover:bg-r4n-primary/20'
        }`}
      >
        Coast to Coast to Canyon
      </button>
      <button
        onClick={() => setSelectedRoute('mse')}
        aria-pressed={selectedRoute === 'mse'}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap border-2 cursor-pointer ${
          selectedRoute === 'mse'
            ? 'bg-r4n-sage border-r4n-sage text-r4n-warm-cream shadow-md'
            : 'bg-transparent border-r4n-sage/30 text-r4n-sage/50 hover:border-r4n-sage hover:text-r4n-sage'
        }`}
      >
        Mountain States Exploration
      </button>
    </div>
  );

  const legend = (
    <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 transition-colors max-w-3xl mx-auto">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3">Map Legend</h3>
      <div className="flex flex-wrap items-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-[#6B7280] border-[3px] border-white"></div>
          <span className="text-gray-700 dark:text-gray-300">Visited</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1 w-8 bg-[#5C3317] rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Coast to Coast to Canyon</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1 w-8 bg-[#4a7c59] rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Mountain States Exploration</span>
        </div>
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
      {routeToggle}

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
