# Songseekers Website - Project Handover Guide

## Project Overview

**Songseekers** is a Next.js website for a cross-country bike journey called **Roll for Veterans 2026** supporting Team RWB (Red, White & Blue), a nonprofit empowering veterans through physical and social engagement.

**Website**: https://songseekers.org
**Repository**: https://github.com/songseekers/songseekers-website
**Journey Dates**: Feb 27 - Jun 13, 2026
**Route**: Key West, FL → Grand Canyon, AZ (4,434 miles across 80+ cities in 107 days)

---

## Project Status

### ✅ Completed (As of Jan 24, 2026)

1. **Content Architecture Separation** (Latest work)
   - Created three distinct pages separating Purpose Guidebook from Roll for Veterans journey
   - Main hub landing page with two clear pathway choices
   - Dedicated guidebook page with 8-petal framework and dimensions grid
   - Dedicated journey page with route map, cities, and Team RWB mission

2. **Interactive Components**
   - 8-petal Purpose Flower with SVG graphics, hover effects, and click-to-select functionality
   - Interactive Mapbox route map with 3-layer navigation (Overview/Major/All cities)
   - Countdown timer to journey start (Feb 27, 2026)
   - City detail pages with dynamic routing (82 total)

3. **Design & Branding**
   - Responsive Tailwind CSS design
   - Purpose-driven color schemes and gradients
   - Mobile-optimized navigation and layout
   - Consistent branding across all pages

### ⏳ Pending Tasks

1. **Mapbox Token Setup**
   - Get Mapbox token from mapbox.com
   - Add to Vercel environment variables as `NEXT_PUBLIC_MAPBOX_TOKEN`
   - Required for interactive map functionality

2. **Domain & Deployment**
   - Point songseekers.org DNS to Vercel deployment
   - Deploy to Vercel with environment variables configured
   - Set up Zeffy donation link integration

3. **Content Population**
   - Download and link Purpose Guidebook PDF
   - Complete city page descriptions (currently using placeholders)
   - Add hero images for cities
   - Gather Team RWB chapter details for all 80+ cities

---

## Tech Stack

- **Framework**: Next.js 16.1.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **Maps**: Mapbox GL JS 3.x
- **Forms**: React Hook Form + Zod validation
- **UI**: Lucide React icons, custom SVG components
- **Animations**: CSS transitions, Framer Motion (available)
- **Deployment**: Vercel
- **Data**: Static JSON files

---

## Project Structure

```
songseekers/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with Nav/Footer
│   │   ├── page.tsx                   # Hub landing page (/)
│   │   ├── guidebook/
│   │   │   └── page.tsx               # Purpose Guidebook page
│   │   ├── roll-for-veterans/
│   │   │   └── page.tsx               # Journey event page
│   │   ├── roll4veterans/
│   │   │   └── [city]/
│   │   │       └── page.tsx           # Dynamic city pages (82 total)
│   │   ├── team-bravo/
│   │   │   └── page.tsx               # Team Bravo recruitment page
│   │   └── globals.css                # Global Tailwind styles
│   │
│   ├── components/
│   │   ├── hub/
│   │   │   ├── HubHero.tsx            # Hub page hero section
│   │   │   └── PathwayCards.tsx       # Two choice cards (Guidebook/Journey)
│   │   │
│   │   ├── guidebook/
│   │   │   ├── GuidebookHero.tsx      # Guidebook page hero
│   │   │   └── DimensionsGrid.tsx     # 8 dimensions overview grid
│   │   │
│   │   ├── journey/
│   │   │   ├── JourneyHero.tsx        # Journey page hero with countdown
│   │   │   ├── JourneyStats.tsx       # Journey statistics cards
│   │   │   └── MissionStatement.tsx   # Team RWB mission and impact
│   │   │
│   │   ├── home/
│   │   │   ├── PurposeFlower.tsx      # 8-petal interactive SVG flower
│   │   │   ├── PurposeJourney.tsx     # Purpose framework mapping
│   │   │   ├── HeroSection.tsx        # Old hero (may be deprecated)
│   │   │   ├── QuickActions.tsx       # Old action cards (may be deprecated)
│   │   │   └── CountdownTimer.tsx     # Countdown to Feb 27, 2026
│   │   │
│   │   ├── map/
│   │   │   ├── RouteMap.tsx           # Interactive Mapbox component
│   │   │   ├── MapControls.tsx        # 3-layer map navigation
│   │   │   └── CityPopup.tsx          # City info popup on click
│   │   │
│   │   ├── city/
│   │   │   ├── CityHeader.tsx         # City page header
│   │   │   ├── CityStats.tsx          # City statistics display
│   │   │   └── SignupForm.tsx         # City signup form
│   │   │
│   │   └── layout/
│   │       ├── Navigation.tsx         # Site navigation (desktop/mobile)
│   │       └── Footer.tsx             # Site footer with links
│   │
│   ├── data/
│   │   └── cities.json                # 82 cities with coordinates, dates, details
│   │
│   ├── types/
│   │   ├── city.ts                    # City data interface
│   │   └── forms.ts                   # Form interfaces
│   │
│   └── lib/
│       └── data-helpers.ts            # Data query functions
│
├── public/
│   ├── images/                        # Hero images, icons, logos
│   └── favicon.ico
│
├── .env.local                         # Environment variables (not committed)
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── next.config.ts                     # Next.js configuration
└── HANDOVER.md                        # This file

```

---

## Key Components & Features

### 1. **Hub Landing Page** (`/`)
**File**: `src/app/page.tsx`

Simple entry point offering two distinct paths:
- HubHero component with mission statement and quick stats
- PathwayCards with two equal-weight options: Guidebook vs Journey
- Minimal design focusing on clear choice

```
┌─────────────────────────┬─────────────────────────┐
│  DISCOVER YOUR PURPOSE  │  ROLL FOR VETERANS 2026 │
│  [Purpose Flower Icon]  │  [Bike Icon]            │
│  → Explore Guidebook    │  → View Journey         │
└─────────────────────────┴─────────────────────────┘
```

### 2. **Purpose Guidebook Page** (`/guidebook`)
**File**: `src/app/guidebook/page.tsx`

Wellness/purpose-focused content:
- **GuidebookHero**: "The Purpose Pathfinder" - Your Guide to Whole-Person Health
- **Interactive Purpose Flower**: Click petals to explore each of 8 dimensions
- **DimensionsGrid**: Shows all 8 dimensions organized by 4 domains:
  - Physical (Vitality, Nourishment)
  - Mental (Perspective, Clarity)
  - Emotional (Presence, Regulation)
  - Lifestyle (Environment, Rhythm)
  - Spiritual (Purpose at center)
- **Download CTA**: Link to full PDF guidebook
- **Subtle Journey Link**: "See these principles in action on Roll for Veterans 2026"

### 3. **Roll for Veterans Page** (`/roll-for-veterans`)
**File**: `src/app/roll-for-veterans/page.tsx`

Journey/event-focused content:
- **JourneyHero**: Title, journey stats, countdown timer
- **JourneyStats**: 4,434 miles | 107 days | 80+ cities
- **MissionStatement**: Team RWB partnership, impact, why we ride
- **Interactive RouteMap**: Mapbox with 3-layer navigation
- **Featured Cities**: 19 major stops grid with links to detail pages
- **Team Bravo Section**: Recruitment with link to `/team-bravo`
- **CTAs**: Donate Now, Join Team Bravo, Get Updates
- **Subtle Guidebook Link**: "This journey embodies all 8 dimensions"

### 4. **Purpose Flower** (`PurposeFlower.tsx`)
**File**: `src/components/home/PurposeFlower.tsx`

Interactive SVG component with:
- **8 Petals**: Radiating at 45° intervals (0°, 45°, 90°, etc.)
- **Dimensions**: Physical, Mental, Emotional, Lifestyle (2 each) + Spiritual center
- **Styling**: Radial gradients, drop shadows, color-coded by domain
- **Interactivity**:
  - Hover: Scale up (1.08x) with enhanced shadow
  - Click: White stroke, display info panel
  - Text: Rotated to face outward, flipped for bottom half readability
- **Sizes**: small, medium, large variants

Petals:
1. **Physical** (Purple) - Vitality, Nourishment
2. **Mental** (Brown) - Perspective, Clarity
3. **Emotional** (Green) - Presence, Regulation
4. **Lifestyle** (Blue) - Environment, Rhythm
5. **Spiritual** (Yellow) - Purpose (center)

### 5. **Interactive Route Map** (`RouteMap.tsx`)
**File**: `src/components/map/RouteMap.tsx`

Mapbox GL features:
- **Three-Layer Navigation**:
  - Overview: Route line only (Key West → LA → Grand Canyon)
  - Major Stops: 19 key cities highlighted
  - All Cities: Full 82-city view
- **City Markers**: Color-coded, clickable for details
- **Popup on Click**: City name, arrival date, population, Team RWB chapter
- **Link Integration**: "View Details" button → `/roll4veterans/[city]`
- **Responsive**: Full width, touch-friendly on mobile
- **Requires**: `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable

### 6. **Dynamic City Pages** (`[city]/page.tsx`)
**File**: `src/app/roll4veterans/[city]/page.tsx`

82 pre-built pages (one per city) using `generateStaticParams()` for SSG:
- **Hero**: City name, state, arrival date, day number
- **Stats Cards**: Population, miles from start, daily ride distance
- **Team RWB Chapter**: Contact info, link to chapter website
- **Signup Form**: Name, email, phone, how can you help
- **CTAs**: Donate Now, Join Team Bravo
- **Navigation**: Links between cities and back to journey page
- **Breadcrumb**: Back to Journey link

### 7. **Navigation** (`Navigation.tsx`)
**File**: `src/components/layout/Navigation.tsx`

Fixed header with:
- **Logo**: Bike icon + "Roll for Veterans" branding
- **Desktop Menu**:
  - Home
  - Guidebook (new)
  - Roll for Veterans (new)
  - Team Bravo
  - Donate button
- **Mobile Menu**: Hamburger toggle with same links
- **Responsive**: Hides menu on mobile, shows hamburger button

### 8. **Footer** (`Footer.tsx`)
**File**: `src/components/layout/Footer.tsx`

Four-column footer:
- Brand info and mission statement
- Quick Links: Home, Guidebook, Roll for Veterans, Team Bravo
- Team RWB: Official site, chapters, join link
- Contact: Email, phone, Instagram, Facebook
- Bottom: Copyright, Privacy, Terms, RWB description

---

## Data Structure

### Cities Data
**File**: `src/data/cities.json`

Example city entry:
```json
{
  "id": "key-west-fl",
  "name": "Key West",
  "state": "Florida",
  "population": 25755,
  "coordinates": [-81.7799, 24.5551],
  "arrivalDate": "2026-02-27",
  "dayNumber": 1,
  "distanceFromStart": 0,
  "distanceFromPrevious": 0,
  "tier": "major",
  "slug": "key-west",
  "description": "Our starting point and first day of the journey...",
  "rwbChapter": {
    "name": "Team RWB Florida Keys",
    "contactEmail": "floridakeys@teamrwb.org",
    "website": "https://..."
  }
}
```

All 82 cities are included with complete data.

---

## Page Routes

```
/                       → Hub landing page
/guidebook              → Purpose Guidebook (8 petals, dimensions)
/roll-for-veterans      → Journey event page (map, cities, mission)
/roll4veterans/[city]   → Dynamic city pages (82 total)
  /roll4veterans/key-west
  /roll4veterans/miami
  /roll4veterans/austin
  ... (79 more)
/team-bravo             → Team Bravo recruitment page
```

---

## Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
NEXT_PUBLIC_SITE_URL=https://songseekers.org
```

**Note**: `.env.local` is in `.gitignore` and not committed to GitHub.

To get a Mapbox token:
1. Go to https://mapbox.com
2. Sign up for free account
3. Navigate to Access Tokens
4. Copy your public token (starts with `pk.`)
5. Add to `.env.local`

---

## Setup & Development

### Installation

```bash
# Clone repository
git clone https://github.com/songseekers/songseekers-website.git
cd songseekers

# Install dependencies
npm install

# Create .env.local with Mapbox token
echo "NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token" > .env.local
```

### Development Server

```bash
npm run dev
```

Open http://localhost:3000 and start editing. Hot reload enabled.

### Build for Production

```bash
npm run build
```

Generates optimized production build in `.next/` folder.
Pre-renders all 89 pages (3 main + 82 city pages + 3 other).

### Type Checking

```bash
npm run type-check
```

Runs TypeScript compiler to check for type errors.

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "your message"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Connect GitHub account
   - Import `songseekers/songseekers-website` repository
   - Select `main` branch as production

3. **Set Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add: `NEXT_PUBLIC_MAPBOX_TOKEN` = your mapbox token

4. **Deploy**
   - Vercel auto-deploys on push to main
   - Or manually deploy from Vercel dashboard

5. **Domain Setup**
   - In Vercel project settings → Domains
   - Add custom domain: `songseekers.org`
   - Update DNS at domain registrar to point to Vercel

---

## Git Workflow

### Standard Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ... edit files ...

# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Open Pull Request on GitHub (optional for review)
```

### Commit Message Format

Use descriptive, imperative messages:
```
Add Purpose Guidebook page with 8 dimensions grid
Update Navigation to include new routes
Fix city page breadcrumb links
Improve mobile responsiveness on hero section
```

### Current Git Status

- **Branch**: main
- **Remote**: https://github.com/songseekers/songseekers-website
- **Last Commit**: "Separate Purpose Guidebook and Roll for Veterans content into distinct pages"

---

## Common Tasks

### Add a New City

1. **Update `src/data/cities.json`**:
   ```json
   {
     "id": "austin-tx",
     "name": "Austin",
     "state": "Texas",
     "population": 978908,
     "coordinates": [-97.7431, 30.2672],
     "arrivalDate": "2026-03-15",
     "dayNumber": 17,
     "distanceFromStart": 580,
     "distanceFromPrevious": 42,
     "tier": "major",
     "slug": "austin",
     "description": "...",
     "rwbChapter": { ... }
   }
   ```

2. **Dynamic page auto-generates** via `generateStaticParams()`

3. **Rebuild**: `npm run build` to regenerate SSG pages

### Update City Information

1. Edit `src/data/cities.json` - modify any city entry
2. Rebuild and redeploy: `npm run build && git push`
3. Changes appear on both city detail page and journey page

### Add Navigation Link

Edit `src/components/layout/Navigation.tsx`:
```tsx
<Link href="/new-page" className="text-gray-700 hover:text-blue-600 transition">
  New Page
</Link>
```

Do same for mobile menu and Footer.

### Change Colors/Styling

1. **Tailwind utility classes** are used throughout
2. **Edit** `tailwind.config.ts` for theme customization
3. **Color palette**: Blues (primary), greens, purples, browns for domains
4. Refer to `DimensionsGrid.tsx` for domain color codes

### Add a New Page

1. **Create directory** under `src/app/`:
   ```bash
   mkdir src/app/new-page
   ```

2. **Create `page.tsx`**:
   ```tsx
   export const metadata = {
     title: 'Page Title | Songseekers',
     description: 'Page description for SEO',
   };

   export default function NewPage() {
     return <div>Page content</div>;
   }
   ```

3. **Add navigation link** in Navigation.tsx and Footer.tsx

4. **Rebuild and test**: `npm run build && npm run dev`

---

## Troubleshooting

### Map Not Showing

**Issue**: Mapbox map is blank or shows error

**Solution**:
1. Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set in `.env.local`
2. Check Mapbox token is valid (hasn't expired)
3. Open browser DevTools → Console to see errors
4. Restart dev server: `npm run dev`

### TypeScript Errors

**Issue**: Build fails with type errors

**Solution**:
1. Run `npm run type-check` to see all errors
2. Check file has proper imports (e.g., `import Link from 'next/link'`)
3. Ensure component interfaces are defined in `src/types/`
4. Review error message - usually indicates missing prop or wrong type

### Build Failures

**Issue**: `npm run build` fails

**Solution**:
1. Clear `.next` cache: `rm -rf .next`
2. Check for syntax errors (editor should highlight)
3. Verify all imports are correct
4. Run `npm install` to ensure dependencies are correct
5. Check Node version: Should be 18+ (check with `node --version`)

### Hot Reload Not Working

**Issue**: Changes don't reflect in browser

**Solution**:
1. Restart dev server: `Ctrl+C` then `npm run dev`
2. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
3. Check file was saved
4. Ensure running on `localhost:3000` (not different port)

---

## Performance Optimization

### Current Optimizations

1. **Static Generation (SSG)**: All 82 city pages pre-built at build time
2. **Image Optimization**: Use Next.js `Image` component (to be implemented)
3. **Code Splitting**: Automatic route-based code splitting
4. **Mapbox Lazy Loading**: Map component loads only when needed

### To Improve Further

1. **Add Next.js Image component** for hero images
   ```tsx
   import Image from 'next/image';
   <Image src="/hero.jpg" alt="Description" width={1200} height={600} />
   ```

2. **Implement dynamic imports** for large components
   ```tsx
   const RouteMap = dynamic(() => import('@/components/map/RouteMap'), {
     loading: () => <div>Loading map...</div>,
   });
   ```

3. **Add Lighthouse monitoring** via Vercel Analytics

---

## Recent Changes (Latest Work)

**Commit**: `67c1de7` - "Separate Purpose Guidebook and Roll for Veterans content into distinct pages"

**What Changed**:
- ✅ Rewrote homepage as simple hub with two pathway cards
- ✅ Created new `/guidebook` page with Purpose Flower and 8 dimensions
- ✅ Created new `/roll-for-veterans` page with journey details and map
- ✅ Added 9 new components (HubHero, PathwayCards, GuidebookHero, etc.)
- ✅ Updated Navigation and Footer with new routes
- ✅ Updated city pages to link to `/roll-for-veterans` instead of home
- ✅ All 89 pages build successfully with no errors

**Why This Change**:
- Separated mixed content (Guidebook + Journey) into focused, standalone pages
- Each page can be understood independently
- Clearer user journey: choose between Purpose exploration or Journey participation
- Better SEO and content organization

---

## Next Steps (TODO)

### High Priority
1. **Get Mapbox Token** → Add to Vercel environment variables
2. **Deploy to Vercel** → Set up domain and SSL
3. **Configure DNS** → Point songseekers.org to Vercel

### Medium Priority
1. **Add Hero Images** → Implement Next.js Image component for each page
2. **Complete City Descriptions** → Replace placeholder text with real content
3. **Populate RWB Chapters** → Gather chapter info for all 80+ cities
4. **Link Guidebook PDF** → Add download link to actual PDF file

### Lower Priority
1. **Email Signup Forms** → Integrate Formspree or alternative
2. **Analytics** → Add Google Analytics or Plausible tracking
3. **SEO Optimization** → Add structured data, optimize meta tags
4. **Blog/Updates Section** → Add daily journey updates during event
5. **Live Location Tracking** → GPS integration for real-time updates

---

## Support & Resources

### Documentation
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Mapbox**: https://docs.mapbox.com
- **React**: https://react.dev

### Team Resources
- **Team RWB**: https://teamrwb.org
- **GitHub Repo**: https://github.com/songseekers/songseekers-website
- **Vercel Dashboard**: https://vercel.com/dashboard

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run type-check      # Check TypeScript types
npm run lint            # Run ESLint

# Git
git status              # Check changes
git add .              # Stage all changes
git commit -m "msg"    # Create commit
git push origin main   # Push to GitHub
git log --oneline      # View recent commits

# Cleanup
rm -rf node_modules    # Remove dependencies
npm install            # Reinstall dependencies
rm -rf .next          # Clear build cache
```

---

## Project Links

- **Website**: https://songseekers.org (when deployed)
- **GitHub**: https://github.com/songseekers/songseekers-website
- **Vercel**: https://vercel.com (deployment platform)
- **Mapbox**: https://mapbox.com (map provider)
- **Team RWB**: https://teamrwb.org (partner organization)

---

## Contact & Handover Notes

**Last Updated**: January 24, 2026
**Project Status**: MVP Complete - Ready for Deployment
**Outstanding**: Mapbox token setup, domain configuration, production deployment

**For Questions**: Refer to this document, GitHub issues, or Next.js/Tailwind documentation.

Good luck with the project! The architecture is solid and ready to scale. 🚴

---

*This document was created for project handover and continuity. Keep it updated as the project evolves.*
