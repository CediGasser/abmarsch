<script lang="ts">
  import { daysTotal, daysPassed } from "$lib/stores/Dates";
</script>

<div>
  <h2>{$daysPassed} / {$daysTotal}</h2>
  <h3>Täg im Militär</h3>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>