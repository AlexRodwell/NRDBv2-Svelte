<script lang="ts">
	import Button from './Button.svelte';
	import { page } from '$app/state';
	import Icon from './icons/Icon.svelte';

	const filtered_factions = page.data.factions.filter((faction) => {
		return (
			faction.attributes.name !== 'None' &&
			faction.attributes.name !== 'All' &&
			faction.id !== 'adam' &&
			faction.id !== 'apex' &&
			faction.id !== 'sunny_lebeau' &&
			faction.id !== 'neutral_corp' &&
			faction.id !== 'neutral_runner'
		);
	});
</script>

{#if page.data.factions}
	<div class="flex flex-row gap-4">
		{#each filtered_factions as faction}
			<div data-faction-theme={faction.id} class="flex flex-col gap-2 grow">
				<!-- basis-0 if we want the button widths to be balanced/even, rather than relative to their initial widths -->
				<Button href="/faction/{faction.id}" variant="outline" label={faction.attributes.name} class="!border-(--theme) justify-center">
					<span data-faction-theme={faction.id}>
						<Icon name={faction.id} />
					</span>
					{faction.attributes.name}
				</Button>
			</div>
		{/each}
	</div>
{/if}
