'use client'

import React, { useState, useRef } from 'react'
import { StickyHeader } from './sticky-header'
import { IntroContent } from './intro-content'
import { WeeksGrid } from './weeks-grid'
import { Footer } from './footer'
import { EventFilter, EventFilters } from './event-filter'
import { CompactToggle } from './compact-toggle'
import { APP_CONFIG, DerivedConfig } from '../config/app-config'
import { EventsData, WeeksConfig } from '../data/life-events'

interface LifeWeeksClientProps {
  lifeEvents: EventsData
  weeksConfig: WeeksConfig
  derivedConfig: DerivedConfig
}

/**
 * Client Component for Life in Weeks visualization
 * Handles interactive state like compact mode toggle and event filters
 */
export function LifeWeeksClient({ lifeEvents, weeksConfig, derivedConfig }: LifeWeeksClientProps) {
  // Default to compact mode on mobile, standard on desktop
  const [isCompactMode, setIsCompactMode] = useState(() => {
    if (typeof window === 'undefined') {
      return APP_CONFIG.defaultCompactMode // Server-side fallback
    }
    return window.innerWidth <= 768 // Mobile/tablet uses compact mode
  })

  // Event filter state
  const [filters, setFilters] = useState<EventFilters>({
    showPersonalEvents: true,
    showWorldEvents: APP_CONFIG.defaultShowWorldEvents,
    showPresidents: APP_CONFIG.defaultShowPresidents,
    personalCategories: {
      personal: true,
      education: true,
      work: true,
      travel: true,
      achievement: true
    }
  })

  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div className="life-in-weeks-container">
      <div className="life-in-weeks">
        <StickyHeader
          derivedConfig={derivedConfig}
          gridRef={gridRef}
        />
        <IntroContent />
        <div className="controls-row">
          <EventFilter
            filters={filters}
            setFilters={setFilters}
          />
          <CompactToggle
            isCompact={isCompactMode}
            onToggle={setIsCompactMode}
          />
        </div>
        <WeeksGrid
          ref={gridRef}
          isCompactMode={isCompactMode}
          lifeEvents={lifeEvents}
          weeksConfig={weeksConfig}
          filters={filters}
        />
        <Footer />
      </div>
    </div>
  )
}