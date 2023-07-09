<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';
  import { send, receive } from '$lib/assets/Crossfade';

  import { startDate, endDate, daysTotal, daysPassed } from '$lib/stores/Dates'
  import { t } from '$lib/i18n'
  
  import DateInput from '$lib/components/DateInput.svelte'
  import StatusCard from '$lib/components/StatusCard.svelte'
  import Seo from '$lib/components/Seo.svelte'

  $: percentage = Math.min(Math.round($daysPassed / $daysTotal * 100), 100)

  // 0 = Sunday, 1 = Monday, ...
  let weekDay = new Date().getDay() - 1 < 0 ? 6 : new Date().getDay() - 1

  let weekDayTweened = tweened(0, {
    delay: 3600,
    duration: 1000,
    easing: expoOut
  })

  $: weekDayTweened.set(weekDay)
</script>

<Seo title={$t('seo.title-home')}
  description={$t('seo.description-home')}
  keywords={$t('seo.keywords-home')} />

<main>
  <header>
    <h1>{$t('home.title')}</h1>
  </header>
  <div class="kpi-grid">
    <div class="card date-selection">
        <label for="startDate"><h2>{$t('home.start')}</h2></label> <DateInput id="startDate" bind:value={$startDate} />
        <label for="endDate"><h2>{$t('home.end')}</h2></label> <DateInput id="endDate" bind:value={$endDate} />
    </div>
    <div class="week">
      <StatusCard 
        title={$t('home.week')}
        value={Math.max(0, Math.min(Math.ceil($daysPassed / 7), Math.ceil($daysTotal / 7)))} 
        text={$t('home.week-text', { weeks: Math.max(0, Math.min(Math.ceil($daysTotal / 7), Math.ceil($daysTotal / 7))).toString() })} />
    </div>
    <div class="progress">
      <StatusCard 
        title={$t('home.progress')}
        value={Math.max(0, percentage)} 
        unit="%"
        text={percentage < 100 ? $t('home.progress-messages')[Math.max(0, Math.floor(percentage / 25))] : $t('home.progress-done')}
        delay={800} />
    </div>
    <div class="days-passed">
      <StatusCard 
        title="{$daysPassed >= 0 ? $t('home.already-done') : $t('home.until-start')}" 
        value={Math.abs(Math.min($daysTotal, $daysPassed))} 
        unit={$t('home.days')}
        delay={1600} 
        text={$t('home.already-done-text')} />
    </div>

    <div class="total-days">
      <StatusCard 
        title={$t('home.total')} 
        value={$daysTotal} 
        text={$t('home.total-message')}
        delay={2400} />
    </div>
    <div class="card soon-weekend">
      <h2>{$t('home.soon-weekend')}</h2>
      <span class="week-day-list">
        {#each $t('home.soon-weekend-days-abbr') as day, i}
          <span class:active-week-day={i <= $weekDayTweened}>{day}</span>
        {/each}
      </span>
      <p>{$t('home.soon-weekend-messages')[weekDay]}</p>
    </div>
  </div>
  <a href="/ranks">
    <div class="card link-card">
      <div class="link-card-left">
        <h2>{$t('home.learn-by-heart')}</h2>
        <div
          out:send|global={{ key: 'a' }} 
          in:receive|global={{ key: 'a' }}>
          <h1>{$t('ranks.title')}</h1>
        </div>
      </div>
      <div class="link-card-right">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="64" height="64" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M13 18l6 -6"></path>
          <path d="M13 6l6 6"></path>
        </svg>
      </div>
    </div>
  </a>
</main>

<style>
  .link-card {
    margin-block: var(--space-l);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .link-card-right {
    padding-inline: var(--space-xl);
  }

  .week-day-list {
    display: flex;
    justify-content: space-between;
  }

  .week-day-list span {
    font-size: 2rem;
    margin-inline: 2px;
    margin-block: 0;
    color: var(--c-bodyDimmed);
  }

  span.active-week-day {
    color: var(--c-body);
  }
  
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    width: 100%;
    gap: 1rem;
  }

  .kpi-grid > * {
    width: 100%;
  }

  .kpi-grid .date-selection {
    grid-column: 1 / 4;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
    gap: 1rem;
  }

  .kpi-grid .progress {
    grid-column: 2 / 4;
  }

  .kpi-grid .week {
    grid-column: 1 / 2;
  }

  .kpi-grid .days-passed {
    grid-column: 1 / 3;
  }

  .kpi-grid .total-days {
    grid-column: 3 / 4;
  }

  .kpi-grid .soon-weekend {
    grid-column: 1 / 4;
  }
</style>