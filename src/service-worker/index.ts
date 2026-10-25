import { self } from '$app/service-worker'
import { version } from '$app/env'
import { immutable, assets } from '$app/manifest'
import { asset } from '$app/paths'
import type { AssetPath } from '$app/types'

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`

// manifest paths are relative, so turn them into absolute pathnames. `immutable` paths are
// typed as plain strings, but are served from the same prefix as `static` files.
const ASSETS = [
  ...immutable.map((file) => asset(file.path as AssetPath)),
  ...assets.map((file) => asset(file.path)),
]

self.addEventListener('install', (event) => {
  // Create a new cache and add all files to it
  async function addFilesToCache() {
    const cache = await caches.open(CACHE)
    await cache.addAll(ASSETS)
  }

  event.waitUntil(addFilesToCache())
})

self.addEventListener('activate', (event) => {
  // Remove previous cached data from disk
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key)
    }
  }

  event.waitUntil(deleteOldCaches())
})

self.addEventListener('fetch', (event) => {
  // ignore POST requests etc
  if (event.request.method !== 'GET') return

  async function respond() {
    const url = new URL(event.request.url)
    const cache = await caches.open(CACHE)

    // `immutable`/`assets` can always be served from the cache
    if (ASSETS.includes(url.pathname)) {
      const response = await cache.match(url.pathname)

      if (response) {
        return response
      }
    }

    // for everything else, try the network first, but
    // fall back to the cache if we're offline
    try {
      const response = await fetch(event.request)

      // if we're offline, fetch can return a value that is not a Response
      // instead of throwing - and we can't pass this non-Response to respondWith
      if (!(response instanceof Response)) {
        throw new Error('invalid response from fetch')
      }

      if (response.status === 200) {
        cache.put(event.request, response.clone())
      }

      return response
    } catch (err) {
      const response = await cache.match(event.request)

      if (response) {
        return response
      }

      // if there's no cache, then just error out
      // as there is nothing we can do to respond to this request
      throw err
    }
  }

  event.respondWith(respond())
})
