<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import { locale } from '$lib/i18n';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	const text_array = text.split(/(\[.*?\]|\n)/g);
	let paragraph_array: string[][] = [[]];
	let current_paragraph = 0;

	text_array.forEach((segment) => {
		// Skip empty strings
		if (segment.trim() === '') {
			return;
		}

		if (segment === '\n') {
			// Skip adding a new paragraph if the segment is just a line break
			if (paragraph_array[current_paragraph]?.length > 0) {
				paragraph_array.push([]);
				current_paragraph++;
			}
		} else if (segment === '[subroutine]') {
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
					<abbr class="icon-a11y" title={locale(value)}>
						<Icon name={value} size="sm" inline={true} fill="current" />
						<span class="visually-hidden">{locale(segment)}</span>
					</abbr>
				{:else}
					<span>{@html segment}</span>
				{/if}
			{/each}
		</p>
	{/each}
</div>