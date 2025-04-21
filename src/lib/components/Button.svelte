<script lang="ts">
	import { Button } from 'bits-ui';

	interface Props {
		variant?: 'default' | 'outline' | 'ghost';
		type?: 'button' | 'submit' | 'p';
		href?: string;
		children?: any;
		class?: string;
		[key: string]: any;
	}

	let {
		variant = 'default',
		type = 'button',
		href,
		children,
		class: classList = '',
		...rest
	}: Props = $props();

	let classes = $state('flex flex-row items-center justify-center gap-1 px-4 py-2 rounded-md cursor-pointer border');

	switch (variant) {
		case 'outline':
			classes += ' border-border text-text';
			break;
		case 'ghost':
			classes += ' bg-border border-border text-white';
			break;
		default:
			classes += ' bg-white border-white text-black';
	}
</script>

{#if href}
	<a {href} class={[classes, classList]} {...rest}>
		{@render children()}
	</a>
{:else if type === 'p'}
	<p class={[classes, classList]} {...rest}>
		{@render children()}
	</p>
{:else}
	<Button.Root {type} class={[classes, classList]} {...rest}>
		{@render children()}
	</Button.Root>
{/if}
