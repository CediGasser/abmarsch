<script lang="ts">
  import Days from '$lib/components/Days.svelte'
  import Progress from '$lib/components/Progress.svelte'
  import Calendar from '$lib/components/Calendar.svelte'
  import DateInput from '$lib/components/DateInput.svelte'
  import SwipeIndicator from '$lib/components/SwipeIndicator.svelte';

  import { startDate, endDate } from '$lib/stores/Dates';

  let daysDiv: HTMLElement

  const swipeRight = () => {
    daysDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
</script>

<main>
  <h1>Figged sie de bode!!!</h1>
  <span>Vom <DateInput bind:value={$startDate} /> bis zum <DateInput bind:value={$endDate}/></span>
  <div class="horizontal-scroll-container">
    <div class="horizontal-scroll-item">
      <Calendar />
    </div>
    <div bind:this={daysDiv} class="horizontal-scroll-item">
      <Days />
    </div>
    <div class="horizontal-scroll-item">
      <Progress />
    </div>
    <div class="horizontal-scroll-item">
      <h2>Dankä füre Bsuech</h2>
      <pre>Code wär hiä: <a href="https://github.com/cedigasser/bode-figge">GitHub</a></pre>
    </div>
  </div>
  <SwipeIndicator observe={daysDiv} on:press={swipeRight} />
</main>

<style>
  @media (min-width: 600px) {
    .horizontal-scroll-container {
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-snap-type: y mandatory;
    }
  }

  h1 {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    padding-block: 1rem;
    flex: 0 1 auto;
  }

  span {
    font-size: 0.75rem;
    text-align: center;
    padding-block: .5rem;
    flex: 0 1 auto;
  }

  main {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .horizontal-scroll-container {
    display: flex;
    height: 100%;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 1rem;
    scroll-snap-type: x mandatory;
    flex: 1 1 auto;
  }

  .horizontal-scroll-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 0 0 auto;
    margin: 0 1rem;
    width: 100%;
    scroll-snap-align: center;
  }
</style>