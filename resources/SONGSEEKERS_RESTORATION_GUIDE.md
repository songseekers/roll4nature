# SongSeekers Content Restoration Guide

This guide explains how to access and restore the original SongSeekers homepage and Guidebook content that was moved when Roll for Veterans became the main site.

## What Changed

As of this restructuring:
- **Roll for Veterans** is now the homepage at `/` (localhost:3000)
- The original **SongSeekers homepage** has been archived
- The **Guidebook** content remains at `/guidebook` but is not linked from the main navigation

## Preserved Content Locations

### 1. Git Branch: `songseekers-original`
The complete original state of the project (before R4V became the homepage) is preserved in a Git branch.

**To view the original version:**
```bash
git checkout songseekers-original
```

**To return to the R4V version:**
```bash
git checkout main
```

### 2. Archived Homepage
The original SongSeekers homepage file is stored at:
```
src/app/_archived/songseekers-homepage/page.tsx
```

### 3. Guidebook (Still Active)
The Guidebook page remains fully functional at:
```
http://localhost:3000/guidebook
```
Or in production:
```
https://r4v.songseekers.org/guidebook
```

## How to Restore SongSeekers as the Homepage

If you want to make SongSeekers the homepage again, follow these steps:

### Option A: Switch to the Original Branch (Easiest)
```bash
git checkout songseekers-original
npm run build
npm start
```

### Option B: Manual Restoration
1. **Backup current R4V homepage:**
   ```bash
   mkdir -p src/app/_archived/r4v-homepage
   mv src/app/page.tsx src/app/_archived/r4v-homepage/page.tsx
   ```

2. **Restore SongSeekers homepage:**
   ```bash
   cp src/app/_archived/songseekers-homepage/page.tsx src/app/page.tsx
   ```

3. **Update Navigation (if needed):**
   Edit `src/components/layout/Navigation.tsx` to add back any SongSeekers-specific navigation items.

4. **Rebuild:**
   ```bash
   npm run build
   npm start
   ```

## Running Both Sites Simultaneously

If you want to run both sites at the same time for comparison:

### Terminal 1 - R4V Site (main branch)
```bash
git checkout main
npm run build
PORT=3000 npm start
```

### Terminal 2 - SongSeekers Site (original branch)
```bash
git checkout songseekers-original
npm run build
PORT=3001 npm start
```

Now you can access:
- Roll for Veterans: http://localhost:3000
- SongSeekers: http://localhost:3001

## Accessing Guidebook Content

The Guidebook is still available in the current R4V setup. To access it:

**Directly via URL:**
- Local: http://localhost:3000/guidebook
- Production: https://r4v.songseekers.org/guidebook

**Add to Navigation:**
If you want to add it back to the navigation menu, edit `src/components/layout/Navigation.tsx`:

```tsx
<Link href="/guidebook" className="text-gray-300 hover:text-[#E07B4F] transition">
  Guidebook
</Link>
```

## File Structure Reference

```
src/app/
├── page.tsx                                    # Current: R4V homepage
├── _archived/
│   ├── songseekers-homepage/
│   │   └── page.tsx                           # Original SongSeekers homepage
│   └── r4v-homepage/                          # (created if you restore SongSeekers)
│       └── page.tsx
├── guidebook/
│   └── page.tsx                               # Guidebook (still active, not linked)
├── roll-for-veterans/
│   └── page.tsx                               # Old R4V route (now redundant)
├── sponsor/
│   └── page.tsx                               # Sponsor page
├── team-bravo/
│   └── page.tsx                               # Team Bravo page
└── roll4veterans/
    └── [city]/
        └── page.tsx                           # Individual city pages
```

## Production Deployment Notes

### Current Setup (R4V as homepage)
- Main domain: `r4v.songseekers.org` → R4V homepage
- Guidebook: `r4v.songseekers.org/guidebook` → Guidebook page
- Sponsor: `r4v.songseekers.org/sponsor` → Sponsor page

### If You Want Separate Domains Later
You could set up:
- `r4v.songseekers.org` → Roll for Veterans (current setup)
- `www.songseekers.org` or `songseekers.org` → SongSeekers homepage + Guidebook

This would require:
1. Separate Vercel deployments or branches
2. Domain configuration in your DNS settings
3. Environment variables to distinguish between deployments

## Important Notes

- **Don't delete the `songseekers-original` branch** - it's your backup of all SongSeekers content
- The `/guidebook` route still works - it's just not linked in navigation
- All R4V functionality (map, forms, SMS, etc.) works normally with the new structure
- The `_archived` folder (with underscore prefix) is ignored by Next.js routing

## Quick Reference Commands

```bash
# View what branch you're on
git branch

# Switch to SongSeekers original
git checkout songseekers-original

# Switch back to R4V main
git checkout main

# List all branches
git branch -a

# Access guidebook directly
# Just go to: localhost:3000/guidebook
```

## Need Help?

If you run into issues:
1. Make sure you've committed any changes before switching branches
2. Use `git status` to check your current state
3. The `songseekers-original` branch is your safety net - it has everything
4. You can always create a new branch to experiment: `git checkout -b my-experiment`

---

**Date Created:** February 5, 2026
**Project:** SongSeekers / Roll for Veterans
**Author:** Claude Sonnet 4.5
