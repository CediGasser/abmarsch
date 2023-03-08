import grid from '$lib/classes/CharGrid'
import type { ServerLoad } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load: ServerLoad = async () => {
  return {
    grid: grid.chars
  }
}