// Life Events Data - Personal Life Timeline (with privacy protection for sensitive dates)

import { APP_CONFIG } from '../config/app-config'

// Sensitive dates interface - these will be provided by server-side configuration
export interface SensitiveDates {
  birthDate: string
}

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
 */
export interface LifeEvent {
  headline: string        // Main text in cells and tooltips
  description?: string    // Additional details in rich tooltips
  milestone?: boolean     // For automatic background colors
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
        headline: "🐣 Born in Shanghai"
      }
    ],
    "2016-08-01": [
      {
        headline: "✈️ Came to US for College",
        milestone: true,
        description: "Started at Cornell University"
      }
    ],
    "2018-05-01": [
      {
        headline: "💼 Meta Internship",
        description: "Interned at Meta"
      }
    ],
    "2020-07-01": [
      {
        headline: "💼 Started at Meta",
        milestone: true,
        description: "Joined Meta full-time as a Software Engineer"
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

