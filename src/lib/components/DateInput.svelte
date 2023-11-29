<script lang="ts">
  import { onMount } from 'svelte'

  export let value: Date = new Date()
  export let id: string | undefined = undefined

  let input: HTMLInputElement

  const dateChange = () => {
    value = new Date(input.valueAsNumber)
  }

  onMount(() => {
    input.valueAsNumber = value.getTime()
  })
</script>

<input {id} type="date" bind:this={input} on:change={dateChange} />

<style>
  input {
    display: inline;
    color: var(--c-body);
    padding-inline: var(--textFrameX);
    padding-block: var(--textFrameY);
    font-size: 1.5rem;
    background-color: var(--c-overlay);
    border: var(--fieldBorderWidth);
    border-radius: var(--radius);
  }
</style>
