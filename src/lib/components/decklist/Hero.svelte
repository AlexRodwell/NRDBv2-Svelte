<script lang="ts">
    import Icon from '$lib/components/icons/Icon.svelte';
    import Card from '$lib/components/Card.svelte';
	import Influence from '../Influence.svelte';
    import Notes from '../Notes.svelte';
	import type { Card as TCard, Decklist } from '$lib/types';
    import { tooltip } from '$lib/actions';
    import DecklistContent from '$lib/components/decklist/Content.svelte';
	import Box from '../Box.svelte';
	import Button from '../Button.svelte';
    
    interface Props {
        identity: TCard;
        decklist: Decklist;
        cards: TCard[];
        notes?: boolean;
    }

    let { identity, decklist, cards, notes = true }: Props = $props();
</script>

<Box class="grid gap-8">
    <div class="grid grid-cols-[auto_1fr] gap-4">
        <div class="w-48" use:tooltip={identity}>
            <Card data={identity} details={false} />
        </div>
        <div class="decklist-stats ms-4">
            <h2 class="text-2xl">{decklist.attributes.name}</h2>
            <div data-faction-theme={identity.attributes.faction_id} class="icon-label">
                <Icon name={decklist.attributes.faction_id} />
                {identity.attributes.title}
            </div>

            <div class="grid gap-4">
                <p class="decklist-influence">
                    {decklist.attributes.influence_spent} influence spent (max [value], available [value])
                </p>
                <p class="decklist-cards">
                    {decklist.attributes.num_cards} cards (min)
                </p>
                <p class="decklist-set">
                Cards up to The Automata Initiative
                </p>
                <p class="decklist-author font-size-16">
                    <a href="/profile/{decklist.attributes.user_id}">Author: {decklist.attributes.user_id}</a>
                </p>
                <Button href="/decklist/27de800e-e148-40c2-9bd3-6f89c82cb162">
                    <Icon name="subroutine" size="sm" />
                    View deck
                </Button>
            </div>
        </div>
    </div>
    <div>
        <DecklistContent meta={decklist} cards={cards} />
    </div>
    {#if notes}
        <Notes note={decklist.attributes.notes} />
    {/if}
</Box>
