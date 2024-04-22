import { error, redirect, type Actions } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { sendMessage } from '$lib/server/discord'

const RATE_LIMIT_CAPACITY = parseFloat(env.FORM_RATE_LIMIT_CAPACITY) ?? 5
const RATE_LIMIT_DURATION = parseFloat(env.FORM_RATE_LIMIT_DURATION) ?? 60

const visitsByIp = new Map<string, number>()

export const actions = {
  default: async ({ request, getClientAddress }) => {
    const message = (await request.formData()).get('message') as string
    const ipAddress = getClientAddress()

    visitsByIp.set(ipAddress, (visitsByIp.get(ipAddress) || 0) + 1)

    if ((visitsByIp.get(ipAddress) || 0) > RATE_LIMIT_CAPACITY) {
      // silently ignore the request and log it
      console.log('Rate limited', {
        ipAddress,
        message,
        visits: visitsByIp.get(ipAddress),
      })
    } else {
      console.log('Contact form submitted', { ipAddress, message })
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
        console.log('Rate limit reset', { ipAddress })
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

    throw redirect(301, '/thx')
  },
} satisfies Actions
