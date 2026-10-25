import { defineEnvVars } from '@sveltejs/kit/env'

const number = (fallback: number) => (input: string | undefined) => {
  if (!input) return fallback
  const value = parseFloat(input)
  if (Number.isNaN(value)) throw new Error(`expected a number, got "${input}"`)
  return value
}

export const variables = defineEnvVars({
  FORM_RATE_LIMIT_CAPACITY: {
    description: 'Contact form submissions allowed per IP within the rate limit duration',
    schema: number(5),
  },
  FORM_RATE_LIMIT_DURATION: {
    description: 'Contact form rate limit window, in seconds',
    schema: number(60),
  },
  DISCORD_WEBHOOK_URL: {
    description: 'Discord webhook for contact messages; empty disables sending',
    schema: (input) => input ?? '',
  },
  DISCORD_WEBHOOK_LOGS_URL: {
    description: 'Discord webhook for log messages; empty falls back to DISCORD_WEBHOOK_URL',
    schema: (input) => input ?? '',
  },
})
