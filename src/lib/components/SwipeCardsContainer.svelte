<script lang="ts" generics="T extends Record<string, any>">
  import type { Snippet } from 'svelte'

  const ANIMATION_DURATION = 300

  interface Props {
    items: T[]
    cardSnippet: Snippet<[T]>
    onCardsEnd?: () => void
    onCardSwipe?: (item: T, direction: 'left' | 'right') => void
  }
  let { items, cardSnippet, onCardsEnd, onCardSwipe }: Props = $props()

  let itemsCopy = $state(items)

  let startX = $state(0)
  let pullDeltaX = $state(0)
  let rotate = $derived(pullDeltaX / 10)

  let isSwiping = $state(false)
  let pullXThreshold = 100
  let swipeReleaseDirection: '' | 'left' | 'right' | 'middle' = $state('')

  const release = () => {
    if (pullDeltaX > pullXThreshold) {
      console.log('swiped right')
      swipeReleaseDirection = 'right'
      setTimeout(() => removeCard('right'), ANIMATION_DURATION)
    } else if (pullDeltaX < -pullXThreshold) {
      console.log('swiped left')
      swipeReleaseDirection = 'left'
      removeCard('left')
      setTimeout(() => removeCard('left'), ANIMATION_DURATION)
    } else {
      console.log('swiped middle')
      swipeReleaseDirection = 'middle'
    }

    setTimeout(() => {
      swipeReleaseDirection = ''
      pullDeltaX = 0
    }, ANIMATION_DURATION)
  }

  const removeCard = (swipeDirection: 'left' | 'right') => {
    let item = itemsCopy.shift() as T
    onCardSwipe?.(item, swipeDirection)
    if (itemsCopy.length === 0) {
      onCardsEnd?.()
    }
  }

  const onSwipeStart = (e: TouchEvent | MouseEvent) => {
    isSwiping = true
    startX = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX
  }

  const onSwipeMove = (e: TouchEvent | MouseEvent) => {
    if (!isSwiping) return
    const x = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX
    pullDeltaX = x - startX
  }

  const onSwipeEnd = (e: TouchEvent | MouseEvent) => {
    isSwiping = false
    release()
  }
</script>

<svelte:document
  onmousedown={onSwipeStart}
  ontouchstart={onSwipeStart}
  onmousemove={onSwipeMove}
  ontouchmove={onSwipeMove}
  onmouseup={onSwipeEnd}
  ontouchend={onSwipeEnd}
/>

<div class="wrapper">
  {#if itemsCopy.length >= 1}
    {@const item = itemsCopy[0]}
    <div
      class="swipe-container"
      style="transform: translateX({pullDeltaX}px) rotate({rotate}deg)"
      class:to-left={swipeReleaseDirection === 'left'}
      class:to-right={swipeReleaseDirection === 'right'}
      class:middle={swipeReleaseDirection === 'middle'}
    >
      {@render cardSnippet(item)}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .swipe-container {
    position: absolute;
    cursor: grab;
    touch-action: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 50% 100%;
    transform: translateX(0);
    transition: transform 0.3s;
  }

  .to-left {
    transform: translateX(-30rem) rotate(-30deg) !important;
  }

  .to-right {
    transform: translate(30rem) rotate(30deg) !important;
  }

  .middle {
    transform: translateX(0) !important;
  }
</style>
