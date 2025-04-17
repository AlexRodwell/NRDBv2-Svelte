<script lang="ts">
	interface Props {
		children?: any;
		icon?: any;
		class?: string;
		[key: string]: any;
	}

	let {
		children,
		icon,
		class: class_list = '',
		...rest
	}: Props = $props();

	let base_class = $state('inline-flex flex-row items-center gap-1 px-3 py-1 rounded-full border border-border text-sm');
</script>

<span class={[base_class, class_list]} {...rest}>
    {@render icon?.()}
    {@render children?.()}
</span>