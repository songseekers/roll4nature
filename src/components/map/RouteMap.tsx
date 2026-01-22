'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { City } from '@/types/city';
import { getMajorCities, getAllCities } from '@/lib/data-helpers';
import MapControls from './MapControls';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export type MapLayer = 'overview' | 'major' | 'all';

export default function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [layer, setLayer] = useState<MapLayer>('major');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

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

    map.current.on('load', () => {
      // Add source for route line
      map.current?.addSource('route', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: getAllCities()
                  .sort((a, b) => a.dayNumber - b.dayNumber)
                  .map((city) => city.coordinates),
              },
              properties: {},
            },
          ],
        },
      });

      // Add route line layer
      map.current?.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-opacity': 0.7,
        },
      });

      setIsLoading(false);
    });

    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
      }
    };
  }, []);

  // Update markers when layer changes
  useEffect(() => {
    if (!map.current || isLoading) return;

    // Remove existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach((marker) => marker.remove());

    // Get cities to display based on layer
    let citiesToShow: City[] = [];
    if (layer === 'overview') {
      citiesToShow = getAllCities().filter((city) =>
        ['key-west', 'los-angeles', 'grand-canyon'].includes(city.slug)
      );
    } else if (layer === 'major') {
      citiesToShow = getMajorCities();
    } else {
      citiesToShow = getAllCities();
    }

    // Add markers
    citiesToShow.forEach((city) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundImage = 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%233b82f6%27%3E%3Ccircle cx=%2712%27 cy=%2712%27 r=%2710%27/%3E%3C/svg%3E")';
      el.style.backgroundSize = 'cover';
      el.style.cursor = 'pointer';
      el.style.transition = 'transform 0.2s';

      // Major cities get larger markers
      if (city.tier === 'major') {
        el.style.width = '40px';
        el.style.height = '40px';
        el.style.backgroundImage = 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%231e40af%27%3E%3Ccircle cx=%2712%27 cy=%2712%27 r=%2710%27/%3E%3Ccircle cx=%2712%27 cy=%2712%27 r=%276%27 fill=%27white%27/%3E%3C/svg%3E")';
      }

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      el.addEventListener('click', () => {
        setSelectedCity(city);

        // Remove old popup if exists
        if (popupRef.current) {
          popupRef.current.remove();
        }

        // Create popup content
        const popupContent = document.createElement('div');
        popupContent.className = 'p-4 max-w-xs';
        popupContent.innerHTML = `
          <div>
            <h3 class="font-bold text-lg text-gray-900 mb-1">${city.name}, ${city.state}</h3>
            <div class="text-sm text-gray-600 space-y-1 mb-3">
              <div><span class="font-semibold">Day ${city.dayNumber}:</span> ${new Date(city.arrivalDate).toLocaleDateString()}</div>
              <div><span class="font-semibold">Population:</span> ${city.population.toLocaleString()}</div>
              <div><span class="font-semibold">Distance from start:</span> ${city.distanceFromStart} miles</div>
              ${city.rwbChapter ? `<div class="mt-2 text-xs bg-blue-50 p-2 rounded"><strong>Team RWB Chapter:</strong> ${city.rwbChapter.name}</div>` : ''}
            </div>
            <a href="/roll4veterans/${city.slug}" class="inline-block bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition">
              View City Details
            </a>
          </div>
        `;

        popupRef.current = new mapboxgl.Popup({ closeButton: true, maxWidth: 'none' })
          .setLngLat(city.coordinates)
          .setDOMContent(popupContent)
          .addTo(map.current!);
      });

      new mapboxgl.Marker(el).setLngLat(city.coordinates).addTo(map.current!);
    });
  }, [layer, isLoading]);

  return (
    <div id="map" className="w-full">
      {/* Map Controls */}
      <MapControls layer={layer} onLayerChange={setLayer} />

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapContainer}
          className="w-full h-96 sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
            <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-gray-700 font-semibold">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">Map Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">Standard Cities</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 border-4 border-white"></div>
            <span className="text-gray-700">Major Stops</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="h-1 w-8 bg-blue-600"></div>
            <span className="text-gray-700">Route Line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
