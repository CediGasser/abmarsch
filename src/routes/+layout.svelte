<script lang="ts">
  import '$lib/assets/reset.css'
  import '$lib/assets/global.css'

  import { locales, locale } from '$lib/i18n';

  export let data;

  locale.set(data.locale);
</script>

<slot />

<footer>
  <div>
    <p><a href="https://github.com/CediGasser/bode-figge">Code on GitHub</a></p>
    <p>&copy; {new Date().getFullYear()} by Wm Gasser</p>
  </div>
  <select bind:value={$locale}>
    {#each locales as l}
      <option value={l}>{l}</option>
    {/each}
  </select>
</footer>

<style>
  select {
    background-color: var(--c-overlay);
    color: var(--c-body);
  }

  a {
    color: var(--c-body);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--space-2xl);
    padding: var(--space-l);
    background-color: var(--c-overlay);
    color: var(--c-body);
    font-size: 0.8rem;
  }
</style>