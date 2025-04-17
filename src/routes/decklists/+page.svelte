<script lang="ts">
	import ListDecklists from "$lib/components/decklist/List.svelte";
    import type { Decklist } from "$lib/types";

    interface Props {
		data: { 
            decklists: Decklist[] 
        };
	}

	let { data }: Props = $props();
</script>

<ListDecklists title="Decks" data={data.decklists} />