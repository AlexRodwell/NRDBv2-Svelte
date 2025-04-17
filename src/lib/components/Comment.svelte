<script lang="ts">
    import { format_date, markdown } from "$lib/utils";
    import type { Comment } from "$lib/types";
    import SvelteMarkdown from 'svelte-markdown';

    interface Props {
        data: Comment;
    }

    let { data }: Props = $props();
</script>

<div class="border-b border-b-border pb-4">
    <SvelteMarkdown source={markdown(data.body)} />
    <div>
        <small>
            By <a href="/profile/{data.user}">{data.user}</a> <time datetime={data.created_at}>{format_date(data.created_at)}</time> (updated: {format_date(data.updated_at)})
        </small>
    </div>
</div>