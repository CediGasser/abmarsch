<script lang="ts">
  import Days from '$lib/components/Days.svelte'
  import Progress from '$lib/components/Progress.svelte'
</script>

<h1>Figged sie de bode!!!</h1>

<div class="horizontal-scroll-container">
  <div class="horizontal-scroll-item">
    <Days />
  </div>
  <div class="horizontal-scroll-item">
    <Progress />
  </div>
</div>

<style>
  h1 {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    margin-block: 1rem;
  }

  .horizontal-scroll-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 1rem;
    scroll-snap-type: x mandatory;
  }

  .horizontal-scroll-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    flex: 0 0 auto;
    margin: 0 1rem;
    width: 100%;
    scroll-snap-align: center;
  }
</style>