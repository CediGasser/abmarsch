<script lang="ts">
  interface Props {
    title: string;
    description?: string | undefined;
    keywords?: string | undefined;
    canonical?: string | undefined;
    type?: 'website' | 'article' | 'site' | 'book' | 'profile';
    image?: string;
  }

  let {
    title,
    description = undefined,
    keywords = undefined,
    canonical = undefined,
    type = 'site',
    image = '/social_preview.webp'
  }: Props = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index,follow" />
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if canonical}
    <link rel="canonial" href={canonical} />
  {/if}

  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <meta property="og:title" content={title} />
  {#if description}
    <meta property="og:description" content={description} />
  {/if}
  {#if canonical}
    <meta property="og:url" content={canonical} />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:image" content={image} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  {#if description}
    <meta name="twitter:description" content={description} />
  {/if}
  <meta name="twitter:image" content={image} />
</svelte:head>
