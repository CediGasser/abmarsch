export const handle = async ({ event, resolve }) => {
  // redirect to canonical domain
  if (event.url.hostname !== 'abmarsch.ch' && event.url.hostname !== 'localhost') {
    return new Response(null, {
      status: 301,
      headers: {
        Location: 'https://abmarsch.ch' + event.url.pathname,
      },
    })
  }

  const response = await resolve(event)
  return response
}
