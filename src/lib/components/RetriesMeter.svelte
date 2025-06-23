<script lang="ts">
  import { t } from '$lib/i18n'

  interface Props {
    retries: number
    rank: { name: string; src: string; place: number }
    maxRetries: number
  }
  let { retries, rank, maxRetries }: Props = $props()
</script>

<div class="wrapper">
  <img src={rank.src} alt={$t(rank.name)} />

  <span>{$t(rank.name)}</span>

  <div class="retries">
    <span class:has-retries={retries > 0}>
      {retries}
    </span>
    <meter
      value={retries}
      min="0"
      max={maxRetries}
      low="0"
      high={maxRetries / 2}
      optimum={maxRetries / 4}
      aria-label={rank.name + ' ' + $t('retries-meter.label') + ' ' + retries}
    >
      {retries}
    </meter>
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    align-items: center;
    font-size: 0.875rem;
    grid-template-columns: 3rem auto;
    grid-template-rows: 1fr 1fr;
  }

  meter {
    width: 100%;
    height: 1.5rem;
    flex-grow: 1;
  }

  img {
    width: 2rem;
    object-fit: cover;
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .retries {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    color: var(--c-positive);
  }

  .has-retries {
    color: var(--c-negative);
  }
</style>
