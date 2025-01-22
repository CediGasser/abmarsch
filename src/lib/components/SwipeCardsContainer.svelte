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
    <SwipeCard index={i} onSwipe={(direction) => onCardSwipe(item, direction)}>
      {@render cardSnippet(item)}
    </SwipeCard>
  {/each}
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>
