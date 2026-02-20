'use client'

// StickyHeader Component - Header with decade navigation
// Matches Gina's header/navbar.html and sticky behavior

import React, { useState, useEffect, RefObject } from 'react'
import { getDecadeMilestones } from '../utils/date-processing'
import { DerivedConfig } from '../config/app-config'

interface StickyHeaderProps {
  derivedConfig: DerivedConfig
  gridRef: RefObject<HTMLDivElement | null>
}

export function StickyHeader({ derivedConfig, gridRef }: StickyHeaderProps) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const [activeDecade, setActiveDecade] = useState('decade-0')
  const [navbarThreshold, setNavbarThreshold] = useState(150) // Fallback

  // Calculate the threshold for navbar appearance
  useEffect(() => {
    const calculateThreshold = () => {
      if (gridRef.current) {
        const gridRect = gridRef.current.getBoundingClientRect()
        const gridTopFromPageTop = gridRect.top + window.scrollY
        const threshold = gridTopFromPageTop - 10 // 10px buffer
        setNavbarThreshold(Math.max(50, threshold)) // Min 50px
      }
    }

    const timer = setTimeout(calculateThreshold, 100)
    window.addEventListener('resize', calculateThreshold)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateThreshold)
    }
  }, [gridRef])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsNavbarVisible(scrollY > navbarThreshold)

      const weekBoxes = document.querySelectorAll('.week, .birthday, .event')
      let currentDecade = 'decade-0'

      for (const box of weekBoxes) {
        const rect = box.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 50) {
          const boxElement = box as HTMLElement
          const tooltip = boxElement.getAttribute('data-bs-title') || boxElement.title

          if (tooltip) {
            const ageMatch = tooltip.match(/Turned (\d+) years? old/)
            if (ageMatch) {
              const age = parseInt(ageMatch[1])
              const decade = Math.floor(age / 10) * 10
              currentDecade = `decade-${decade}`
              break
            }

            const yearMatch = tooltip.match(/(\w{3} \d{1,2}, (\d{4}))/)
            if (yearMatch) {
              const year = parseInt(yearMatch[2])
              const age = year - derivedConfig.birthYear
              const decade = Math.floor(Math.max(0, age) / 10) * 10
              currentDecade = `decade-${decade}`
              break
            }
          }
        }
      }

      setActiveDecade(currentDecade)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [derivedConfig.birthYear, navbarThreshold])

  const decades = getDecadeMilestones(derivedConfig.endYear, derivedConfig.birthYear)

  return (
    <div
      className="sticky-top"
      style={{
        backgroundColor: 'var(--main-bg-color)'
      }}
    >
      <nav
        className={`navbar ${isNavbarVisible ? 'navbar-visible' : ''}`}
        id="lifeinweeks-navbar"
        style={{
          display: isNavbarVisible ? 'block' : 'none',
          opacity: isNavbarVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className="p-0">
          <ul className="nav nav-pills justify-content-between">
            {decades.map((decade) => (
              <li key={decade.id} className="nav-item">
                <a
                  className={`nav-link ${activeDecade === decade.id ? 'active' : ''}`}
                  href={`#${decade.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(decade.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {decade.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
