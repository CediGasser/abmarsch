<script lang="ts">
  import '$lib/assets/reset.css'
  import '$lib/assets/global.css'

  import { locales, locale, t } from '$lib/i18n'

  export let data

  locale.set(data.locale)
</script>

<slot />

<footer>
  <div>
    <p><a href="https://github.com/CediGasser/abmarsch">Code on GitHub</a></p>
    <p>&copy; {new Date().getFullYear()} by Wm Gasser</p>
  </div>
  <select bind:value={$locale}>
    {#each locales as l}
      <option value={l}>{l}</option>
    {/each}
  </select>
  <ul class="footer-links">
    <li><a href="/contact">{$t('general.link-contact')}</a></li>
    <li><a href="/privacy">{$t('general.link-privacy')}</a></li>
  </ul>
</footer>

<style>
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
    top: 100dvh;
  }

  footer .footer-links {
    list-style: none;
  }
</style>
