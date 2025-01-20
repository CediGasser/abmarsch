<script lang="ts">
  import { onMount } from 'svelte'
  // TODO: Migration task, fix input type

  interface Props {
    value?: Date
    id?: string | undefined
  }

  let { value = $bindable(new Date()), id = undefined }: Props = $props()

  let input: HTMLInputElement = $state()

  const dateChange = () => {
    value = new Date(input.valueAsNumber)
  }

  onMount(() => {
    input.valueAsNumber = value.getTime()
  })
</script>

<input {id} type="date" bind:this={input} onchange={dateChange} />

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
