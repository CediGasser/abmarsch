<script lang="ts" generics="T extends Record<string, any>">
  import type { Snippet } from 'svelte'
  import SwipeCard from './SwipeCard.svelte'

  const ANIMATION_DURATION = 300

  interface Props {
    items: T[]
    cardSnippet: Snippet<[T]>
    onCardsEnd?: () => void
    onCardSwipe?: (item: T, direction: 'left' | 'right') => void
  }
  let { items, cardSnippet, onCardsEnd, onCardSwipe }: Props = $props()
</script>

<div class="wrapper">
  {#each items as item, i (item.place)}
    <div class="card-wrapper" style="--index: {i}">
      <SwipeCard onSwipe={(direction) => onCardSwipe(item, direction)}>
        {@render cardSnippet(item)}
      </SwipeCard>
    </div>
  {/each}
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-wrapper {
    z-index: calc(-1 * var(--index) + 25);
    transition:
      rotate 0.3s,
      transform 0.3s,
      opacity 0.3s;
    rotate: calc(sin(var(--index)) * 3deg);
    transform: translateY(calc(var(--index) * -3px));
    opacity: calc(1 - var(--index) * 0.1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>
