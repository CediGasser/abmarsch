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

  const handleClick = (e: any) => {
    if (e.key && e.key !== 'Enter') return
    flipped = !flipped
  }
</script>

<div
  role="button"
  tabindex="0"
  class="rank-card"
  onclick={handleClick}
  onkeyup={handleClick}
  class:flipped
>
  <img loading={lazyLoad || lazyLoad == undefined ? 'lazy' : 'eager'} {src} alt={name} />
  <div class="result">
    <h2>{name}</h2>
  </div>
</div>

<style>
  .rank-card {
    transition: transform 0.5s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;
    width: 100%;
    max-width: 300px;
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
  }

  .rank-card .result h2 {
    margin: 0;
    color: var(--c-body);
    font-size: 1.5rem;
    text-align: center;
    text-wrap: balance;
  }
</style>
