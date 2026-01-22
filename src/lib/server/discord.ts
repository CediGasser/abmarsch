import { env } from '$env/dynamic/private'

type DiscordWebhookData = {
  username: string
  content?: string
  embeds?: {
    color?: number
    title?: string
    fields?: {
      name: string
      value: string
    }[]
  }[]
}

type WebhookType = 'contact' | 'logs'

const getWebhookUrl = (type: WebhookType): string | undefined => {
  switch (type) {
    case 'contact':
      return env.DISCORD_WEBHOOK_URL
    case 'logs':
      return env.DISCORD_WEBHOOK_LOGS_URL || env.DISCORD_WEBHOOK_URL
  }
}

const sendToWebhook = async (webhookUrl: string, data: DiscordWebhookData): Promise<void> => {
  const res = await fetch(webhookUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const msg = `Failed to send message to Discord: (${res.status}) ${res.statusText}`
    throw Error(msg)
  }
}

const createWebhookSender = (type: WebhookType) => {
  return async (data: DiscordWebhookData): Promise<void> => {
    const webhookUrl = getWebhookUrl(type)

    if (!webhookUrl) {
      console.log(`Discord ${type} webhook not configured, message would have been sent:`)
      console.log(data)
      return
    }

    try {
      await sendToWebhook(webhookUrl, data)
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

export const sendMessage = createWebhookSender('contact')
export const sendLogMessage = createWebhookSender('logs')

if (!env.DISCORD_WEBHOOK_URL) {
  console.error('DISCORD_WEBHOOK_URL not set, contact messages will not be sent to Discord.')
}

if (!env.DISCORD_WEBHOOK_LOGS_URL) {
  console.warn(
    'DISCORD_WEBHOOK_LOGS_URL not set, log messages will fall back to DISCORD_WEBHOOK_URL.',
  )
}
