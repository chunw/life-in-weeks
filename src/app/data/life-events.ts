// Life Events Data - Personal Life Timeline (with privacy protection for sensitive dates)

import { APP_CONFIG } from '../config/app-config'

// Sensitive dates interface - these will be provided by server-side configuration
export interface SensitiveDates {
  birthDate: string
}

/**
 * Event Category Type - Categories for personal life events
 */
export type EventCategory = 'personal'
/**
 * LifeEvent Interface - Defines the structure for life events
 *
 * FIELD USAGE:
 * - headline: Main text displayed in cells and tooltips (REQUIRED)
 *   In compact mode: emoji extracted and shown in cell
 *   In standard mode: full text shown in cell
 *
 * - description: Additional details shown in rich tooltips
 *   Displayed for events with URLs or detailed text
 *   Supports clickable links in tooltips
 *
 * - milestone: Used for automatic milestone color generation
 *   Events marked as milestones get unique background colors
 *   Colors are auto-generated based on chronological order
 *
 * - category: Event category for filtering
 *   personal: Birth, major life milestones
 *   education: School, graduation, academic achievements
 *   work: Jobs, internships, team changes, professional milestones
 *   travel: Trips, relocations, international moves
 *   achievement: Awards, recognitions, accomplishments
 */
export interface LifeEvent {
  headline: string          // Main text in cells and tooltips
  description?: string      // Additional details in rich tooltips
  milestone?: boolean       // For automatic background colors
  category?: EventCategory  // Event category for filtering
}

export type EventsData = Record<string, LifeEvent[]>

// Weeks configuration interface
export interface WeeksConfig {
  startDate: string
  endYear: number
  startYear: number
  startMonth: string
  startDay: string
}

// Function to create life events with sensitive dates and derived config
export function createLifeEvents(sensitiveDates: SensitiveDates, derivedConfig: { lifeExpectancyDate: string; japanLifeExpectancyDate: string; lifeExpectancyLabel: string; japanLifeExpectancyLabel: string }): EventsData {
  return {
//    [sensitiveDates.birthDate]: [
    "1991-06-05": [
      {
        headline: "🐣 Born",
        category: "personal"
      }
    ],
     "2014-05-27": [
      {
        headline: "Graduated with Highest Distinctionfrom University of Virginia with B.S. degree in Computer Science",
        description: "Majored in Computer Science, minored in Applied Math.",
        category: "personal"
      }
    ],
     "2019-06-25": [
      {
        headline: "Graduated from Stanford University with M.S. degree in Computer Science",
        description: "Majored in Computer Science, with a focus on Human-Computer Interaction and Artificial Intelligence.",
        category: "personal"
      }
    ],
    "2026-02-02": [
      {
        headline: "Exhibition @United Nations Headquarters in New York",
        description: "Honored to be invited to exhibit my work at the United Nations Headquarters in New York, as part of the Global Auspicious Zodiac Competition Exhibition. ",
        category: "personal"
      }
    ],
     "2026-02-15": [
      {
        headline: "Exhibition @Time Square, New York",
        description: "Excited to have my work displayed at Time Square in New York as part of the Fun In Progress group show curated by HMVC Gallery New York. ",
        category: "personal"
      }
    ], 
    "2026-02-18": [
      {
        
        headline: "First Tote bag order from Chun Wang Studio Shop",
        description: "Thrilled to receive the first order of Remains tote bags from my Chun Wang Studio Shop at chunwangshop.com! Grateful for the support and excited to share my work with the world.",
        category: "personal"
      }
    ],
    ...(APP_CONFIG.showLifeExpectancy ? {
      [derivedConfig.lifeExpectancyDate]: [
        {
          headline: derivedConfig.lifeExpectancyLabel,
          description: `Based on US male life expectancy data from Worldometers`,
          milestone: true  // Mark as milestone to show it's a significant marker
        }
      ]
    } : {}),
    ...(APP_CONFIG.showJapanLifeExpectancy ? {
      [derivedConfig.japanLifeExpectancyDate]: [
        {
          headline: derivedConfig.japanLifeExpectancyLabel,
          description: `Japan has one of the highest life expectancies globally`,
          milestone: true  // Mark as milestone for comparison
        }
      ]
    } : {})
  }
}

// Function to create weeks config with sensitive birth date
export function createWeeksConfig(birthDate: string, derivedConfig: { endYear: number }): WeeksConfig {
  return {
    startDate: birthDate,
    endYear: derivedConfig.endYear,
    startYear: parseInt(birthDate.split('-')[0]),
    startMonth: birthDate.split('-')[1],
    startDay: birthDate.split('-')[2]
  }
}
