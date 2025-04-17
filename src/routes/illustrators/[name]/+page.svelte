<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Header category="Illustrator" title={data.illustrator.data.attributes.name} inline={false} />

<Wrapper class="grid grid-cols-6 gap-8">
	{#each data.printings.data as printing}
		<Card card={printing} quantity={0} />
	{/each}
</Wrapper>
