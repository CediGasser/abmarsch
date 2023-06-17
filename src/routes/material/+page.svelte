<script lang="ts">
  let items = ['Stgw 90', 'Tenue B Hose', 'Gamelle', 'Schutzmasken', 'Schutzbrille', 'GTE mit Taschen'];
</script>

<ul>
  {#each items as item}
    <li>{item}</li>
  {/each}
</ul>