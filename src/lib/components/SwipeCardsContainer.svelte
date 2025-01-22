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
  {#each items as item, i}
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .card-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
