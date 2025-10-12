// Life Events Data - Personal Life Timeline (with privacy protection for sensitive dates)

import { APP_CONFIG } from '../config/app-config'

// Sensitive dates interface - these will be provided by server-side configuration
export interface SensitiveDates {
  birthDate: string
}

/**
 * Event Category Type - Categories for personal life events
 */
export type EventCategory = 'personal' | 'education' | 'work' | 'travel' | 'achievement'

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
    [sensitiveDates.birthDate]: [
      {
        headline: "🐣 Born in Shanghai",
        category: "personal"
      }
    ],
    "2009-09-01": [
      {
        headline: "🎓 Started at Shanghai Foreign Language School",
        milestone: true,
        category: "education"
      }
    ],
    "2016-08-01": [
      {
        headline: "✈️ Came to US for College",
        milestone: true,
        description: "Started at Cornell University",
        category: "education"
      }
    ],
    "2018-05-01": [
      {
        headline: "💼 Meta Internship",
        description: "Interned at Meta's New York City Office",
        category: "work"
      }
    ],
    "2020-05-01": [
      {
        headline: "🎓 Graduated from Cornell University",
        milestone: true,
        description: "Bachelor's and Master's degrees",
        category: "education"
      }
    ],
    "2020-07-01": [
      {
        headline: "💼 Started at Meta full-time as a Software Engineer",
        milestone: true,
        description: "Joined Applied Privacy Technology Team",
        category: "work"
      }
    ],
    "2021-05-01": [
      {
        headline: "👨‍🏫 Hosted Kensal Ramos",
        description: "As intern manager at Meta",
        category: "work"
      }
    ],
    "2022-05-01": [
      {
        headline: "👨‍🏫 Hosted Elizabeth Ke",
        description: "As intern manager at Meta",
        category: "work"
      }
    ],
    "2022-08-01": [
      {
        headline: "🔬 Joined Experimentation Platform Team",
        milestone: true,
        description: "Switched to the Experimentation Platform team at Meta",
        category: "work"
      }
    ],
    "2024-05-01": [
      {
        headline: "👨‍🏫 Hosted Yuzhou Jiang",
        description: "As intern manager at Meta",
        category: "work"
      }
    ],
    "2025-05-01": [
      {
        headline: "👨‍🏫 Hosted Aiden Mizhen",
        description: "As intern manager at Meta",
        category: "work"
      }
    ],
    "2025-10-11": [
      {
        headline: "🤖 Created this page using Claude Code",
        description: "Built this Life in Weeks visualization with Claude Code: https://claude.com/claude-code",
        category: "achievement"
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

