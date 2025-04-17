<script lang="ts">
    import Header from "$lib/components/Header.svelte";
	import Wrapper from "$lib/components/Wrapper.svelte";
    import Button from "$lib/components/Button.svelte";
    import RowDecklist from "$lib/components/decklist/Row.svelte";
    import type { Decklist } from "$lib/types";

    interface Props {
        title?: string;
        data: Decklist[];
    }

    let { title = 'Decks', data }: Props = $props();
</script>

<Header title={title} inline={false} />

<Wrapper class="grid grid-cols-[1fr_3fr] gap-4">
    <div class="grid gap-2 content-start">
        <Button href="/search" variant="outline">Search</Button>
        <Button href="/decklists" variant="outline">popular</Button>
        <Button href="/decklists/recent" variant="outline">recent</Button>
        <Button href="/decklists/of-the-week" variant="outline">decklists of the week</Button>
        <Button href="/decklists/tournament" variant="outline">tournaments</Button>
        <Button href="/decklists/hot-topics" variant="outline">hot topics</Button>
        <Button href="/decklists/hall-of-fame" variant="outline">hall of fame</Button>
        <Button href="/decklists/mine" variant="outline">my decklists</Button>
        <Button href="/decklists/favorites" variant="outline">my favourites</Button>
    </div>
    <div class="grid gap-4">
        {#each data as decklist}
            <RowDecklist data={decklist} />
        {/each}
    </div>
    <!-- TODO: Add pagination -->
</Wrapper>

