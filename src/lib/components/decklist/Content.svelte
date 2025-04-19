<script lang="ts">
    import Icon from '$lib/components/icons/Icon.svelte';
    import Influence from '$lib/components/Influence.svelte';
    import type { Decklist, Card } from '$lib/types';
    import { locale } from '$lib/i18n';
    import { tooltip } from '$lib/actions';
    import { card_quantity, group_cards_by_type } from '$lib/utils';

    interface Props {
        meta: Decklist;
        cards: Card[];
    }

    let { meta, cards }: Props = $props();

    const grouped_cards = group_cards_by_type(cards);
    const count = card_quantity(meta, grouped_cards);
</script>

<div class="columns-group columns columns-2 gap-4">
    {#each grouped_cards as group}
        <div class="grid gap-2" style="break-inside: avoid-column;">
            <div class="flex flex-row items-center gap-2">
                <Icon name={group.type.toLowerCase()} size="sm" />
                <h2 class="text-lg">{locale(group.type)} ({count[group.type]})</h2>
            </div>
            <div class="grid gap-2 justify-items-start">
                {#each group.data as card}
                    <a 
                        href="/cards/{card.id}" 
                        class="flex flex-row items-center gap-2"
                        use:tooltip={card}
                    >
                        {meta.attributes.card_slots[card.id]}x {card.attributes.title}
                        <Influence
                            value={card.attributes.influence_cost}
                            faction={card.attributes.faction_id}
                            inline={true}
                            text={false}
                            total={false}
                        />
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>