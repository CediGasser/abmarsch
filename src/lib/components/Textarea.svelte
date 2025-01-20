<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
  // TODO: Migration task, fix $$props
  export let value = ''
  export let placeholder = ''
  export let rows = 4
</script>

<textarea {...$$props} bind:value {placeholder} {rows} />

<style>
  textarea {
    width: 100%;
    padding: var(--space-s);
    margin: var(--space-s) 0;
    border: 1px solid var(--c-border);
    border-radius: var(--radius);
    font-size: var(--text-s);
    padding: 1.5rem;
  }
</style>
