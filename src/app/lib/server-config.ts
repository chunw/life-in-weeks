// Server-side configuration for sensitive data
// This file runs only on the server and is not exposed to the client

// Default birth date (fallback if env var not set)
const DEFAULT_BIRTH_DATE = "1991-06-05"

// Get date from environment variable - server-side only
function getDateWithFallback(envVar: string, fallback: string): string {
  return process.env[envVar] || fallback
}

// Server-side sensitive dates configuration
export const SERVER_CONFIG = {
  BIRTH_DATE: getDateWithFallback("REAL_BIRTH_DATE", DEFAULT_BIRTH_DATE)
}