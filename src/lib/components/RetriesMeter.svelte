<script lang="ts">
  import { t } from '$lib/i18n'

  interface Props {
    retries: number
    rank: { name: string; src: string; place: number }
    maxRetries: number
  }
  let { retries, rank, maxRetries }: Props = $props()
</script>

{#if retries === 0}
  <div class="no-retries">
    <img src={rank.src} alt={$t(rank.name)} />
  </div>
{:else}
  <div class="wrapper">
    <img src={rank.src} alt={$t(rank.name)} />

    <span>{$t(rank.name)}</span>

    <span class="retries">
      {$t('ranks.ended.retries', {
        retries: (retries + 1).toString(),
      })}
    </span>
  </div>
{/if}

<style>
  .wrapper {
    display: grid;
    align-items: center;
    font-size: 0.875rem;
    grid-template-columns: 3rem auto;
    grid-template-rows: 1fr 1fr;
  }

  .no-retries {
    width: fit-content;
    height: 100%;
  }

  img {
    width: 2rem;
    object-fit: cover;
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .retries {
    color: var(--c-accentContrasted);
    background-color: var(--c-secondary);
    border-radius: var(--radius-sm);
    padding-inline: var(--space-m);
    padding-block: 0.15rem;
    width: fit-content;
  }
</style>
