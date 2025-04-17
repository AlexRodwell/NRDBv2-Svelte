<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import RowDecklist from "$lib/components/decklist/Row.svelte";

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Header icon={data.faction.data.id} title={data.faction.data.attributes.name} inline={false} />

<Wrapper class="grid gap-12">
	{#if data.faction.data.attributes.description}
		<div data-faction-theme={data.faction.data.id} class="border border-current p-8">
			{#each data.faction.data.attributes.description.split('\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>
	{/if}

	<div class="grid gap-12">
		{#each data.identities.data as identity}
			<div class="grid grid-cols-[1fr_3fr] gap-8 pb-12 border-b border-b-border">
				<header class="grid grid-cols-[1fr_auto] gap-8 col-span-full">
					<!-- TODO: Add rotated value -->
					<h2 class="text-4xl">{identity.attributes.title} (ROTATED???)</h2>
					<div class="flex flex-row gap-2 items-center">
						<Button href="/decklist/create?identity={identity.id}">
							<Icon name="subroutine" size="sm" />
							Create deck with this Identity
						</Button>
						<Button href="/decklists/find?cards[]={identity.id}&sort=popularity">
							More decks
						</Button>
					</div>
				</header>
				<div class="grid content-start">
					<div class="sticky top-8">
						<Card card={identity} details={false} />
					</div>
				</div>
				<div class="grid gap-2 content-start">
					{#each data.decks[identity.id] as deck}
						<RowDecklist data={deck} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Wrapper>
