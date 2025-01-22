<script lang="ts">
  interface Props {
    children?: Snippet
    onSwipe?: (direction: 'left' | 'right') => void
    index: number
  }
  let { children, onSwipe, index }: Props = $props()

  const ANIMATION_DURATION = 300

  let startX = $state(0)
  let pullDeltaX = $state(0)
  let rotate = $derived(pullDeltaX / 10)

  let isSwiping = $state(false)
  let pullXThreshold = 60
  let swipeReleaseDirection: '' | 'left' | 'right' | 'middle' = $state('')

  const release = () => {
    if (pullDeltaX > pullXThreshold) {
      swipeReleaseDirection = 'right'
      setTimeout(() => onSwipe('right'), ANIMATION_DURATION)
    } else if (pullDeltaX < -pullXThreshold) {
      swipeReleaseDirection = 'left'
      setTimeout(() => onSwipe('left'), ANIMATION_DURATION)
    } else {
      swipeReleaseDirection = 'middle'
    }

    pullDeltaX = 0
    setTimeout(() => {
      swipeReleaseDirection = ''
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
  class="swipe-container noselect"
  style="transform: translateX({pullDeltaX / 2}px) rotate({rotate}deg); --index: {index};"
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
  <div class="layered-container">
    {@render children?.()}
  </div>
</div>

<style>
  .swipe-container {
    position: absolute;
    z-index: calc(-1 * var(--index) + 25);
    cursor: grab;
    touch-action: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 50% 100%;
    transform: translateX(0);
    -webkit-tap-highlight-color: transparent;
  }

  .layered-container {
    transition:
      rotate 0.3s,
      transform 0.3s,
      opacity 0.3s;
    rotate: calc(sin(var(--index)) * 3deg);
    transform: translateY(calc(var(--index) * -3px));
    opacity: calc(1.2 - var(--index) * 0.2);
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
