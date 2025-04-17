<script lang="ts">
	import Head from './Head.svelte';

	interface Props {
		// head?: () => any;
		headColumns: string[];
		body?: () => any;
		// rowColumns: string[];
	}

	let {
		// head,
		headColumns,
		body
	}: Props = $props();
</script>

<table class="w-full">
	<Head columns={headColumns} />
	<!-- {@render head?.()} -->
	<tbody>
		{@render body?.()}
	</tbody>
</table>
