<script lang="ts">
	interface Props {
		children: () => any;
		class?: string;
	}

	let { children, class: classList = '' }: Props = $props();
</script>

<div class={['container py-12 md:py-16 min-h-screen', classList]}>
	{@render children?.()}
</div>
