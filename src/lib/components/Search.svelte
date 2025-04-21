<script lang="ts">
    import Fuse from 'fuse.js'
	import { page } from '$app/state';
	import type { Card as TCard } from "$lib/types";
	import { onMount } from "svelte";
	import { locale } from "$lib/i18n";
    import Icon from "$lib/components/icons/Icon.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";

    // While Fuse is great, we could consider a server side API to process search requests, as it's all being done client side at the moment (might be more performative via API).
	const fuse = new Fuse(page.data.cards, {
		threshold: 0.3,
		keys: [
			"id",
			"type",
			"attributes.title"
		]
	});

	let search_params = $state<string>('');

	let results = $state<Partial<TCard>[]>([]);
	let results_display = $state<boolean>(false);
	let results_message = $state<string | null>(null);

	let search_box: HTMLElement;

	onMount(() => {
		search_box.focus();
		search_box.parentElement?.style.setProperty('--offset', `${search_box.parentElement.offsetHeight}px`);
	})

	$effect(() => {
		if (page.url) {
			results_display = false;
		}
	});

	const search = (str: string) => {
		const fuse_result: { item: TCard }[] = fuse.search(str);
		results = fuse_result.map((result) => result.item);
		results_display = true;
		results_message = results.length === 0 ? 'No results found' : null;
	}
</script>

<div class={['relative border border-border', results_display ? 'rounded-t-xl border-b-transparent' : 'rounded-xl']}>
    <div class="grid grid-cols-[1fr_auto] items-center p-1">
        <Icon name="subroutine" size="sm" class="!absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
            bind:this={search_box} 
            class="w-full pl-10 border-none"
            type="search" 
            placeholder="Search..." 
            oninput={(e) => {
                search(e.target.value)
            }} 
            onfocus={() => {
                if (results.length > 0) {
                    results_display = true;
                }
            }}
            onfocusout={() => {
                // console.log('Focus out...');
                // results_display = false;
                // results_message = null;
            }}
        />
        <Button href="/search{search_params}" class="!rounded-l-0">Search</Button>
    </div>

    {#if results_display}
        <div class="absolute top-(--offset) left-1/2 -translate-x-1/2 right-0 w-[calc(100%+2px)] h-auto bg-foreground border border-border border-t-transparent rounded-b-xl p-8 grid gap-6 max-h-[50vh] overflow-x-auto z-50">
            {#if results.length === 0}
                <div class="flex flex-col justify-center items-center gap-2">
                    <Icon name="interrupt" size="lg" />
                    <p>{results_message}</p>
                </div>
            {:else}
                <div class="grid grid-cols-5 gap-4">
                    {#each results as result}
                        <Card data={result} quantity={0} influence={false} set={true} />
                        <!-- <a href="/cards/{result.id}" class="border-b border-b-border pb-4 flex flex-row gap-8">
                            <p>{result.attributes.title} ({result.attributes.card_cycle_names[0]})</p>
                            <p class="icon-label">
                                <Icon name={result.attributes?.card_type_id} size="sm" />
                                {locale(result.attributes?.card_type_id)}
                            </p>
                            <p class="icon-label">
                                <span data-faction-theme={result.attributes?.faction_id}>
                                    <Icon name={result.attributes?.faction_id} size="sm" />
                                </span>
                                {locale(result.attributes?.faction_id)}
                            </p>
                        </a> -->
                        <!-- <Card data={result} quantity={0} influence={false} /> -->
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>