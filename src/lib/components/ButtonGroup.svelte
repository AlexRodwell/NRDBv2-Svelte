<script lang="ts">
	import { ToggleGroup } from 'bits-ui';

	interface Props {
		buttons: { label: string; value: string }[];
	}

	let { buttons }: Props = $props();

	let value: string = $state(buttons[0].value);
</script>

<ToggleGroup.Root
	bind:value
	type="single"
	class="h-input rounded-card-sm border-border bg-background-alt shadow-mini flex items-center gap-x-0.5 border px-[4px] py-1"
>
	{#each buttons as { label, value }}
		<ToggleGroup.Item
			aria-label={label}
			{value}
			class="bg-background-alt hover:bg-muted active:bg-dark-10 data-[state=on]:bg-muted data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10 inline-flex items-center justify-center transition-all active:scale-[0.98]"
		>
			{label}
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>
