<script lang="ts">
  import { fade } from 'svelte/transition'
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let swiped: boolean = true
  let intersectionObserver: IntersectionObserver
  export let observe: Element

  onMount(() => {
    let localSwiped = window.localStorage.getItem('swiped') ?? 'false'
    swiped = localSwiped === 'true'

    if (swiped) return

    intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.localStorage.setItem('swiped', 'true')
            swiped = window.localStorage.getItem('swiped') === 'true'
            observer.disconnect()
          }
        })
      },
      {
        root: null,
        rootMargin: '16px',
        threshold: 0.5,
      }
    )
    return () => intersectionObserver.disconnect()
  })

  const onClick = (event: any) => {
    if (event.type === 'keyup' && event.key !== 'Enter') return
    dispatch('press')
  }

  $: if (observe && intersectionObserver) intersectionObserver.observe(observe)
</script>

{#if !swiped}
  <div 
    on:click={onClick}
    on:keyup={onClick}
    transition:fade={{ duration: 2000}}
    class="swipe-indicator">
    Swipe für meh  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
  </div>
{/if}

<style>
  svg {
    display: inline;
    vertical-align: middle;
    margin-left: 0.5rem;
  }
  .swipe-indicator {
    position: fixed;
    bottom: 3.5rem;
    right: 2rem;
    height: 3rem;
    background: transparent;
    backdrop-filter: blur(4px);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    animation: swipe-indicator 4s infinite ease-in-out;
  }

  @keyframes swipe-indicator {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(1rem);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>