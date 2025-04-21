<script lang="ts">
    import Notes from '../Notes.svelte';
	import type { Card as TCard, Decklist } from '$lib/types';
    import DecklistContent from '$lib/components/decklist/Content.svelte';
	import Box from '../Box.svelte';
	import HeroHeader from './Header.svelte';
    
    interface Props {
        identity: TCard;
        decklist: Decklist;
        cards: TCard[];
        notes?: boolean;
    }

    let { identity, decklist, cards, notes = true }: Props = $props();
</script>

<Box class="grid gap-8">
    <HeroHeader identity={identity} decklist={decklist} />
    <div>
        <DecklistContent meta={decklist} cards={cards} view={true} />
    </div>
    {#if notes}
        <Notes note={decklist.attributes.notes} />
    {/if}
</Box>
