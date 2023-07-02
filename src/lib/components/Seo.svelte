<script lang="ts">
    export let title: string;
    export let description: string | undefined = undefined;
    export let keywords: string | undefined = undefined;
    export let canonical: string | undefined = undefined;
    export let type: 'website' | 'article' | 'site' | 'book' | 'profile' = 'site';
    export let image: string = '/social_preview.webp';
    export let themeColor: string | undefined = undefined;
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

    {#if themeColor}
        <meta name="theme-color" content={themeColor} />
    {/if}
</svelte:head>