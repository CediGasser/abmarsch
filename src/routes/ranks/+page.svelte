<script lang="ts">
  import { t } from '$lib/i18n'

  import RankCard from '$lib/components/RankCard.svelte'
  import Seo from '$lib/components/Seo.svelte'
  import SwipeCardsContainer from '$lib/components/SwipeCardsContainer.svelte'
  import allRanks from './ranks.json'
  import { shuffleArray } from '$lib/stores/utils'

  type Rank = {
    name: string
    src: string
    place: number
    lazyLoad?: boolean
  }

  allRanks.reverse()
  let ranks = $state(shuffleArray(structuredClone(allRanks)))

  const onCardSwipe = (item: Rank, direction: string) => {
    // remove card from stack
    ranks = ranks.filter((rank) => rank.place !== item.place)

    console.log(`Swiped ${direction} on ${item.name}`)

    if (direction === 'left') {
      // Readd card somewhere in the stack
      readdCard(item)
    }
  }

  const readdCard = (item: Rank) => {
    const randomIndex = Math.floor((Math.random() * ranks.length) / 2 + ranks.length / 2)
    ranks.splice(randomIndex, 0, item)
  }
</script>

<Seo
  title={$t('seo.title-ranks')}
  description={$t('seo.description-ranks')}
  keywords={$t('seo.keywords-ranks')}
  canonical="https://abmarsch.ch/ranks"
/>

<main>
  <header>
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
  <SwipeCardsContainer items={ranks} {onCardSwipe}>
    {#snippet cardSnippet({ name, src, lazyLoad })}
      <RankCard name={$t(name)} {src} {lazyLoad} />
    {/snippet}
  </SwipeCardsContainer>
</main>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    gap: var(--space-l);
  }
</style>
