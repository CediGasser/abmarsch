<script lang="ts">
  import Textarea from '$lib/components/Textarea.svelte'
  import { t } from '$lib/i18n'
</script>

<main>
  <h1>{$t('contact.title')}</h1>
  <p>{$t('contact.text')}</p>

  <form method="POST">
    <label for="message">{$t('contact.message')}:</label>
    <Textarea placeholder={$t('contact.message-placeholder')} id="message" name="message" required
    ></Textarea>
    <input
      type="text"
      name="name"
      placeholder="name"
      style="display: none;"
      aria-hidden="true"
      autocomplete="off"
    />

    <input type="submit" value={$t('contact.submit')} />
  </form>
</main>

<style>
  main {
    max-width: 800px;
    margin-inline: auto;
  }

  h1 {
    margin-top: 4rem;
  }

  form {
    display: grid;
    gap: var(--space-s);
    margin-top: 3rem;
  }

  label {
    font-weight: bold;
  }

  input[type='submit'] {
    padding: var(--space-s);
    background-color: var(--c-overlay1);
    color: var(--c-white);
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
  }

  input[type='submit']:hover {
    background-color: var(--c-buttonBg);
  }
</style>
