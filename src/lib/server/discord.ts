import { env } from '$env/dynamic/private'

if (!env.DISCORD_WEBHOOK_URL) {
  console.error('DISCORD_WEBHOOK_URL not set, messages will not be sent to Discord.')
}

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

export const sendMessage = async (data: DiscordWebhookData) => {
  const hookUrl = env.DISCORD_WEBHOOK_URL as string

  try {
    let res = await fetch(hookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      let msg = `Failed to send message to Discord: (${res.status}) ${res.statusText}`
      throw Error(msg)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
