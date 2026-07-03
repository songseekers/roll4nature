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
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

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

      const allCities = getAllCities();
      if (allCities.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        allCities.forEach((city) => {
          bounds.extend(city.coordinates);
        });
        map.current?.fitBounds(bounds, {
          padding: { top: 10, bottom: 10, left: 10, right: 10 },
          duration: 0,
        });
      }

      setIsLoading(false);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      if (popupRef.current) popupRef.current.remove();
      if (hoverPopupRef.current) hoverPopupRef.current.remove();
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || isLoading) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

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

    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

    citiesToShow.forEach((city) => {
      const isMajor = city.tier === 'major';
      const isPast = city.arrivalDate <= today;

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

      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
        if (hoverPopupRef.current) hoverPopupRef.current.remove();

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
  }, [layer, isLoading]);

  // ─── Route completed watermark overlay ───────────────────────
  const routeCompletedOverlay = (
    <div
      aria-label="Route status: completed"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <div
        style={{
          transform: 'rotate(-25deg)',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 'clamp(18px, 4vw, 32px)',
            fontWeight: '900',
            letterSpacing: '4px',
            color: 'rgba(139, 69, 19, 0.22)',
            border: '4px solid rgba(139, 69, 19, 0.18)',
            padding: '6px 20px',
            borderRadius: '4px',
            lineHeight: '1.4',
            whiteSpace: 'nowrap',
          }}
        >
          ROUTE COMPLETED<br />
          1 JULY 2026
        </div>
        <div
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 'clamp(11px, 2vw, 16px)',
            fontWeight: '700',
            letterSpacing: '3px',
            color: 'rgba(139, 69, 19, 0.18)',
            marginTop: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          STAY TUNED FOR NEW ROUTE SOON
        </div>
      </div>
    </div>
  );

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
        {routeCompletedOverlay}

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
