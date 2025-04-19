<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import FormatText from '$lib/components/FormatText.svelte';
	import Header from '$lib/components/Header.svelte';
	import Influence from '$lib/components/Influence.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import type { Card as TCard, Printing } from '$lib/types';
	import { locale } from '$lib/i18n';
	import { format_date } from '$lib/utils';
	import Box from '$lib/components/Box.svelte';
	import { image } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Ruling from '$lib/components/Ruling.svelte';
	import Review from '$lib/components/Review.svelte';

	interface Props {
		data: {
			card: TCard;
			printings: Printing[];
			rulings: {}[];
		};
	}

	let { data }: Props = $props();

	const { card, printings, rulings, reviews, previous, next } = data;

	// let card = $state<TCard>(data.card);
	// let printings = $state<Printing[]>(data.printings);
</script>

<Header category="Card" title={card.attributes.title} inline={false}>
	<!-- {#snippet subtitle()}
		<div class="icon-label">
			<Icon name={card.attributes.card_type_id} />
			{card.attributes.card_type_id}
		</div>
	{/snippet} -->
	{#snippet actions()}
		{#if previous}
			<Button href={`/cards/${previous}`} variant="outline">Previous card</Button>
		{/if}
		{#if next}
			<Button href={`/cards/${next}`} variant="outline">Next card</Button>
		{/if}
	{/snippet}}
</Header>

<div class="background" aria-hidden="true">
	<!-- TODO: alt value -->
	<img src={image(card.attributes.printing_ids[0])} alt="a" />
</div>

<Wrapper class="grid gap-12">
	<section class="grid grid-cols-[1fr_1.5fr_1.5fr] gap-12">
		<div>
			<Card data={card} details={false} />

			{#if printings.length > 1}
				<h2>Faces ({printings[0].attributes.num_extra_faces})</h2>
				<div class="grid grid-cols-4">
					{#each printings[0].attributes.faces as face}
						{face.flavor}
						<!-- TODO: alt value -->
						<img src={face.images.nrdb_classic.large} alt="a" />
					{/each}
				</div>
			{/if}
		</div>

		<Box>
			<table class="w-full">
				<tbody>
					<tr>
						<td>Type</td>
						<td>
							<span class="icon-label">
								<Icon name={card.attributes.card_type_id} size="sm" />
								{locale(card.attributes.card_type_id)}
							</span>
						</td>
					</tr>
					<tr>
						<td>Subtypes</td>
						<td>{card.attributes.card_subtype_ids}</td>
					</tr>
					<tr>
						<td>Faction</td>
						<td>
							<a href="/faction/{card.attributes.faction_id}" title={locale(card.attributes.faction_id)} class="icon-label">
								<span data-faction-theme={card.attributes.faction_id}>
									<Icon name={card.attributes.faction_id} />
								</span>
								{locale(card.attributes.faction_id)}
							</a>
						</td>
					</tr>
					<tr>
						<td>Influence</td>
						<td aria-label="Influence Cost: {card.attributes.influence_cost}">
							<Influence
								value={card.attributes.influence_cost}
								faction={card.attributes.faction_id}
							/>
						</td>
					</tr>
					<tr>
						<td>Cost</td>
						<td>
							<span class="icon-label">
								<Icon name="credit" size="sm" />
								{card.attributes.cost}
							</span>
						</td>
					</tr>
					{#if card.attributes.trash_cost}
						<tr>
							<td>Trash</td>
							<td>
								<span class="icon-label">
									<Icon name="trash" size="sm" />
									{card.attributes.trash_cost}
								</span>
							</td>
						</tr>
					{/if}
				</tbody>
			</table>

			<div data-faction-theme={card.attributes.faction_id} class="pl-4 border-l border-l-(--theme)">
				<FormatText text={card.attributes.text} />
			</div>

			{#if printings[0].attributes.flavor}
				<p>Flavor: {printings[0].attributes.flavor}</p>
			{/if}

			<!-- {#if printings.length > 1}
				<h2>Printings</h2>
				{#each printings as printing}
					<div class="max-w-32">
						<Card data={printing} />
					</div>
				{/each}
			{/if} -->

			<p>
				<a href="/illustrators/{printings[0].attributes.illustrator_ids[0]}" class="underline">
					Illustrated by {printings[0].attributes.display_illustrators}
				</a>
			</p>

			<p>
				<a href="/decklists/find?cards[]={card.id}" class="underline">
					Decklists with this card
				</a>
			</p>
		</Box>

		<Box>
			<p>Set/cycle</p>
			<p>Legality</p>
			<p>Printings</p>
		</Box>
	</section>

	<section class="grid gap-4">
		{#if rulings.length > 0}
			<h2 class="text-2xl">{locale('rulings')}</h2>
			<div class="grid gap-4">
				{#each rulings as ruling}
					<Ruling data={ruling} />
				{/each}
			</div>
		{:else}
			<p>No rulings yet for this card.</p>
		{/if}
	</section>

	<section class="grid gap-4">
		<h2 class="text-2xl">{locale('reviews')}</h2>
		<div class="grid gap-4">
			{#each reviews as review}
				<Review data={review} />
			{/each}
		</div>
	</section>
</Wrapper>
