# Roll for Veterans 2026 - Website

A beautiful, engaging website for **songseekers.org/roll4veterans** - supporting Team RWB's cross-country bike ride from Key West, Florida to the Grand Canyon, Arizona.

## 🚴 Overview

This is a Next.js 14+ website built to support the Roll for Veterans 2026 journey:
- **Route**: Key West → LA → Grand Canyon
- **Duration**: February 27 - June 13, 2026 (108 days)
- **Distance**: 4,463 miles
- **Cities**: 42+ communities across 19 major stops
- **Mission**: Support Team RWB and connect veterans nationwide

## ✨ Features

### Interactive Route Map
- 3-layer navigation system:
  - **Overview**: Key West → LA → Grand Canyon
  - **Major Stops**: 19 planned key cities
  - **All Cities**: 42+ communities with 25k+ population
- Click any city to see arrival dates, population, and RWB chapter info
- Built with Mapbox GL JS for beautiful, performant mapping

### Dynamic City Pages (82 pages)
- Pre-built city landing pages via static site generation
- Each city page includes:
  - Arrival date and day number
  - Population and distance statistics
  - Local Team RWB chapter information
  - Signup form for local participation
  - Links to Donate and Join Team Bravo

### Homepage
- Compelling hero section with mission statement
- Live countdown timer to February 27, 2026
- Quick action buttons (View Map, Donate, Join Crew, Get Updates)
- Featured Major Stops carousel
- Team RWB impact statistics

### Team Bravo Recruitment
- Dedicated page for support crew recruitment
- Roles: Support Drivers, Camera Operators, Social Media Team, Segment Cyclists
- Application form with requirements
- FAQ section

## 🛠 Tech Stack

- **Next.js 14+** (App Router, TypeScript)
- **React 18** (Server & Client Components)
- **Tailwind CSS** (utility-first styling)
- **Mapbox GL JS** (interactive mapping)
- **React Hook Form + Zod** (form validation)
- **Framer Motion** (animations)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Mapbox API token (free at https://mapbox.com)

### Installation

```bash
# Clone & install
git clone <repo>
cd songseekers
npm install

# Setup environment
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_token" > .env.local

# Run development
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## 📁 Key Files

- `src/app/page.tsx` - Homepage
- `src/app/roll4veterans/[city]/page.tsx` - Dynamic city pages
- `src/components/map/RouteMap.tsx` - Interactive map component
- `src/data/cities.json` - All 80+ cities data
- `src/types/city.ts` - TypeScript interfaces

## 📊 Data Structure

All cities stored in `src/data/cities.json`:

```json
{
  "id": "austin-tx",
  "name": "Austin",
  "state": "Texas",
  "population": 961855,
  "coordinates": [-97.7431, 30.2672],
  "arrivalDate": "2026-03-20",
  "dayNumber": 22,
  "distanceFromStart": 1200,
  "tier": "major",
  "rwbChapter": { "name": "Team RWB Austin", ... },
  "slug": "austin"
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git add . && git commit -m "Initial" && git push

# 2. Import on Vercel
# Go to https://vercel.com, connect GitHub repo

# 3. Set environment variables in project settings
# NEXT_PUBLIC_MAPBOX_TOKEN

# 4. Deploy!
```

Then point `songseekers.org` DNS to Vercel.

## 🎨 Customization

### Add a City
1. Edit `src/data/cities.json`
2. Add new city object with coordinates and details
3. Run `npm run build` to generate new page automatically
4. Deploy!

### Update Homepage
Edit `src/app/page.tsx`

### Update Map
Edit `src/components/map/RouteMap.tsx`

## 📱 Features

✅ 82 pre-generated city pages  
✅ Interactive 3-layer route map  
✅ Live countdown timer  
✅ Mobile responsive  
✅ Fast performance (25MB build)  
✅ SEO optimized  
✅ TypeScript type safety  
✅ Team Bravo recruitment form  

## 🔄 Future

- [ ] Daily updates section (blog)
- [ ] Live location tracking
- [ ] Email notifications
- [ ] Media hub / press kit
- [ ] Social media integration

## 📞 Contact

- Email: rollforveterans@gmail.com
- Phone: (828) 280-4709
- Team RWB: https://teamrwb.org

---

**Built for Team RWB - Empowering Veterans Through Physical and Social Engagement**
# songseekers-website
