import { error, redirect, type Actions } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { sendMessage } from '$lib/server/discord'

const RATE_LIMIT_CAPACITY = parseFloat(env.FORM_RATE_LIMIT_CAPACITY || '5')
const RATE_LIMIT_DURATION = parseFloat(env.FORM_RATE_LIMIT_DURATION || '60')

const visitsByIp = new Map<string, number>()

export const actions = {
  default: async ({ request, getClientAddress }) => {
    const formData = await request.formData()
    const message = formData.get('message') as string
    const honeypotNameField = formData.get('name') as string

    if (honeypotNameField) {
      // Honeypot field filled, likely a bot
      console.warn('Honeypot triggered, ignoring request', { honeypotNameField, message })
      sendMessage({
        username: 'abmarsch.ch Honeypot Triggered',
        content: `Honeypot field filled: ${honeypotNameField}`,
      }).catch((err) => {
        console.error('Failed to send honeypot trigger message', err)
      })
      redirect(301, '/thx')
    }

    const ipAddress = request.headers.get('X-Real-IP') || getClientAddress()

    if (message.trim().length === 0) {
      redirect(301, '/thx')
    }

    visitsByIp.set(ipAddress, (visitsByIp.get(ipAddress) || 0) + 1)

    if ((visitsByIp.get(ipAddress) || 0) > RATE_LIMIT_CAPACITY) {
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
      if (visitsByIp.get(ipAddress) === RATE_LIMIT_CAPACITY) {
        console.info('Rate limit reset', { ipAddress })
        try {
          sendMessage({
            username: 'abmarsch.ch Rate Limit Reset',
            content: `${ipAddress} was rate limited and has been reset.`,
          })
        } catch {
          console.error('Failed to send rate limit reset message')
        }
      }

      if (visitsByIp.get(ipAddress) === 1) visitsByIp.delete(ipAddress)
      else visitsByIp.set(ipAddress, (visitsByIp.get(ipAddress) || 0) - 1)
    }, RATE_LIMIT_DURATION * 1000)

    redirect(301, '/thx')
  },
} satisfies Actions
