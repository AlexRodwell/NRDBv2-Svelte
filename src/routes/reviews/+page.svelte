<script lang="ts">
	import Wrapper from "$lib/components/Wrapper.svelte";
    import Review from "$lib/components/Review.svelte";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Wrapper>
    {#each data.reviews as review}
        <Review data={review} />
    {/each}
    <!-- TODO: Add pagination -->
</Wrapper>