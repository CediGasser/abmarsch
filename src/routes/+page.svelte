<script lang="ts">
  import Days from '$lib/components/Days.svelte'
  import Progress from '$lib/components/Progress.svelte'
  import Calendar from '$lib/components/Calendar.svelte'

  import SwipeIndicator from '$lib/components/SwipeIndicator.svelte';
  let daysDiv: HTMLElement
</script>

<main>
  <h1>Figged sie de bode!!!</h1>

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
  </div>
  <SwipeIndicator observe={daysDiv} />
</main>

<style>
  h1 {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    padding-block: 1rem;
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