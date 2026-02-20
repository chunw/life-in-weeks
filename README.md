# Life in Weeks - Next.js

Inspired by [Wait But Why](https://waitbutwhy.com/2014/05/life-weeks.html) and [Gina Trapani's implementation](https://github.com/ginatrapani/life-in-weeks).

For a more user-friendly app version, check out [lifeweeks.app](https://lifeweeks.app/) by Cory Zue.

## Features

- **Responsive grid layout** with pixel-perfect calculations across 6 breakpoints (320px to 1800px+)
- **Privacy-protected personal timeline** using server-side environment variables (dates never exposed to client)
- **World events and US presidents overlays** with toggleable display
- **Automatic milestone color generation** - no manual color mapping required
- **Compact mode** - fits entire life on screen with emoji-only display
- **Rich tooltips** with auto-detected clickable links
- **Life expectancy markers** and decade navigation
- **Sticky decade headers** for easy navigation through years
- **Current week highlighting** with birthday detection
- **Vercel Analytics** integration

## Tech Stack

- **Next.js 15** with App Router and Server Components
- **React 19** with client/server component separation
- **TypeScript** with strict type checking
- **Tailwind CSS 4** + Custom CSS
- **Turbopack** for fast development builds
- **Vercel Analytics** for usage tracking

## Getting Started

**Important**: This project uses **npm** commands.

```bash
git clone <your-repo-url>
cd life-in-weeks-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Additional Commands

```bash
npm run typecheck  # Type checking (no auto-fix)
npm run lint       # Run ESLint
npm run build      # Production build
npm run start      # Start production server
```

## Configuration

### Privacy Protection for Sensitive Dates

This codebase implements **privacy-first architecture** where sensitive personal dates never reach the client bundle:

- Dates stored in `.env.local` (git-ignored)
- Loaded server-side only via Server Components
- Passed as processed data (not raw dates) to client components
- Client receives configuration objects, never environment variables

**Setup for your deployment:**

1. **Create `.env.local`** (git-ignored):
```bash
# Required environment variables for sensitive dates
REAL_BIRTH_DATE=YYYY-MM-DD
```

2. **Configure display settings** in `src/app/config/app-config.ts`:
```typescript
export const APP_CONFIG = {
  name: "Your Name",
  website: "https://yourwebsite.com",
  maxAge: 85,
  showLifeExpectancy: true,
  defaultShowWorldEvents: true,
  defaultShowPresidents: false,
  defaultCompactMode: false,           // Start in compact view
  showPersonalEventDates: false,       // false = month/year only, true = full dates
}
```

3. **Optional (recommended for social previews):**
```bash
NEXT_PUBLIC_SITE_ORIGIN=https://yizhouyu.dev
```

### Vercel/Production Deployment

1. Add environment variables in Vercel dashboard → Project Settings → Environment Variables
2. Required: `REAL_BIRTH_DATE=YYYY-MM-DD`
3. Git push triggers automatic deployment

## Adding Life Events

Edit `src/app/data/life-events.ts` using the `createLifeEvents` factory pattern:

```typescript
export function createLifeEvents(sensitiveDates: SensitiveDates, derivedConfig: DerivedConfig): EventsData {
  return {
    "2024-12-25": [
      {
        headline: "🎄 Holiday Celebration",          // Full text in normal mode, emoji only in compact
        description: "Details with https://...",     // Shown in tooltip, links auto-detected
        milestone: true                              // Triggers automatic unique color
      }
    ]
  }
}
```

**Field usage:**
- `headline`: Main text (required). In compact mode, only emojis are extracted and displayed.
- `description`: Tooltip details with auto-linked URLs (optional).
- `milestone`: Triggers automatic color generation without manual color mapping (optional).

## Key Features Explained

### Compact Mode
When enabled, the entire life timeline fits on screen:
- Shows emoji-only display for events (extracts emojis automatically)
- Compressed cell dimensions (4-8px vs 18-26px)
- Events without emojis are hidden
- Perfect for seeing your whole life at a glance

### Milestone Color System
Events marked with `milestone: true` automatically receive unique background colors:
- First 20 colors from curated palette
- Additional colors generated using HSL algorithm
- Colors assigned chronologically
- No manual color mapping required

### Responsive Grid System
Pixel-perfect calculations across 6 breakpoints:
- Extra small: 320px
- Mobile: 480px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1400px
- Ultrawide: 1800px+

Dynamic container width measurement and greedy row-breaking algorithm ensure optimal layout on any screen.

## Architecture

### Data Flow
```
.env.local (server-only)
  ↓
server-config.ts (validates env vars)
  ↓
page.tsx (Server Component)
  ↓
app-config.ts (createDerivedConfig)
  ↓
life-events.ts (createLifeEvents with sensitive dates)
  ↓
life-weeks-client.tsx (Client Component)
  ↓
weeks-grid.tsx → week-box.tsx
```

### File Organization

```
src/app/
├── config/
│   └── app-config.ts           # Central settings (display, privacy, life expectancy)
├── lib/
│   └── server-config.ts        # Server-side env var validation
├── data/
│   ├── life-events.ts          # Personal timeline (createLifeEvents pattern)
│   ├── world-events.ts         # Historical events overlay
│   ├── us-presidents.ts        # Presidential terms overlay
│   └── color-mappings.ts       # Event type color mappings
├── utils/
│   ├── grid-layout.ts          # Responsive pixel calculations & row breaking
│   ├── date-processing.ts      # Week generation & date utilities
│   ├── milestone-colors.ts     # Automatic color generation
│   └── color-utils.ts          # Color manipulation helpers
├── components/
│   ├── life-weeks-client.tsx   # Main client component
│   ├── weeks-grid.tsx          # Grid layout & decade sections
│   ├── week-box.tsx            # Individual week cell
│   ├── custom-tooltip.tsx      # Rich tooltip with link extraction
│   ├── sticky-header.tsx       # Decade navigation
│   ├── compact-toggle.tsx      # Compact mode switcher
│   ├── intro-content.tsx       # Page header
│   └── footer.tsx              # Page footer
├── page.tsx                    # Server component entry point
├── layout.tsx                  # Root layout with metadata
└── weeks.css                   # All styling (no CSS modules)
```

## Advanced Deployment (Cloudflare + Vercel)

This project is deployed at `https://yizhouyu.dev/weeks` using a sophisticated setup:

- **Main site** (`yizhouyu.dev`) hosted on GitHub Pages
- **Life in Weeks app** hosted on Vercel
- **Cloudflare Worker** proxies `/weeks` path to Vercel
- URLs stay as `yizhouyu.dev/weeks` (no redirect visible to users)

### Setup Steps

1. **Deploy to Vercel** with `REAL_BIRTH_DATE` environment variable
2. **Configure Cloudflare DNS**: 4 A records pointing to GitHub Pages IPs (all with Proxy = ON, orange cloud)
3. **Create Cloudflare Worker** that intercepts `/weeks` requests and proxies to Vercel
4. **Set Worker Route**: `yourdomain.com/weeks*` → worker

See [CLAUDE.md](CLAUDE.md) for complete Cloudflare Worker code and troubleshooting.

## Development

**Configuration-driven design principles:**
1. Use `APP_CONFIG` for all display settings
2. Never expose sensitive dates to client bundle
3. Use factory functions: `createLifeEvents()`, `createDerivedConfig()`
4. All styles in `weeks.css` (no CSS modules)
5. Privacy-aware tooltips respect `showPersonalEventDates` setting

See [CLAUDE.md](CLAUDE.md) for detailed development guidance.