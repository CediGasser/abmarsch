<script lang="ts">
  interface Props {
    children?: Snippet
    onSwipe?: (direction: 'left' | 'right') => void
  }
  let { children, onSwipe }: Props = $props()

  const ANIMATION_DURATION = 300

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
      setTimeout(() => onSwipe('right'), ANIMATION_DURATION)
    } else if (pullDeltaX < -pullXThreshold) {
      console.log('swiped left')
      swipeReleaseDirection = 'left'
      setTimeout(() => onSwipe('left'), ANIMATION_DURATION)
    } else {
      console.log('swiped middle')
      swipeReleaseDirection = 'middle'
    }

    setTimeout(() => {
      swipeReleaseDirection = ''
      pullDeltaX = 0
    }, ANIMATION_DURATION)
  }

  const onSwipeStart = (e: TouchEvent | MouseEvent) => {
    isSwiping = true
    startX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX
  }

  const onSwipeMove = (e: TouchEvent | MouseEvent) => {
    if (!isSwiping) return
    const x = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX
    pullDeltaX = x - startX
  }

  const onSwipeEnd = (e: TouchEvent | MouseEvent) => {
    isSwiping = false
    release()
  }
</script>

<div
  class="swipe-container"
  style="transform: translateX({pullDeltaX}px) rotate({rotate}deg)"
  class:to-left={swipeReleaseDirection === 'left'}
  class:to-right={swipeReleaseDirection === 'right'}
  class:middle={swipeReleaseDirection === 'middle'}
  onmousedown={onSwipeStart}
  ontouchstart={onSwipeStart}
  onmousemove={onSwipeMove}
  ontouchmove={onSwipeMove}
  onmouseup={onSwipeEnd}
  ontouchend={onSwipeEnd}
>
  {@render children?.()}
</div>

<style>
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
  }

  .to-left {
    transition: transform 0.3s;
    transform: translateX(-30rem) rotate(-30deg) !important;
  }

  .to-right {
    transition: transform 0.3s;
    transform: translate(30rem) rotate(30deg) !important;
  }

  .middle {
    transition: transform 0.3s;
    transform: translateX(0) !important;
  }
</style>
