<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import { format_date } from '$lib/utils';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Header
	category="Formats"
	title="Formats"
	subtitle=""
	inline={false}
/>

<Wrapper class="grid-cols-4">
    {#each data.formats as format}
        <a href="/format/{format.id}">
            <p>{format.attributes.name}</p>
            <p>Updated: {format_date(format.attributes.updated_at)}</p>
        </a>
    {/each}
</Wrapper>
