<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';

	interface Props {
		icon?: string;
		category?: string;
		title: string;
		subtitle?: any | string;
		actions?: any;
		inline?: boolean;
	}

	let { icon, category, title, subtitle, actions, inline = true }: Props = $props();
</script>

<header class={[!inline ? 'border-b border-b-border py-8' : '']}>
	<div class={[!inline ? 'container' : '', actions ? 'grid grid-cols-[1fr_auto] gap-8' : '']}>
		<div class="flex flex-row items-center gap-4">
			{#if icon}
				<div
					data-faction-theme={icon}
					class="flex aspect-square h-full items-center justify-center rounded-md bg-white/10 p-4"
				>
					<Icon name={icon} size="xl" fallback={true} />
				</div>
			{/if}
			<div>
				{#if category}
					<p class="rounded-full px-3 py-1.5 text-sm border border-border inline-flex">
						{category}
					</p>
				{/if}
				<h1 class="text-3xl font-semibold md:text-4xl">{title}</h1>
				{#if subtitle}
					<div class="mt-2">
						{#if typeof subtitle === 'function'}
							{@render subtitle?.()}
						{:else if subtitle}
							<p class="mt-2 text-lg text-white/60">{subtitle}</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		{#if actions}
			<div>
				{@render actions?.()}
			</div>
		{/if}
	</div>
</header>
