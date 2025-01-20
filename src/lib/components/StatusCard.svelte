<script lang="ts">
  import { run } from 'svelte/legacy'
  // TODO: Migration task run with effects

  import { tweened } from 'svelte/motion'
  import { expoInOut } from 'svelte/easing'

  interface Props {
    title?: string
    value?: number
    unit?: string
    delay?: number
    duration?: number
    text?: string
  }

  let { title = '', value = 0, unit = '', delay = 0, duration = 2000, text = '' }: Props = $props()

  const progress = tweened(0, {
    delay,
    duration,
    easing: expoInOut,
  })

  run(() => {
    progress.set(value)
  })
</script>

<div class="card">
  <h2>{title}</h2>
  <span>{Math.round($progress)}{unit}</span>
  <p>{text}</p>
</div>
