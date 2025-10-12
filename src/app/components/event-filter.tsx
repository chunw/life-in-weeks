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
    <div className="event-filter" style={{
      marginTop: '1rem',
      marginBottom: '1rem',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <div style={{ marginBottom: '0.75rem' }}>
        <strong>Event Filters:</strong>
      </div>

      {/* Main event type toggles */}
      <div style={{ marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.showPersonalEvents}
            onChange={() => toggleMainFilter('showPersonalEvents')}
            style={{ marginRight: '0.25rem' }}
          />
          <span>Personal Events</span>
        </label>

        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.showWorldEvents}
            onChange={() => toggleMainFilter('showWorldEvents')}
            style={{ marginRight: '0.25rem' }}
          />
          <span>World Events</span>
        </label>

        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.showPresidents}
            onChange={() => toggleMainFilter('showPresidents')}
            style={{ marginRight: '0.25rem' }}
          />
          <span>US Presidents</span>
        </label>
      </div>

      {/* Personal event category filters - only show when personal events are enabled */}
      {filters.showPersonalEvents && (
        <div style={{
          marginTop: '0.75rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid #dee2e6'
        }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.9em', color: '#666' }}>
            <strong>Personal Event Categories:</strong>
            <button
              onClick={toggleAllPersonalCategories}
              style={{
                marginLeft: '0.5rem',
                fontSize: '0.85em',
                padding: '0.1rem 0.4rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              {allPersonalCategoriesEnabled ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.9em' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.personalCategories.personal}
                onChange={() => toggleCategoryFilter('personal')}
                style={{ marginRight: '0.25rem' }}
              />
              <span>Personal</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.personalCategories.education}
                onChange={() => toggleCategoryFilter('education')}
                style={{ marginRight: '0.25rem' }}
              />
              <span>Education</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.personalCategories.work}
                onChange={() => toggleCategoryFilter('work')}
                style={{ marginRight: '0.25rem' }}
              />
              <span>Work</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.personalCategories.travel}
                onChange={() => toggleCategoryFilter('travel')}
                style={{ marginRight: '0.25rem' }}
              />
              <span>Travel</span>
            </label>

            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.personalCategories.achievement}
                onChange={() => toggleCategoryFilter('achievement')}
                style={{ marginRight: '0.25rem' }}
              />
              <span>Achievements</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
