<script lang="ts">
  import RankCard from "$lib/components/RankCard.svelte";

  let ranks = [
    {
      name: 'rank-rekrut',
      src: '/rank/rekrut.png',
      place: 0
    },
    {
      name: 'rank-soldat',
      src: '/rank/soldat.png',
      place: 1
    },
    {
      name: 'rank-gefreiter',
      src: '/rank/gefreiter.png',
      place: 2
    },
    {
      name: 'rank-obergefreiter',
      src: '/rank/obergefreiter.png',
      place: 3
    },
    {
      name: 'rank-korporal',
      src: '/rank/korporal.png',
      place: 4
    },
    {
      name: 'rank-wachtmeister',
      src: '/rank/wachtmeister.png',
      place: 5
    },
    {
      name: 'rank-oberwachtmeister',
      src: '/rank/oberwachtmeister.png',
      place: 6
    },
    {
      name: 'rank-feldweibel',
      src: '/rank/feldweibel.png',
      place: 7
    },
    {
      name: 'rank-fourier',
      src: '/rank/fourier.png',
      place: 8
    },
    {
      name: 'rank-hauptfeldweibel',
      src: '/rank/hauptfeldweibel.png',
      place: 9
    },
    {
      name: 'rank-adjutant-unteroffizier',
      src: '/rank/adjutant-unteroffizier.png',
      place: 10
    },
    {
      name: 'rank-stabsadjutant',
      src: '/rank/stabsadjutant.png',
      place: 11
    },
    {
      name: 'rank-hauptadjutant',
      src: '/rank/hauptadjutant.png',
      place: 12
    },
    {
      name: 'rank-chefadjutant',
      src: '/rank/chefadjutant.png',
      place: 13
    },
    {
      name: 'rank-leutnant',
      src: '/rank/leutnant.png',
      place: 14
    },
    {
      name: 'rank-oberleutnant',
      src: '/rank/oberleutnant.png',
      place: 15
    },
    {
      name: 'rank-hauptmann',
      src: '/rank/hauptmann.png',
      place: 16
    },
    {
      name: 'rank-major',
      src: '/rank/major.png',
      place: 17
    },
    {
      name: 'rank-oberstleutnant',
      src: '/rank/oberstleutnant.png',
      place: 18
    },
    {
      name: 'rank-oberst',
      src: '/rank/oberst.png',
      place: 19
    },
    {
      name: 'rank-fachoffizier',
      src: '/rank/fachoffizier.png',
      place: 20
    },
    {
      name: 'rank-brigadier',
      src: '/rank/brigadier.png',
      place: 21
    },
    {
      name: 'rank-graddivisionaer',
      src: '/rank/graddivisionaer.png',
      place: 22
    },
    {
      name: 'rank-gradkorpskommandant',
      src: '/rank/gradkorpskommandant.png',
      place: 23
    },
    {
      name: 'rank-general',
      src: '/rank/general.png',
      place: 24
    },
  ]
</script>

<main>
  <div class="ranks">
    {#each ranks as { name, src }}
      <RankCard {name} {src} />
    {/each}
  </div>
</main>

<style>
  .ranks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>