<script lang="ts">
	import { Button } from 'bits-ui';

	interface Props {
		variant?: 'default' | 'pill' | 'outline';
		type?: 'button' | 'submit';
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

	let classes = $state('flex flex-row items-center gap-1 px-4 py-2 rounded-md cursor-pointer');

	switch (variant) {
		case 'pill':
			classes += ' rounded-full';
			break;
		case 'outline':
			classes += ' border border-white';
			break;
		default:
			classes += ' bg-white text-black';
	}
</script>

{#if href}
	<a {href} class={[classes, classList]} {...rest}>
		{@render children()}
	</a>
{:else}
	<Button.Root {type} class={[classes, classList]} {...rest}>
		{@render children()}
	</Button.Root>
{/if}
