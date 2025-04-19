<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$lib/components/icons/Icon.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import { locale } from '$lib/i18n';
	import type { Faction } from '$lib/types';

	let factions_formatted: { title: string; data: Faction[] }[] = [
		{ 
			title: 'corp', 
			data: page.data.factions.filter((faction: Faction) => faction.attributes.side_id === 'corp') 
		},
		{
			title: 'runner',
			data: page.data.factions.filter((faction: Faction) => faction.attributes.side_id === 'runner')
		},
		{
			title: 'mini factions',
			data: page.data.factions.filter((faction: Faction) => faction.attributes.side_id !== 'corp' && faction.attributes.side_id !== 'runner')
		}
	];
</script>

<Wrapper class="grid gap-16">
	{#each factions_formatted as side}
		<div class="grid gap-4">
			<h2>{locale(side.title)}</h2>
			<div class="grid grid-cols-4 gap-8">
				{#each side.data as faction}
					<a href="/faction/{faction.id}" class="grid gap-4">
						<img src="/assets/faction/{faction.id}.png" alt={faction.attributes.name} class="w-full" />
						<span class="icon-label">
							<span data-faction-theme={faction.id}>
								<Icon name={faction.id} />
							</span>
							<span>{faction.attributes.name}</span>
						</span>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</Wrapper>