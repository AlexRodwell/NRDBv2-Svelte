<script lang="ts">
	import type { FactionIds } from '$lib/types';

	/**
	 * Influence component to display the influence of a faction.
	 * @param {number} value - The value of the influence.
	 * @param {Faction} faction - The faction of the influence.
	 * @param {boolean} inline - Whether to display the influence inline or not.
	 * @param {boolean} text - Whether to display the text or not.
	 * @param {boolean} total - Whether to display the total influence or not.
	 */
	interface Props {
		value: number;
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
	<span data-faction-theme={faction} class="influence text-(--theme)">
		<span>
			{#each Array(value) as _}
				●
			{/each}
		</span>
		{#if total}
			<span class="opacity-20">
				{#each Array(5 - value) as _}
					○
				{/each}
			</span>
		{/if}
	</span>
</span>
