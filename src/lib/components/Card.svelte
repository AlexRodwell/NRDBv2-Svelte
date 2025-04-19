<script lang="ts">
	import { image } from '$lib/api';
	import type { Card } from '$lib/types';
	import Influence from './Influence.svelte';

	interface Props {
		data: Card;
		quantity?: number;
		details?: boolean;
		stacked?: boolean;
		influence?: boolean;
	}

	let {
		data,
		quantity = data.attributes?.deck_limit || 0,
		details = true,
		stacked = false,
		influence = true
	}: Props = $props();

	let id = $state<string>(data.id);

	switch (data.type) {
		case 'printings':
			id = data.attributes.card_id;
			break;
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

<!-- style="view-transition-name: card" -->

<!-- {#snippet image()}
	<img
		src={image(data.attributes.printing_ids[0])}
		alt={data.attributes.title}
		class="absolute inset-0 h-full w-full object-cover"
	/>
{/snippet} -->

<a class="card" href={`/cards/${id}`}>
	<div class="relative aspect-[6.3/8.8]">
		{#if data.attributes?.printing_ids?.[0]}
			<!-- {@render image()} -->
			<img
				src={image(data.attributes.printing_ids[0])}
				alt={data.attributes.title}
				class="absolute inset-0 h-full w-full object-cover rounded-lg"
			/>
			{#if stacked && quantity - 1 > 0}
				{#each Array(quantity - 1) as _, i}
					<img
						src={image(data.attributes.printing_ids[0])}
						alt={data.attributes.title}
						class="absolute inset-0 h-full w-full object-cover rounded-md"
						aria-hidden="true"
					/>
				{/each}
			{/if}
		{/if}
	</div>
	{#if details}
		<div>
			<p>
				{#if quantity >= 1}
					{quantity}x
				{/if}
				{data.attributes.title}
				{#if influence}
					<Influence
						value={data.attributes.influence_cost}
						faction={data.attributes.faction_id}
						text={false}
					/>
				{/if}
			</p>
		</div>
	{/if}
</a>
