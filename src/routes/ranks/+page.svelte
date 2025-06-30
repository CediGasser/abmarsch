<script lang="ts">
  import { t } from '$lib/i18n'
  import RankCard from '$lib/components/RankCard.svelte'
  import Seo from '$lib/components/Seo.svelte'
  import SwipeCardsContainer from '$lib/components/SwipeCardsContainer.svelte'
  import allRanks from './ranks.json'
  import { shuffleArray, trackEvent } from '$lib/stores/utils'
  import RetriesMeter from '$lib/components/RetriesMeter.svelte'
  import { tick } from 'svelte'
  import Divider from '$lib/components/Divider.svelte'

  type Rank = {
    name: string
    src: string
    place: number
    lazyLoad?: boolean
  }

  let appState: 'playing' | 'ended' = $state('playing')
  let ranks = $state<Rank[]>([])
  let retries: Map<Rank, number> = $state(new Map())
  let maxRetries = $derived(Math.max(...retries.values(), 0))
  let firstTryRightCount = $derived(Array.from(retries.values()).filter((v) => v <= 0).length)

  $inspect(ranks)

  // Get the last state from localStorage or create new state
  const storedGameState = localStorage.getItem('gameState')
  if (storedGameState) {
    try {
      const gameState: { ranks: Rank[]; retries: [Rank, number][] } = JSON.parse(storedGameState)
      if (gameState.ranks && Array.isArray(gameState.ranks)) {
        ranks = gameState.ranks
        retries = new Map(gameState.retries.map(([rank, count]) => [rank, count]))

        // If the ranks are empty, set state to 'ended'
        if (ranks.length === 0) {
          appState = 'ended'
        }
      } else {
        ranks = shuffleArray(structuredClone(allRanks))
        retries = new Map()
      }
    } catch (error) {
      console.error('Failed to parse stored ranks:', error)
    }
  } else {
    // Initialize ranks with a shuffled copy of allRanks
    ranks = shuffleArray(structuredClone(allRanks))
    retries = new Map()
  }

  const onCardSwipe = (item: Rank, direction: string) => {
    // remove card from stack
    ranks = ranks.filter((rank) => rank.place !== item.place)

    if (direction === 'left') {
      // Readd card somewhere in the stack
      readdCard(item)

      retries.set(item, (retries.get(item) || 0) + 1)

      // Analytics tracking
      trackEvent('Rank swiped left', { rank: item.name })
    } else if (direction === 'right') {
      // Correct answer, add 0 in case it was never left swiped
      if (!retries.has(item)) {
        retries.set(item, 0)
      }

      // If there are no more cards left, end the game
      if (ranks.length === 0) {
        onCardsEnd()
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

      // Analytics tracking
      const totalRetries = Array.from(retries.values()).reduce((acc, count) => acc + count, 0)

      if (totalRetries === 0) {
        trackEvent('Ranks completed perfectly')
      } else {
        trackEvent('Ranks completed with retries', { retries: totalRetries })
      }
    }
  }

  const saveGameState = () => {
    const gameState = {
      ranks,
      retries: Array.from(retries.entries()),
    }
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }

  $effect(() => {
    saveGameState()
  })

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
  {#if appState === 'playing'}
    <span class="ranks-count">{allRanks.length - ranks.length} / {allRanks.length}</span>
    <SwipeCardsContainer items={ranks} {onCardSwipe}>
      {#snippet cardSnippet({ name, src, lazyLoad })}
        <RankCard name={$t(name)} {src} {lazyLoad} />
      {/snippet}
    </SwipeCardsContainer>
  {:else if appState === 'ended'}
    <div class="summary">
      {#if firstTryRightCount >= allRanks.length}
        <h1 class="ef">{$t('ranks.ended.ef')}</h1>
      {:else}
        <h1 class="nef">{$t('ranks.ended.nef')}</h1>
      {/if}
      <p>
        {$t('ranks.ended.text', {
          count: firstTryRightCount.toString(),
          total: allRanks.length.toString(),
        })}
      </p>
    </div>
    {#if firstTryRightCount < allRanks.length}
      <div class="card stats">
        <h2>{$t('ranks.ended.evaluation')}</h2>
        <ol>
          {#each Array(...retries.entries())
            .filter((a) => a[1] >= 1)
            .sort((a, b) => b[1] - a[1]) as [rank, count]}
            <li>
              <RetriesMeter retries={count} {rank} {maxRetries} />
            </li>
          {/each}
        </ol>
        <Divider text={$t('ranks.ended.first-try-right')} />
        <ul>
          {#each Array(...retries.entries()).filter((a) => a[1] <= 0) as [rank, count]}
            <li>
              <RetriesMeter retries={count} {rank} {maxRetries} />
            </li>
          {/each}
        </ul>
      </div>
    {/if}
    <button onclick={restartGame}>{$t('ranks.ended.restart')}</button>
  {/if}
</main>

<style>
  button {
    width: 100%;
    padding: var(--space-m);
    font-size: 1.25rem;
    background-color: var(--c-accent);
    color: var(--c-accentContrasted);
    border-radius: var(--radius-sm);
    cursor: pointer;
    border: none;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
  }

  span.ranks-count {
    font-size: var(--text-xl);
    text-align: center;
    margin-top: var(--space-l);
    font-weight: bold;
  }

  .summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-l);
  }

  .summary h1.nef {
    color: var(--c-secondary);
  }

  .summary h1.ef {
    color: var(--c-accent);
  }

  .summary p {
    font-size: 1.25rem;
    text-align: center;
    max-width: 600px;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    height: 50vh;
    overflow: scroll;
    scrollbar-gutter: stable;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: var(--space-m);
    margin-bottom: var(--space-l);
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
    gap: var(--space-m);

    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
