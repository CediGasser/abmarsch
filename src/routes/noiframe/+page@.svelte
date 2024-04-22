<script lang="ts">
  import { t } from '$lib/i18n'

  let buttonClicked = false

  const handleClick = () => {
    buttonClicked = true
  }
</script>

<main>
  {#if buttonClicked}
    <h1>{$t('noiframe.realtitle')}</h1>
    <a href="https://abmarsch.ch" referrerpolicy="no-referrer" target="_blank">
      abmarsch.ch
    </a>
    <video width="533" height="300" controls data-external="1" autoplay>
      <track kind="captions" />
      <source
        src="https://xn--qei.cedricgasser.com/rickroll.mp4"
        type="video/mp4"
      />
    </video>
  {:else}
    <h1>{$t('noiframe.title')}</h1>
    <button on:click={handleClick}>{$t('noiframe.start')}</button>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    padding: var(--space-xl);
    text-align: center;
  }

  button {
    padding: var(--space-m) var(--space-2xl);
    border-radius: var(--radius);
    border: var(--fieldBorderWidth) solid var(--c-border);
    background-color: var(--c-primary);
    color: var(--c-body);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    background-color: var(--c-overlay);
    transform: scale(1.05);
  }

  a {
    color: var(--c-primary);
    text-decoration: underline;
    font-size: var(--text-xl);
  }
</style>
