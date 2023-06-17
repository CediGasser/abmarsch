<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { expoInOut } from 'svelte/easing';

  export let title = '';
  export let value = 0;
  export let unit = '';
  export let delay = 0;
  export let duration = 2000;
  export let text = '';

  const progress = tweened(0, {
    delay,
    duration,
    easing: expoInOut
  });

  $: progress.set(value);
</script>

<div class="card">
  <h4>{title}</h4>
  <span>{Math.round($progress)}{unit}</span>
  <p>{text}</p>
</div>