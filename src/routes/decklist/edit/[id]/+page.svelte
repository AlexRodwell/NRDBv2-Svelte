<script lang="ts">
    import Wrapper from "$lib/components/Wrapper.svelte";
    import Icon from "$lib/components/icons/Icon.svelte";
    import Button from "$lib/components/Button.svelte";
    import type { Card } from '$lib/types'
    import Influence from "$lib/components/Influence.svelte";
    import { locale } from "$lib/i18n";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();

    const count = data.cards.reduce((accumulator, group) => {
		accumulator[group.type] = group.data
			.map((card) => {
				card.quantity = data.meta.attributes.card_slots[card.id] || 0;
				return card;
			})
			.reduce((sum, card) => sum + card.quantity, 0);
		return accumulator;
	}, {});
</script>

<Wrapper class="grid grid-cols-2">
    <div class="columns-group columns columns-2 gap-4">
        {#each data.cards as group}
            <div class="grid gap-2" style="break-inside: avoid-column;">
                <div class="flex flex-row items-center gap-2">
                    <Icon name={group.type.toLowerCase()} size="sm" />
                    <h2 class="text-lg">{locale(group.type)} ({count[group.type]})</h2>
                </div>
                <div class="grid gap-2">
                    {#each group.data as card}
                        <a href="/cards/{card.id}" class="flex flex-row items-center gap-2">
                            {data.meta.attributes.card_slots[card.id]}x {card.attributes.title}
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
    <div>
        <p>This is where you select the cards and their quantities...</p>
    </div>
    <pre class="col-span-full">{JSON.stringify(data, null, 2)}</pre>
</Wrapper>