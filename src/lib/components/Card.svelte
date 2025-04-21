<script lang="ts">
	import { image } from '$lib/api';
	import type { Card, Printing } from '$lib/types';
	import Influence from './Influence.svelte';

	interface Props {
		data: Card | Printing;
		quantity?: number;
		details?: boolean;
		stacked?: boolean;
		influence?: boolean;
		set?: boolean;
	}

	let {
		data,
		quantity = data.attributes?.deck_limit || 0,
		details = true,
		stacked = false,
		influence = true,
		set = false
	}: Props = $props();

	let id = $state<string>(data.id);

	switch (data.type) {
		case 'factions':
			id = data.attributes.faction_id;
			break;
		case 'sets':
			id = data.attributes.set_id;
			break;
		case 'formats':
			id = data.attributes.format_id;
			break;
		default:
			id = data.id;
	}
</script>

{#snippet inner(image_id: string)}
	<div class="relative aspect-[6.3/8.8]">
		{#if data.attributes?.printing_ids?.[0]}
			<!-- {@render image()} -->
			<img
				src={image(image_id)}
				alt={data.attributes.title}
				class="absolute inset-0 h-full w-full object-cover rounded-lg"
			/>
			{#if stacked && quantity - 1 > 0}
				{#each Array(quantity - 1) as _, i}
					<img
						src={image(image_id)}
						alt={data.attributes.title}
						class="absolute inset-0 h-full w-full object-cover rounded-lg"
						aria-hidden="true"
					/>
				{/each}
			{/if}
		{/if}
	</div>
	{#if details}
		<div class="grid gap-2 content-start">
			<p>
				{#if quantity >= 1}
					{quantity}x
				{/if}
				{data.attributes.title}
			</p>
			{#if set}
				<p class="leading-1">
					<span class="text-xs opacity-60">
						{data.attributes.card_cycle_names[0]}
					</span>
				</p>
			{/if}
			{#if influence}
				<Influence
					value={data.attributes.influence_cost}
					faction={data.attributes.faction_id}
					text={false}
				/>
			{/if}
		</div>
	{/if}
{/snippet}

{#if data.type === 'printings'}
	<div>
		{@render inner(data.id)}
	</div>
{:else}
	<a class="card" href={`/cards/${id}`}>
		{@render inner(data.attributes.printing_ids[0])}
	</a>
{/if}
