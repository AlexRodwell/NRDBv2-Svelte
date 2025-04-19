<script lang="ts">
	import type { FactionIds } from '$lib/types';
	import type { Card } from '$lib/types';
	
	interface Props {
		value: Card['attributes']['influence_cost'];
		faction: FactionIds;
		inline?: boolean;
		text?: boolean;
		total?: boolean;
	}

	let { value, faction, inline = false, text = true, total = true }: Props = $props();
</script>

<span class={[inline ? 'inline-flex' : 'flex', 'gap-1 items-center']}>
	{#if text}
		<span class="text-sm">
			{value}
		</span>
	{/if}
	<span data-faction-theme={faction} class="influence">
		<span class="text-(--theme)">
			{#each Array(value) as _}
				●
			{/each}
		</span>
		{#if total}
			<span class="opacity-40">
				{#each Array(5 - value) as _}
					○
				{/each}
			</span>
		{/if}
	</span>
</span>
