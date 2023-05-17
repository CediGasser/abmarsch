<script lang="ts">
  import { daysTotal, daysPassed } from "$lib/stores/Dates";
</script>

<div>
  <label for="army">So viel isch gschafft bis jetzt:</label>
  <progress id="army" value={$daysPassed} max={$daysTotal}> {Math.ceil($daysPassed / $daysTotal)}% </progress>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  label {
    font-size: 1.5rem;
  }

  progress {
    width: 100%;
    height: 1rem;
    margin: 1rem 0;
  }
</style>