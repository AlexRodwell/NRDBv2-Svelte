<script lang="ts">
	import { image } from '$lib/api';
	import Influence from './Influence.svelte';

	interface Props {
		card: any;
		quantity?: number;
		details?: boolean;
		stacked?: boolean;
		influence?: boolean;
	}

	let {
		card,
		quantity = card.attributes.deck_limit,
		details = true,
		stacked = false,
		influence = true
	}: Props = $props();

	let id = $state<string>(card.id);

	switch (card.type) {
		case 'printings':
			id = card.attributes.card_id;
			break;
		case 'factions':
			id = card.attributes.faction_id;
			break;
		case 'sets':
			id = card.attributes.set_id;
			break;
		case 'formats':
			id = card.attributes.format_id;
			break;
		default:
			id = card.id;
	}
</script>

<!-- style="view-transition-name: card" -->

<!-- {#snippet image()}
	<img
		src={image(card.attributes.printing_ids[0])}
		alt={card.attributes.title}
		class="absolute inset-0 h-full w-full object-cover"
	/>
{/snippet} -->

<a class="card" href={`/cards/${id}`}>
	<div class="relative aspect-[6.3/8.8]">
		{#if card.attributes?.printing_ids?.[0]}
			<!-- {@render image()} -->
			<img
				src={image(card.attributes.printing_ids[0])}
				alt={card.attributes.title}
				class="absolute inset-0 h-full w-full object-cover rounded-lg"
			/>
			{#if stacked && quantity - 1 > 0}
				{#each Array(quantity - 1) as _, i}
					<img
						src={image(card.attributes.printing_ids[0])}
						alt={card.attributes.title}
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
				{card.attributes.title}
				{#if influence}
					<Influence
						value={card.attributes.influence_cost}
						faction={card.attributes.faction_id}
						text={false}
					/>
				{/if}
			</p>
		</div>
	{/if}
</a>
