<script lang="ts">
	import Wrapper from '$lib/components/Wrapper.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Wrapper class="grid-cols-3">
	{#each data.illustrators.data as illustrator}
		<h1>
			<a href="/illustrators/{illustrator.id}">{illustrator.attributes.name}</a>
		</h1>
	{/each}
</Wrapper>
