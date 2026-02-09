'use client'

import React from 'react'

export interface EventFilters {
  showPersonalEvents: boolean
  showWorldEvents: boolean
  showPresidents: boolean
  personalCategories: {
    personal: boolean
    education: boolean
    work: boolean
    travel: boolean
    achievement: boolean
  }
}

interface EventFilterProps {
  filters: EventFilters
  setFilters: (filters: EventFilters) => void
}

export function EventFilter({ filters, setFilters }: EventFilterProps) {
  const toggleMainFilter = (key: 'showPersonalEvents' | 'showWorldEvents' | 'showPresidents') => {
    setFilters({
      ...filters,
      [key]: !filters[key]
    })
  }

  return (
    <div className="event-filter">
      <div className="filter-section">
        {/* <div className="filter-label">Event Filters:</div> */}

        {/* Main event type toggles */}
        <div className="filter-buttons">
          <label className={`filter-chip ${filters.showPersonalEvents ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={filters.showPersonalEvents}
              onChange={() => toggleMainFilter('showPersonalEvents')}
              className="filter-checkbox"
            />
            <span className="filter-chip-text">Personal Events</span>
          </label>

          <label className={`filter-chip ${filters.showWorldEvents ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={filters.showWorldEvents}
              onChange={() => toggleMainFilter('showWorldEvents')}
              className="filter-checkbox"
            />
            <span className="filter-chip-text">World Events</span>
          </label>
        </div>
      </div>


    </div>
  )
}
