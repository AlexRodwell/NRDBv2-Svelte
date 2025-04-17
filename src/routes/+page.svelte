<script lang="ts">
	import Box from '$lib/components/Box.svelte';
	import Factions from '$lib/components/Factions.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import HeroDecklist from '$lib/components/decklist/Hero.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Wrapper>
	<Factions />
	<article class="grid grid-cols-[3fr_1fr] gap-8">
		<main class="">
			<HeroDecklist decklist={data.decks.weekly} />
			<p>Deck of the week</p>
			<div class="flex flex-row gap-2">
				<!-- <img src={data.decks.weekly.faction} alt={data.decks.weekly.faction} /> -->
				<p>{data.decks.weekly.attributes.name}</p>
				<a href={`/decklist/${data.decks.weekly.id}`}>View decklist</a>
			</div>
		</main>
		<aside class="">
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

			<p>Latest decks</p>
			<div class="grid gap-2">
				{#each data.decks.latest as latest}
					<div class="flex flex-row gap-2">
						<a href={`/decklist/${latest.id}`}>{latest.attributes.name}</a>
					</div>
				{/each}
			</div>
		</aside>
	</article>
</Wrapper>
