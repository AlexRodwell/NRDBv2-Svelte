<script lang="ts">
	import Language from "$lib/components/Language.svelte";
	import Theme from "$lib/components/Theme.svelte";
	import Button from "$lib/components/Button.svelte";
	// import Card from "$lib/components/Card.svelte";
	import Icon from "$lib/components/icons/Icon.svelte";
	import Fuse from 'fuse.js'
	import { page } from '$app/state';
	import type { Card as TCard } from "$lib/types";
	import { onMount } from "svelte";
	import { locales } from "$lib/i18n";

	const navigation = [
		{
			path: '/decks',
			label: 'My Decks'
		},
		{
			path: '/decklists',
			label: 'Decklists'
		},
		{
			path: '/sets',
			label: 'Sets'
		},
		{
			path: '/factions',
			label: 'Factions'
		},
		{
			path: '/formats',
			label: 'Formats'
		},
		{
			path: '/bans',
			label: 'Bans'
		},
		{
			path: '/rotation',
			label: 'Rotation'
		},
		{
			path: '/reviews',
			label: 'Reviews'
		},
		{
			path: '/rulings',
			label: 'Rulings'
		},
		{
			path: '/illustrators',
			label: 'Illustrators'
		}
	];

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
		search_box.parentElement?.style.setProperty('--height', `${search_box.parentElement.offsetHeight}px`);
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

<nav id="navigation" class="bg-foreground border-b border-b-border z-50">
	<div class="container grid grid-cols-[1fr_3fr_1fr] gap-8 py-6">
		<div>
			<a href="/">
				NetrunnerDB
			</a>
		</div>
		<div class={["relative grid grid-cols-[1fr_auto] items-center p-1 border border-border", results_display ? 'rounded-t-xl' : 'rounded-xl']}>
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

			{#if results_display}
				<div class="absolute top-(--height) left-1/2 -translate-x-1/2 right-0 w-full h-auto bg-foreground border border-border rounded-b-xl p-8 grid gap-6 max-h-[50vh] overflow-x-auto z-50">
					{#if results.length === 0}
						<p>{results_message}</p>
					{:else}
						{#each results as result}
							<a href="/cards/{result.id}" class="border-b border-b-border pb-4 flex flex-row gap-8">
								<p>{result.attributes.title} ({result.attributes.card_cycle_names[0]})</p>
								<p class="icon-label">
									<Icon name={result.attributes?.card_type_id} size="sm" />
									{locales(result.attributes?.card_type_id)}
								</p>
								<p class="icon-label">
									<span data-faction-theme={result.attributes?.faction_id}>
										<Icon name={result.attributes?.faction_id} size="sm" />
									</span>
									{locales(result.attributes?.faction_id)}
								</p>
							</a>
							<!-- <Card card={result} quantity={0} influence={false} /> -->
						{/each}
					{/if}
				</div>
			{/if}
		</div>
		<div class="flex flex-row justify-end gap-4">
			<Button>Register</Button>
			<Button>Login</Button>
			<Language />
			<Theme />
		</div>
	</div>
	<div class="border-t border-t-border">
		<div class="container py-4">
			<ul class="flex flex-row justify-center gap-8">
				{#each navigation as { path, label }, index}
					<li>
						<a href={path}>{label}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
