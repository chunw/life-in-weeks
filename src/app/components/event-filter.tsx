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

  const toggleCategoryFilter = (category: keyof EventFilters['personalCategories']) => {
    setFilters({
      ...filters,
      personalCategories: {
        ...filters.personalCategories,
        [category]: !filters.personalCategories[category]
      }
    })
  }

  const allPersonalCategoriesEnabled = Object.values(filters.personalCategories).every(v => v)
  const toggleAllPersonalCategories = () => {
    const newValue = !allPersonalCategoriesEnabled
    setFilters({
      ...filters,
      personalCategories: {
        personal: newValue,
        education: newValue,
        work: newValue,
        travel: newValue,
        achievement: newValue
      }
    })
  }

  return (
    <div className="event-filter">
      <div className="filter-section">
        <div className="filter-label">Event Filters:</div>

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

          <label className={`filter-chip ${filters.showPresidents ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={filters.showPresidents}
              onChange={() => toggleMainFilter('showPresidents')}
              className="filter-checkbox"
            />
            <span className="filter-chip-text">US Presidents</span>
          </label>
        </div>
      </div>

      {/* Personal event category filters - only show when personal events are enabled */}
      {filters.showPersonalEvents && (
        <div className="filter-section category-section">
          <div className="category-header">
            <span className="filter-label">Personal Event Categories:</span>
            <button
              onClick={toggleAllPersonalCategories}
              className="select-all-btn"
            >
              {allPersonalCategoriesEnabled ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="filter-buttons">
            <label className={`filter-chip category-chip ${filters.personalCategories.personal ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.personalCategories.personal}
                onChange={() => toggleCategoryFilter('personal')}
                className="filter-checkbox"
              />
              <span className="filter-chip-text">Personal</span>
            </label>

            <label className={`filter-chip category-chip ${filters.personalCategories.education ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.personalCategories.education}
                onChange={() => toggleCategoryFilter('education')}
                className="filter-checkbox"
              />
              <span className="filter-chip-text">Education</span>
            </label>

            <label className={`filter-chip category-chip ${filters.personalCategories.work ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.personalCategories.work}
                onChange={() => toggleCategoryFilter('work')}
                className="filter-checkbox"
              />
              <span className="filter-chip-text">Work</span>
            </label>

            <label className={`filter-chip category-chip ${filters.personalCategories.travel ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.personalCategories.travel}
                onChange={() => toggleCategoryFilter('travel')}
                className="filter-checkbox"
              />
              <span className="filter-chip-text">Travel</span>
            </label>

            <label className={`filter-chip category-chip ${filters.personalCategories.achievement ? 'active' : ''}`}>
              <input
                type="checkbox"
                checked={filters.personalCategories.achievement}
                onChange={() => toggleCategoryFilter('achievement')}
                className="filter-checkbox"
              />
              <span className="filter-chip-text">Achievements</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
