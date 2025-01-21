<script lang="ts">
  import { t } from '$lib/i18n'

  import RankCard from '$lib/components/RankCard.svelte'
  import Seo from '$lib/components/Seo.svelte'

  let ranks = [
    {
      name: 'ranks.rekrut',
      src: '/rank/rekrut.webp',
      place: 0,
      lazyLoad: false,
    },
    {
      name: 'ranks.soldat',
      src: '/rank/soldat.webp',
      place: 1,
      lazyLoad: false,
    },
    {
      name: 'ranks.gefreiter',
      src: '/rank/gefreiter.webp ',
      place: 2,
    },
    {
      name: 'ranks.obergefreiter',
      src: '/rank/obergefreiter.webp ',
      place: 3,
    },
    {
      name: 'ranks.korporal',
      src: '/rank/korporal.webp',
      place: 4,
    },
    {
      name: 'ranks.wachtmeister',
      src: '/rank/wachtmeister.webp',
      place: 5,
    },
    {
      name: 'ranks.oberwachtmeister',
      src: '/rank/oberwachtmeister.webp',
      place: 6,
    },
    {
      name: 'ranks.feldweibel',
      src: '/rank/feldweibel.webp',
      place: 7,
    },
    {
      name: 'ranks.fourier',
      src: '/rank/fourier.webp ',
      place: 8,
    },
    {
      name: 'ranks.hauptfeldweibel',
      src: '/rank/hauptfeldweibel.webp ',
      place: 9,
    },
    {
      name: 'ranks.adjutant-unteroffizier',
      src: '/rank/adjutant-unteroffizier.webp',
      place: 10,
    },
    {
      name: 'ranks.stabsadjutant',
      src: '/rank/stabsadjutant.webp ',
      place: 11,
    },
    {
      name: 'ranks.hauptadjutant',
      src: '/rank/hauptadjutant.webp ',
      place: 12,
    },
    {
      name: 'ranks.chefadjutant',
      src: '/rank/chefadjutant.webp',
      place: 13,
    },
    {
      name: 'ranks.leutnant',
      src: '/rank/leutnant.webp',
      place: 14,
    },
    {
      name: 'ranks.oberleutnant',
      src: '/rank/oberleutnant.webp',
      place: 15,
    },
    {
      name: 'ranks.hauptmann',
      src: '/rank/hauptmann.webp ',
      place: 16,
    },
    {
      name: 'ranks.major',
      src: '/rank/major.webp ',
      place: 17,
    },
    {
      name: 'ranks.oberstleutnant',
      src: '/rank/oberstleutnant.webp',
      place: 18,
    },
    {
      name: 'ranks.oberst',
      src: '/rank/oberst.webp',
      place: 19,
    },
    {
      name: 'ranks.fachoffizier',
      src: '/rank/fachoffizier.webp',
      place: 20,
    },
    {
      name: 'ranks.brigadier',
      src: '/rank/brigadier.webp ',
      place: 21,
    },
    {
      name: 'ranks.graddivisionaer',
      src: '/rank/graddivisionaer.webp ',
      place: 22,
    },
    {
      name: 'ranks.gradkorpskommandant',
      src: '/rank/korpskommandant.webp ',
      place: 23,
    },
    {
      name: 'ranks.general',
      src: '/rank/general.webp ',
      place: 24,
    },
  ]
</script>

<Seo
  title={$t('seo.title-ranks')}
  description={$t('seo.description-ranks')}
  keywords={$t('seo.keywords-ranks')}
  canonical="https://abmarsch.ch/ranks"
/>

<main>
  <header>
    <a href="/" aria-label={$t('home.title')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label={$t('home.title')}
        class="icon icon-tabler icon-tabler-arrow-left"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 12l14 0"></path>
        <path d="M5 12l6 6"></path>
        <path d="M5 12l6 -6"></path>
      </svg>
    </a>
    <div>
      <h1>{$t('ranks.title')}</h1>
    </div>
  </header>
  <div class="ranks">
    {#each ranks as { name, src, lazyLoad }}
      <div>
        <RankCard name={$t(name)} {src} {lazyLoad} />
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
    max-width: 300px;
  }
</style>
