<script lang="ts">
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  let swiped: boolean = true
  let intersectionObserver: IntersectionObserver
  export let observe: Element

  onMount(() => {
    let localSwiped = window.localStorage.getItem('swiped') ?? 'false'
    swiped = localSwiped === 'true'

    console.log('swiped', swiped)

    if (swiped) return

    intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('swiped')
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

  $: if (observe && intersectionObserver) intersectionObserver.observe(observe)
</script>

{#if !swiped}
  <div 
    transition:fade={{ duration: 2000}}
    class="swipe-indicator">
    Swipe für meh <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
  </div>
{/if}

<style>
  svg {
    display: inline;
    vertical-align: middle;
  }
  .swipe-indicator {
    position: fixed;
    bottom: 3.5rem;
    right: 2rem;
    height: 1rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 100%
    );
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