<script lang="ts">
  import DateInput from '$lib/components/DateInput.svelte'
  import { tweened } from 'svelte/motion';
  import { expoOut } from 'svelte/easing';

  import { startDate, endDate, daysTotal, daysPassed } from '$lib/stores/Dates'
  import StatusCard from '$lib/components/StatusCard.svelte'

  $: percentage = Math.min(Math.round($daysPassed / $daysTotal * 100), 100)

  let weekDay = new Date().getDay()
  let weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  let weekDayTweened = tweened(0, {
    delay: 3600,
    duration: 2000,
    easing: expoOut
  })

  $: weekDayTweened.set(weekDay)
  
  let progressMessages = [
    'Es würd no luschtig!',
    'So langsam isch mä dinnä',
    'D hälfti isch scho verbii!',
    'Fascht gschafft!'
  ]

  let weekDayMessages = [
    'Es isch scho wider Mäntig...',
    'Immerhin scho ei Tag verbii!',
    'Mittwuch gids Uusgang!',
    'Nur no zwei Täg!',
    'Es isch wider Friitig!',
    'Wucheend!',
    'Und das ganze noch ein mal...'
  ]
</script>

<main>
  <header>
    <h1>Figged sie de Bode!</h1>
    <span hidden>von <DateInput bind:value={$startDate} /> bis <DateInput bind:value={$endDate} /></span>
  </header>
  <div class="kpi-grid">
    <div class="week">
      <StatusCard 
        title="Wuchä" 
        value={Math.ceil($daysPassed / 7)} />
    </div>
    <div class="progress">
      <StatusCard 
        title="Fortschritt" 
        value={percentage} 
        unit="%"
        text={progressMessages[Math.round(percentage / 25)]}
        delay={800} />
    </div>
    <div class="days-passed">
      <StatusCard 
        title="Scho verbii" 
        value={$daysPassed} 
        unit=" Täg"
        delay={1600} 
        text="Hie sind alli Täg mit iberächnet, au s Wucheend." />
    </div>

    <div class="total-days">
      <StatusCard 
        title="Total" 
        value={$daysTotal} 
        text="Isch au irgendwenn verbii..."
        delay={2400} />
    </div>
    <div class="card soon-weekend">
      <h4>Glii Wuchäend?</h4>
      <span class="week-day-list">
        {#each weekDays as day, i}
          <span class="inline" class:active-week-day={$weekDayTweened <= i}>{day}</span>
        {/each}
      </span>
      <p>{weekDayMessages[weekDay - 1]}</p>
    </div>
  </div>
</main>

<style>
  .week-day-list {
    display: flex;
    justify-content: space-between;
  }

  .week-day-list span {
    font-size: 2rem;
    margin-inline: 2px;
    margin-block: 0;
  }

  .active-week-day {
    color: var(--c-bodyDimmed);
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