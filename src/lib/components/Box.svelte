<script lang="ts">
	interface Props {
		children: () => any;
		class?: string;
	}

	let { children, class: class_list = '' } = $props();
</script>

<div class={["p-6 bg-foreground border border-border", class_list]}>
	{@render children()}
</div>
