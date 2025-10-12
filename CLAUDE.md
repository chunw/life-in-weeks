# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Life in Weeks** is a Next.js 15 application that visualizes a person's life as a grid where each week is represented by a box. Inspired by Wait But Why's concept and adapted from Gina Trapani's Hugo implementation.

**Tech Stack**: Next.js 15, TypeScript, React 19, Tailwind CSS 4, Custom CSS

**Key Features**:
- Responsive grid layout with pixel-perfect calculations
- Privacy-protected personal timeline using server-side environment variables
- World events and US presidents overlays
- Automatic milestone color generation
- Compact mode that fits entire life on screen
- Rich tooltips with clickable links

## Development Commands

```bash
# Install dependencies (uses yarn, not npm)
yarn install

# Development server with Turbopack
yarn dev

# Type checking (no auto-fix)
yarn typecheck

# Linting
yarn lint

# Production build
yarn build

# Start production server
yarn start
```

**Important**: This project uses **yarn**, not npm. Always use yarn commands.

## Architecture Overview

### Configuration-Driven Design

The app uses a centralized configuration pattern where sensitive data flows from server-side environment variables through the component tree:

1. **Server Component** ([page.tsx](src/app/page.tsx)) loads sensitive dates from `.env.local`
2. **Server Config** ([server-config.ts](src/app/lib/server-config.ts)) validates required environment variables
3. **App Config** ([app-config.ts](src/app/config/app-config.ts)) provides all display settings
4. **Derived Config** is calculated from birth date and passed to client components

### Privacy Protection Pattern

Sensitive personal dates (birth date, marriage, etc.) are **never exposed to client bundle**:

- Stored in `.env.local` (git-ignored)
- Loaded server-side only via `SERVER_CONFIG`
- Passed as processed data (not raw dates) to client components
- Client receives configuration objects, not environment variables

**Required Environment Variables** (in `.env.local`):
```bash
REAL_BIRTH_DATE=YYYY-MM-DD
```

### Data Flow Architecture

```
.env.local (server-only)
  ↓
server-config.ts (validates env vars)
  ↓
page.tsx (Server Component)
  ↓ creates
app-config.ts (createDerivedConfig)
  ↓ generates
life-events.ts (createLifeEvents with sensitive dates)
  ↓ passes to
life-weeks-client.tsx (Client Component)
  ↓ renders
weeks-grid.tsx → week-box.tsx
```

### Key Architectural Concepts

1. **Milestone System**: Events marked with `milestone: true` automatically receive unique background colors through [milestone-colors.ts](src/app/utils/milestone-colors.ts). Colors are generated chronologically without manual color mapping.

2. **Responsive Grid System**: [grid-layout.ts](src/app/utils/grid-layout.ts) implements pixel-perfect responsive calculations:
   - Dynamic container width measurement
   - Absolute pixel width calculations for text boxes
   - Greedy row-breaking algorithm
   - Viewport-specific constants (ultrawide/wide/desktop/tablet/mobile/extraSmall)
   - Separate compact mode constants for ultra-dense layout

3. **Compact Mode**: When enabled, entire life fits on screen:
   - Emoji-only display for events
   - Compressed cell dimensions (4-8px vs 18-26px)
   - Events without emojis are hidden
   - Automatic emoji extraction from headlines

4. **Date Processing**: [date-processing.ts](src/app/utils/date-processing.ts) handles:
   - Weekly data generation from birth to max age
   - Week-of-year calculations relative to birth date
   - Birthday detection and current week tracking
   - Decade milestone generation for navigation

## File Organization

```
src/app/
├── config/
│   └── app-config.ts           # Central settings (display, privacy, life expectancy)
├── lib/
│   └── server-config.ts        # Server-side env var validation
├── data/
│   ├── life-events.ts          # Personal timeline (uses createLifeEvents pattern)
│   ├── world-events.ts         # Historical events overlay
│   ├── us-presidents.ts        # Presidential terms overlay
│   └── color-mappings.ts       # Event type color mappings
├── utils/
│   ├── grid-layout.ts          # Responsive pixel calculations & row breaking
│   ├── date-processing.ts      # Week generation & date utilities
│   ├── milestone-colors.ts     # Automatic color generation for milestones
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

## Working with Life Events

### Adding Personal Events

Edit [life-events.ts](src/app/data/life-events.ts) in the `createLifeEvents` function:

```typescript
export function createLifeEvents(sensitiveDates: SensitiveDates, derivedConfig: DerivedConfig): EventsData {
  return {
    "2024-12-25": [
      {
        headline: "🎄 Holiday Event",              // Full text in normal mode, emoji only in compact
        description: "Details with https://...",   // Shown in tooltip, links auto-detected
        milestone: true                            // Automatic unique background color
      }
    ]
  }
}
```

**Field Usage**:
- `headline`: Main text (required). In compact mode, only emoji is extracted and shown.
- `description`: Tooltip details with auto-linked URLs (optional).
- `milestone`: Triggers automatic color generation (optional).

### Privacy Settings

Control date visibility in [app-config.ts](src/app/config/app-config.ts):

```typescript
showPersonalEventDates: false  // false = month/year only, true = full dates
```

## Styling Approach

All styles are in [weeks.css](src/app/weeks.css). No CSS modules or styled-components.

**Key CSS patterns**:
- Responsive breakpoints match GRID_CONSTANTS in [grid-layout.ts](src/app/utils/grid-layout.ts)
- Compact mode uses separate CSS classes (`.compact-grid`, `.compact-box`)
- Mobile-first media queries: `320px → 480px → 768px → 1024px → 1400px → 1800px`
- Box sizing: borders included in width calculations

## Testing Local Changes

```bash
# After modifying life-events.ts or app-config.ts
yarn dev

# Check for type errors
yarn typecheck

# Production build test
yarn build
yarn start
```

## Common Development Tasks

### Changing Display Settings

Edit [app-config.ts](src/app/config/app-config.ts):
```typescript
export const APP_CONFIG: AppConfig = {
  maxAge: 85,                      // Adjust timeline end
  defaultShowWorldEvents: true,    // Toggle world events overlay
  showLifeExpectancy: true,        // Show life expectancy markers
  defaultCompactMode: false,       // Start in compact view
  // ...
}
```

### Adjusting Responsive Behavior

Modify [grid-layout.ts](src/app/utils/grid-layout.ts):
- `GRID_CONSTANTS`: Static breakpoint values
- `calculateDynamicConstants()`: Dynamic container width calculations
- `calculateBoxWidth()`: Text box width calculations
- `calculateWeekCellWidth()`: Empty week cell dimensions

### Modifying Milestone Colors

[milestone-colors.ts](src/app/utils/milestone-colors.ts):
- `COLOR_PALETTE`: First 20 colors (can extend array)
- `generateHSLColor()`: Auto-generates colors beyond palette
- Colors are assigned chronologically to events with `milestone: true`

## Deployment Notes

**Vercel Deployment**:
1. Add environment variables in Vercel dashboard (Project Settings → Environment Variables)
2. Required: `REAL_BIRTH_DATE=YYYY-MM-DD`
3. Deploy: `git push` triggers automatic deployment

**Analytics**: Vercel Analytics is enabled via `@vercel/analytics` in [layout.tsx](src/app/layout.tsx).

## Code Patterns to Follow

1. **Configuration over hardcoding**: Use `APP_CONFIG` for all display settings
2. **Server-side secrets**: Never expose sensitive dates to client bundle
3. **Factory functions**: Use `createLifeEvents()`, `createDerivedConfig()` patterns
4. **Absolute paths**: Import from `src/app/` not relative paths
5. **Type safety**: All data structures have TypeScript interfaces
6. **Privacy-aware tooltips**: Respect `showPersonalEventDates` setting

## Git Workflow

- Main branch: `main`
- Clean status currently
- Recent commits focused on privacy, legends, and personal customization
