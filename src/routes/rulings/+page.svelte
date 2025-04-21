<script lang="ts">
	import Box from "$lib/components/Box.svelte";
	import Ruling from "$lib/components/Ruling.svelte";
	import Wrapper from "$lib/components/Wrapper.svelte";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Wrapper>
    {#each data.rulings as ruling}
        <Ruling data={ruling} />
    {/each}
    <!-- TODO: Add pagination -->
</Wrapper>