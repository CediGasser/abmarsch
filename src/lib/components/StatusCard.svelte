<script lang="ts">
  import { Tween } from 'svelte/motion'
  import { expoInOut } from 'svelte/easing'

  interface Props {
    title?: string
    value?: number
    unit?: string
    delay?: number
    duration?: number
    text?: string
    round?: number
  }

  let {
    title = '',
    value = 0,
    unit = '',
    delay = 0,
    duration = 2000,
    text = '',
    round = 0,
  }: Props = $props()

  const progress = $derived(
    new Tween(0, {
      delay,
      duration,
      easing: expoInOut,
    }),
  )

  $effect(() => {
    progress.target = value
  })
</script>

<div class="card">
  <h2>{title}</h2>
  <span>
    <span class="progress">
      {progress.current.toFixed(round).split('.')[0]}
    </span>{#if round > 0}<span class="decimal-point">
        .{progress.current.toFixed(round).split('.')[1]}
      </span>
    {/if}
    {unit}
  </span>
  <p>{text}</p>
</div>

<style>
  .progress {
    margin-right: 0;
  }

  .decimal-point {
    font-size: 0.6em;
  }
</style>
