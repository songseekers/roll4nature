export interface RWBChapter {
  name: string;
  contactEmail: string;
  website?: string;
}

export interface City {
  id: string;                                    // 'austin-tx'
  name: string;                                  // 'Austin'
  state: string;                                 // 'Texas'
  population: number;
  coordinates: [number, number];                 // [lng, lat]
  arrivalDate: string;                          // ISO date: '2026-03-15'
  dayNumber: number;                            // Day of journey (1-110)
  distanceFromPrevious: number;                 // miles
  distanceFromStart: number;                    // total miles from Key West
  tier: 'major' | 'all';                        // For 3-layer map navigation
  rwbChapter?: RWBChapter;
  description?: string;                         // For city landing pages
  slug: string;                                 // 'austin' for URL routing
  imageUrl?: string;                            // Optional city image
  route: 'c2c2c' | 'mse' | 'both';              // Coast to Coast to Canyon / Mountain States Exploration
}

export interface RouteSegment {
  from: string;                                 // city slug
  to: string;                                   // city slug
  distance: number;                             // miles
  coordinates: [number, number][];              // LineString coordinates
}
