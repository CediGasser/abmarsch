<script lang="ts">
  import { t } from '$lib/i18n'

  import RankCard from '$lib/components/RankCard.svelte'
  import Seo from '$lib/components/Seo.svelte'
  import SwipeCardsContainer from '$lib/components/SwipeCardsContainer.svelte'
  import allRanks from './ranks.json'
  import { scrollIntoView, shuffleArray } from '$lib/stores/utils'
  import RetriesMeter from '$lib/components/RetriesMeter.svelte'
  import { tick } from 'svelte'

  type Rank = {
    name: string
    src: string
    place: number
    lazyLoad?: boolean
  }

  let appState: 'playing' | 'ended' = $state('playing')

  let ranks = $state(shuffleArray(structuredClone(allRanks)))

  let retries: Map<Rank, number> = $state(new Map())
  let maxRetries = $derived(Math.max(...retries.values(), 0))

  const onCardSwipe = (item: Rank, direction: string) => {
    // remove card from stack
    ranks = ranks.filter((rank) => rank.place !== item.place)

    if (direction === 'left') {
      // Readd card somewhere in the stack
      readdCard(item)

      retries.set(item, (retries.get(item) || 0) + 1)
    } else if (direction === 'right') {
      // Correct answer, add 0 in case it was never left swiped
      if (!retries.has(item)) {
        retries.set(item, 0)
      }
    }
  }

  const readdCard = async (item: Rank) => {
    const randomIndex = Math.ceil((Math.random() * ranks.length) / 2 + ranks.length / 2)
    await tick() // Ensure the DOM is updated before re-adding the card
    ranks.splice(randomIndex, 0, item)
  }

  const onCardsEnd = () => {
    if (appState === 'playing') {
      appState = 'ended'
    }
  }

  const restartGame = () => {
    appState = 'playing'
    ranks = shuffleArray(structuredClone(allRanks))
    retries = new Map()
  }
</script>

<Seo
  title={$t('seo.title-ranks')}
  description={$t('seo.description-ranks')}
  keywords={$t('seo.keywords-ranks')}
  canonical="https://abmarsch.ch/ranks"
/>

<main>
  <header use:scrollIntoView>
    <a href="/" aria-label={$t('home.title')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label={$t('home.title')}
        class="icon icon-tabler icon-tabler-arrow-left"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l14 0"></path>
        <path d="M5 12l6 6"></path>
        <path d="M5 12l6 -6"></path>
      </svg>
    </a>
    <div>
      <h1>{$t('ranks.title')}</h1>
    </div>
  </header>
  {#if appState === 'playing'}
    <SwipeCardsContainer items={ranks} {onCardSwipe} {onCardsEnd}>
      {#snippet cardSnippet({ name, src, lazyLoad })}
        <RankCard name={$t(name)} {src} {lazyLoad} />
      {/snippet}
    </SwipeCardsContainer>
  {:else if appState === 'ended'}
    <div class="ended">
      <h2>{$t('ranks.ended.title')}</h2>
      <button onclick={restartGame}>{$t('ranks.ended.restart')}</button>
      <div class="stats">
        {#each Array(...retries.entries()).sort((a, b) => b[1] - a[1]) as [rank, count]}
          <RetriesMeter retries={count} {rank} {maxRetries} />
        {/each}
      </div>
    </div>
  {/if}
</main>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    gap: var(--space-l);
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
