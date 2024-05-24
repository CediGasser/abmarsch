/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

const precache_list = [...build, ...files, ...prerendered].map((s) => ({
  url: s,
  revision: version,
}))

precacheAndRoute(precache_list)
