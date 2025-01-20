<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  let { value = '', placeholder = '', rows = 4, ...rest }: HTMLTextareaAttributes = $props()
</script>

<textarea {...rest} bind:value {placeholder} {rows}></textarea>

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
