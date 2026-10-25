import { error, redirect, type Actions } from '@sveltejs/kit'
import { FORM_RATE_LIMIT_CAPACITY, FORM_RATE_LIMIT_DURATION } from '$app/env/private'
import { sendMessage, sendLogMessage } from '#lib/server/discord.js'

const visitsByIp = new Map<string, number>()

export const actions = {
  default: async ({ request, getClientAddress }) => {
    const formData = await request.formData()
    const message = formData.get('message') as string
    const honeypotNameField = formData.get('name') as string

    const ipAddress = request.headers.get('X-Real-IP') || getClientAddress()

    if (honeypotNameField) {
      // Honeypot field filled, likely a bot
      console.warn('Honeypot triggered, ignoring request', { honeypotNameField, message })
      sendLogMessage({
        username: 'abmarsch.ch Honeypot Triggered',
        content: `Honeypot field filled: ${honeypotNameField}\n\nIP Address: ${ipAddress}\n\nMessage content:\n${message}`,
      }).catch((err) => {
        console.error('Failed to send honeypot trigger message', err)
      })
      redirect(301, '/thx')
    }

    if (message.trim().length === 0) {
      redirect(301, '/thx')
    }

    visitsByIp.set(ipAddress, (visitsByIp.get(ipAddress) || 0) + 1)

    if ((visitsByIp.get(ipAddress) || 0) > FORM_RATE_LIMIT_CAPACITY) {
      // silently ignore the request and log it
      console.info('Rate limited', {
        ipAddress,
        message,
        visits: visitsByIp.get(ipAddress),
      })
    } else {
      console.info('Contact form submitted', { ipAddress, message })
      try {
        sendMessage({
          username: 'abmarsch.ch Contact Form',
          content: message,
        })
      } catch {
        error(500, 'Failed to send message')
      }
    }

    setTimeout(() => {
      if (visitsByIp.get(ipAddress) === FORM_RATE_LIMIT_CAPACITY) {
        console.info('Rate limit reset', { ipAddress })
        sendLogMessage({
          username: 'abmarsch.ch Rate Limit Reset',
          content: `${ipAddress} was rate limited and has been reset.`,
        }).catch(() => {
          console.error('Failed to send rate limit reset message')
        })
      }

      if (visitsByIp.get(ipAddress) === 1) visitsByIp.delete(ipAddress)
      else visitsByIp.set(ipAddress, (visitsByIp.get(ipAddress) || 0) - 1)
    }, FORM_RATE_LIMIT_DURATION * 1000)

    redirect(301, '/thx')
  },
} satisfies Actions
