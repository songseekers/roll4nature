import { City } from '@/types/city';
import citiesData from '@/data/cities.json';

export const cities: City[] = citiesData as City[];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getAllCities(): City[] {
  return cities;
}

export function getMajorCities(): City[] {
  return cities.filter((city) => city.tier === 'major');
}

export function getAllCityNames(): string[] {
  return cities.map((city) => city.slug);
}

export function getCitiesByState(state: string): City[] {
  return cities.filter((city) => city.state === state);
}

export function getRouteStartCity(): City | undefined {
  return cities.find((city) => city.dayNumber === 1);
}

export function getRouteEndCity(): City | undefined {
  const maxDay = Math.max(...cities.map((city) => city.dayNumber));
  return cities.find((city) => city.dayNumber === maxDay);
}

export function getCitiesBetweenDays(startDay: number, endDay: number): City[] {
  return cities.filter((city) => city.dayNumber >= startDay && city.dayNumber <= endDay);
}

export function searchCities(query: string): City[] {
  const lowercaseQuery = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowercaseQuery) ||
      city.state.toLowerCase().includes(lowercaseQuery) ||
      city.slug.includes(lowercaseQuery)
  );
}

export function getCitiesNearZipCode(coordinates: [number, number], radiusMiles: number = 50): City[] {
  // Simple distance calculation (not perfect for long distances, but good for local)
  const [lng, lat] = coordinates;
  return cities.filter((city) => {
    const [cityLng, cityLat] = city.coordinates;
    // Rough approximation: 1 degree ~ 69 miles
    const distance = Math.sqrt(Math.pow((cityLng - lng) * 69, 2) + Math.pow((cityLat - lat) * 69, 2));
    return distance <= radiusMiles;
  });
}

export function getTotalDistance(): number {
  const endCity = getRouteEndCity();
  return endCity?.distanceFromStart ?? 0;
}

export function getTotalDays(): number {
  const maxDay = Math.max(...cities.map((city) => city.dayNumber));
  return maxDay;
}
