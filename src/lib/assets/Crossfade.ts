import { crossfade } from 'svelte/transition'

export const [send, receive] = crossfade({
  duration: 500
});