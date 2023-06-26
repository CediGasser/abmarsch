<script>
  import { fade } from 'svelte/transition';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';

  export let refresh = '';
  export let duration = 150;

  const dispatch = createEventDispatcher();
  let transitioning = false;

  beforeNavigate(() => transitioning = true);
  afterNavigate(() => transitioning = false);

  $: if (refresh) {
    setTimeout(() => {
      dispatch('transitioned');
    }, duration * 1.5);
  }
</script>

{#key refresh}
  <div class:transitioning
    in:fade={{ duration, delay: duration / 2 }}
    out:fade={{ duration: duration / 2 }}>
      <slot />
  </div>
{/key}

<style>
  div {
    background-color: transparent;
  }

  :global(.transitioning > *) {
    position: absolute;
  }
</style>