<script lang="ts">
  import { DateInput } from 'date-picker-svelte'
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

<DateInput class="date-input" format="yyyy-MM-dd" bind:value />
