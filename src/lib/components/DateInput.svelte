<script lang="ts">
    import { onMount } from "svelte";

    export let value: Date = new Date()

    let input: HTMLInputElement

    const dateChange = () => {
        value = new Date(input.valueAsNumber)
    }

    onMount(() => {
        input.valueAsNumber = value.getTime()
    })
</script>

<input type="date" bind:this={input} on:change={dateChange} />

<style>
    input {
        display: inline;
        font-size: 1rem;
        padding: 1px;
        border: none;
        background-color: lightgrey;
        border-radius: 8px;
        padding-inline-start: 4px;
    }
</style>