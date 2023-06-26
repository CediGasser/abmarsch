<script lang="ts">
  import { t } from "$lib/i18n";
  import RankCard from "$lib/components/RankCard.svelte";
  import { send, receive } from "$lib/assets/Crossfade";

  let ranks = [
    {
      name: 'ranks.rekrut',
      src: '/rank/rekrut.png',
      place: 0
    },
    {
      name: 'ranks.soldat',
      src: '/rank/soldat.png',
      place: 1
    },
    {
      name: 'ranks.gefreiter',
      src: '/rank/gefreiter.png',
      place: 2
    },
    {
      name: 'ranks.obergefreiter',
      src: '/rank/obergefreiter.png',
      place: 3
    },
    {
      name: 'ranks.korporal',
      src: '/rank/korporal.png',
      place: 4
    },
    {
      name: 'ranks.wachtmeister',
      src: '/rank/wachtmeister.png',
      place: 5
    },
    {
      name: 'ranks.oberwachtmeister',
      src: '/rank/oberwachtmeister.png',
      place: 6
    },
    {
      name: 'ranks.feldweibel',
      src: '/rank/feldweibel.png',
      place: 7
    },
    {
      name: 'ranks.fourier',
      src: '/rank/fourier.png',
      place: 8
    },
    {
      name: 'ranks.hauptfeldweibel',
      src: '/rank/hauptfeldweibel.png',
      place: 9
    },
    {
      name: 'ranks.adjutant-unteroffizier',
      src: '/rank/adjutant-unteroffizier.png',
      place: 10
    },
    {
      name: 'ranks.stabsadjutant',
      src: '/rank/stabsadjutant.png',
      place: 11
    },
    {
      name: 'ranks.hauptadjutant',
      src: '/rank/hauptadjutant.png',
      place: 12
    },
    {
      name: 'ranks.chefadjutant',
      src: '/rank/chefadjutant.png',
      place: 13
    },
    {
      name: 'ranks.leutnant',
      src: '/rank/leutnant.png',
      place: 14
    },
    {
      name: 'ranks.oberleutnant',
      src: '/rank/oberleutnant.png',
      place: 15
    },
    {
      name: 'ranks.hauptmann',
      src: '/rank/hauptmann.png',
      place: 16
    },
    {
      name: 'ranks.major',
      src: '/rank/major.png',
      place: 17
    },
    {
      name: 'ranks.oberstleutnant',
      src: '/rank/oberstleutnant.png',
      place: 18
    },
    {
      name: 'ranks.oberst',
      src: '/rank/oberst.png',
      place: 19
    },
    {
      name: 'ranks.fachoffizier',
      src: '/rank/fachoffizier.png',
      place: 20
    },
    {
      name: 'ranks.brigadier',
      src: '/rank/brigadier.png',
      place: 21
    },
    {
      name: 'ranks.graddivisionaer',
      src: '/rank/graddivisionaer.png',
      place: 22
    },
    {
      name: 'ranks.gradkorpskommandant',
      src: '/rank/gradkorpskommandant.png',
      place: 23
    },
    {
      name: 'ranks.general',
      src: '/rank/general.png',
      place: 24
    },
  ]
</script>

<main>
  <header>
    <a href="/">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="48" height="48" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l14 0"></path>
        <path d="M5 12l6 6"></path>
        <path d="M5 12l6 -6"></path>
      </svg>
    </a>
    <div
      out:send|global={{ key: 'a' }} 
      in:receive|global={{ key: 'a' }}>
      <h1>{$t('ranks.title')}</h1>
    </div>
  </header>
  <div class="ranks">
    {#each ranks as { name, src }}
      <div>   
        <RankCard name={$t(name)} {src} />
      </div>
    {/each}
  </div>
</main>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
    gap: var(--space-l);
  }

  .ranks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .ranks > div {
    width: 70vw;
  }
</style>