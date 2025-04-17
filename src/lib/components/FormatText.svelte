<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import { locales } from '$lib/i18n';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	const text_array = text.split(/(\[.*?\]|\n)/g);
	let paragraph_array: string[][] = [[]];
	let current_paragraph = 0;

	text_array.forEach((segment) => {
		if (['\n', '[subroutine]'].includes(segment)) {
			paragraph_array.push([segment]);
			current_paragraph++;
		} else {
			if (paragraph_array[current_paragraph]) {
				paragraph_array[current_paragraph].push(segment);
			} else {
				paragraph_array[current_paragraph] = [segment];
			}
		}
	});

	if (paragraph_array[0].length === 1 && paragraph_array[0][0] === '') {
		paragraph_array.shift();
	}
</script>

<div class="formatted-text">
	{#each paragraph_array as paragraph, index}
		<p>
			{#each paragraph as segment}
				{#if segment.startsWith('[')}
					{@const value = segment.slice(1, -1)}
					<abbr class="icon-a11y" title={locales(value)}>
						<Icon name={value} size="sm" inline={true} />
						<span class="visually-hidden">{locales(segment)}</span>
					</abbr>
				{:else}
					<span>{@html segment}</span>
				{/if}
			{/each}
		</p>
	{/each}
</div>
