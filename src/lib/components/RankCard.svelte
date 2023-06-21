<script lang="ts">
  export let src = 'favicon.png'
  export let name = 'Rekrut'
  export let flipped = false

  const handleClick = (e: any) => {
    if (e.key && e.key !== 'Enter') return
    flipped = !flipped
  }
</script>

<div class="rank-card" on:click={handleClick} on:keyup={handleClick} class:flipped>
  <img {src} alt={name} />
  <div class="result">
    <h4>{name}</h4>
  </div>
</div>

<style>
  .rank-card {
    transition: transform 0.5s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
    width: 100%;
  }

  .rank-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    backface-visibility: hidden;
    background-color: var(--c-overlay);
    border-radius: var(--radius);
    padding: var(--space-l);
  }

  .rank-card.flipped {
    transform: rotateY(180deg);
  }

  .rank-card .result {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--c-overlay);
    border-radius: var(--radius);
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }

  .rank-card .result h4 {
    margin: 0;
    color: var(--c-body);
    font-size: 1.5rem;
    text-align: center;
  }
</style>