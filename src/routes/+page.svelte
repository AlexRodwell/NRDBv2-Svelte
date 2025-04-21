<script lang="ts">
	import Box from '$lib/components/Box.svelte';
	import Factions from '$lib/components/Factions.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import HeroDecklist from '$lib/components/decklist/Hero.svelte';
	import DecklistRow from '$lib/components/decklist/Row.svelte';
	import Debug from '$lib/components/Debug.svelte';
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Wrapper>
	<Factions />
	<article class="grid grid-cols-[3fr_1fr] gap-8 items-start">
		<main class="">
			<HeroDecklist identity={data.decks.weekly.identity} decklist={data.decks.weekly.decklist} cards={data.decks.weekly.cards} />
		</main>
		<aside class="grid gap-8">
			{#if data.upcoming_set}
				<Box>
					<p>Upcoming set</p>
					<div class="flex flex-row gap-2">
						<img src={data.upcoming_set.attributes.image} alt={data.upcoming_set.attributes.name} />
						<p>{data.upcoming_set.attributes.name}</p>
						<a href={`/cycles/${data.upcoming_set.id}`}>View set</a>
					</div>
				</Box>
			{:else if data.latest_set}
				<Box>
					<p>Upcoming set</p>
					<div class="flex flex-row gap-2">
						<img src={data.latest_set.attributes.image} alt={data.latest_set.attributes.name} />
						<p>{data.latest_set.attributes.name}</p>
						<a href={`/cycles/${data.latest_set.id}`}>View set</a>
					</div>
				</Box>
			{/if}

			<div class="grid gap-2">
				{#if data?.decks?.latest.length > 0}
					<p>Latest decks</p>
					<div class="@container/decklist grid gap-2">
						{#each data.decks.latest as latest}
							<DecklistRow data={latest} />
						{/each}
					</div>
				{/if}
			</div>
		</aside>
	</article>
</Wrapper>

<Debug data={data} />