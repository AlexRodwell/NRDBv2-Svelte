<script lang="ts">
    import Box from "$lib/components/Box.svelte";
    import { format_date, markdown } from "$lib/utils";
	import Comment from "./Comment.svelte";
    import Icon from "$lib/components/icons/Icon.svelte";
    import SvelteMarkdown from 'svelte-markdown';
    import type { Review } from "$lib/types";

    interface Props {
        data: Review;
    }

    let { data }: Props = $props();

    let expanded = $state<boolean>(false);
</script>

<!-- TODO: improve styling -->
<Box class="grid gap-8 content-start">
    <div class="grid grid-cols-[1fr_auto] gap-4 border-b border-b-border p-4">
        <!-- TODO: add logic to favourite a review -->
        <div class="icon-label">
            <Icon name="heart" />
            7
        </div>
        <p>By <a href="/profile/{data.attributes.username}">{data.attributes.username}</a> on <time datetime={format_date(data.attributes.created_at)}>{format_date(data.attributes.created_at)}</time> (updated: {format_date(
            data.attributes.updated_at
        )})</p>
    </div>
    <div class={['overflow-hidden grid', !expanded ? 'grid-rows-[10cap]' : '']}>
        <!-- <pre>{JSON.stringify(markdown(data.attributes.body), null, 2)}</pre> -->
        <SvelteMarkdown source={markdown(data.attributes.body)} />
    </div>
    <button onclick={() => (expanded = true)}>expand</button>
    {#if data.attributes.comments.length > 0}
        <div class="grid gap-4">
            <p>Comments:</p>
            <div class="grid gap-4">
                {#each data.attributes.comments as comment}
                    <Comment data={comment} />
                {/each}
            </div>
        </div>
    {/if}
</Box>