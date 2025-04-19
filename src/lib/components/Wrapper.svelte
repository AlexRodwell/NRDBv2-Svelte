<script lang="ts">
	interface Props {
		children: () => any;
		class?: string;
	}

	let { children, class: classList = '' }: Props = $props();
</script>

<div class={['container py-12 md:py-16 min-h-screen print:hidden', classList]}>
	{@render children?.()}
</div>
