<script lang="ts">
  interface Props {
    src?: string
    name?: string
    flipped?: boolean
    lazyLoad?: boolean
  }

  let {
    src = 'favicon-32x32.png',
    name = 'Rekrut',
    flipped = $bindable(false),
    lazyLoad = true,
  }: Props = $props()

  const handleClick = (e: MouseEvent | KeyboardEvent) => {
    if (e instanceof KeyboardEvent && e.key && e.key !== 'Enter') return
    flipped = !flipped
  }
</script>

<button class="rank-card" onclick={handleClick} onkeyup={handleClick} class:flipped>
  <img
    loading={lazyLoad || lazyLoad == undefined ? 'lazy' : 'eager'}
    {src}
    alt={name}
    draggable="false"
  />
  <div class="result">
    <h2>{name}</h2>
  </div>
</button>

<style>
  .rank-card {
    transition: transform 0.3s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
    width: 100%;
    min-width: 250px;
    height: 100%;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  .rank-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    backface-visibility: hidden;
    background-color: var(--c-overlay1);
    border-radius: var(--radius);
    padding: var(--space-l);
    border: 1px solid var(--c-border);
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
    background: var(--c-overlay1);
    border-radius: var(--radius);
    backface-visibility: hidden;
    transform: rotateY(180deg);
    border: 1px solid var(--c-border);
  }

  .rank-card .result h2 {
    margin: 0;
    color: var(--c-body);
    font-size: 1.5rem;
    text-align: center;
    text-wrap: balance;
  }
</style>
