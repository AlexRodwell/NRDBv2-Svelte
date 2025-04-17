<script lang="ts">
	import Button from './Button.svelte';
	import { page } from '$app/state';
	import Icon from './icons/Icon.svelte';
</script>

{#if page.data.factions}
	<div class="flex flex-row gap-4">
		{#each page.data.factions as faction}
			<div class="flex flex-col gap-2">
				<Button href="/faction/{faction.id}" variant="outline" label={faction.attributes.name} class="!border-(--theme)">
					<span data-faction-theme={faction.id}>
						<Icon name={faction.id} />
					</span>
					{faction.attributes.name}
				</Button>
			</div>
		{/each}
	</div>
{/if}
