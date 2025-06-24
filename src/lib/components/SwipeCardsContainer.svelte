<script lang="ts" generics="T extends Record<string, any>">
  import type { Snippet } from 'svelte'
  import SwipeCard from './SwipeCard.svelte'

  interface Props {
    items: T[]
    cardSnippet: Snippet<[T]>
    onCardSwipe?: (item: T, direction: 'left' | 'right') => void
  }
  let { items, cardSnippet, onCardSwipe }: Props = $props()
</script>

<div class="wrapper">
  <div class="background">
    <div class="background-left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="64"
        height="64"
        stroke-width="4"
      >
        <path d="M18 6l-12 12"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </div>
    <div class="background-right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="64"
        height="64"
        stroke-width="4"
      >
        <path d="M5 12l5 5l10 -10"></path>
      </svg>
    </div>
  </div>
  {#each items as item, i (item.place)}
    <SwipeCard index={i} onSwipe={(direction) => onCardSwipe?.(item, direction)}>
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

  .background {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    width: 100%;
    color: var(--c-overlay1);
  }
</style>
