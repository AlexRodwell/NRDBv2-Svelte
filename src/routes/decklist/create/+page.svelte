<script lang="ts">
    import Wrapper from "$lib/components/Wrapper.svelte";
    import Icon from "$lib/components/icons/Icon.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import type { Card as TCard, CardTypeIds} from '$lib/types';
    import { page } from '$app/state';
    import Fuse from 'fuse.js'
    import { locales } from "$lib/i18n";
	import Header from "$lib/components/Header.svelte";
	import Influence from "$lib/components/Influence.svelte";
    import { DatePicker, ToggleGroup, Tabs, DropdownMenu } from "bits-ui";
	import { onMount } from "svelte";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();

    let identity = $state<TCard | null>(data?.identity?.id ? data.identity : null);
    let side = $state<TCard['attributes']['side_id'] | null>(data?.identity?.attributes?.side_id ?? data.side ?? null);

    let filtered_cards = $state([]);
    let filtered_types = $state([]);
    
    $effect(() => {
        if (side) {
            filtered_cards = side === 'corp' ? 
                page.data.cards.filter(card => 
                    card.attributes.card_type_id !== 'runner_identity' && 
                    card.attributes.card_type_id !== 'corp_identity' &&
                    card.attributes.card_type_id !== 'event' &&
                    card.attributes.card_type_id !== 'hardware' &&
                    card.attributes.card_type_id !== 'resource' &&
                    card.attributes.card_type_id !== 'icebreak' &&
                    card.attributes.card_type_id !== 'program' &&
                    card.attributes.side_id	 !== 'corp'
                ) : page.data.cards.filter(card => 
                    card.attributes.card_type_id !== 'runner_identity' && 
                    card.attributes.card_type_id !== 'corp_identity' &&
                    card.attributes.card_type_id !== 'agenda' &&
                    card.attributes.card_type_id !== 'asset' &&
                    card.attributes.card_type_id !== 'operation' &&
                    card.attributes.card_type_id !== 'upgrade' &&
                    card.attributes.card_type_id !== 'barrier' &&
                    card.attributes.card_type_id !== 'sentry' &&
                    card.attributes.side_id	 !== 'runner'
                )

        filtered_types = side === 'corp' ? 
            page.data.card_types.filter(type => 
                type.id !== 'event' &&
                type.id !== 'hardware' &&
                type.id !== 'resource' &&
                type.id !== 'icebreak' &&
                type.id !== 'program'
            ) : page.data.card_types.filter(type => 
                type.id !== 'runner_identity' && 
                type.id !== 'corp_identity' &&
                type.id !== 'agenda' &&
                type.id !== 'asset' &&
                type.id !== 'operation' &&
                type.id !== 'upgrade' &&
                type.id !== 'barrier' &&
                type.id !== 'sentry' &&
                type.id !== 'side_id' // Added filter for side_id
            )
        }
    })

    console.log(filtered_cards);

    const reset = () => {
        identity = null;
        side = null;

        // Remove URL attributes
        const url = new URL(window.location.href);
        url.searchParams.forEach((value, key) => {
            url.searchParams.delete(key);
        });
        window.history.pushState({}, '', url);
    }
    
    let fuse = new Fuse(filtered_cards, {
        threshold: 0.3,
        keys: [
            "id",
            "type",
            "attributes.title"
        ]
    });

    let results = $state<TCard[]>($state.snapshot(filtered_cards.slice(0, 30)));

    const search = (str: string) => {
        if (str.length === 0) {
            results = $state.snapshot(filtered_cards.slice(0, 30));
            return;
        }

		const fuse_result: { item: TCard }[] = fuse.search(str);
		results = fuse_result.map((result) => result.item);
	}

    let filters = $state<{
        factions: string[];
        types: string[];
    }>({
        factions: [],
        types: []
    });

    let deck = $state<{
        cards: { 
            [key: CardTypeIds]: { 
                [key: TCard['id']]: number 
            } 
        };
    }>({
        cards: side === 'corp' ? {
            event: {},
            hardware: {},
            resource: {},
            icebreak: {},
            program: {}
        } : {
            agenda: {},
            asset: {},
            operation: {},
            upgrade: {},
            barrier: {},
            sentry: {}
        }
    });

    // Remove URL parameters on mount
    onMount(() => {
        const url = new URL(window.location.href);

        url.searchParams.forEach((value, key) => {
            url.searchParams.delete(key);
        });

        window.history.pushState({}, '', url);
    })
</script>

{#if identity && side}
    <Header 
        icon={identity.attributes.faction_id}
        title="Decklist for {identity.attributes.title}" 
        inline={false}
    />
    <Wrapper>
        <div class="grid gap-8 grid-cols-[3fr_4fr]">
            <div class="flex flex-row gap-8 items-center">
                <div class="w-full max-w-32">
                    <Card card={identity} details={false} />
                </div>
            </div>
            <div class="grid gap-4">

                <Tabs.Root value="Build">
                    <Tabs.List class="flex space-between">
                        {#each ['Build', 'Notes', 'Check', 'History', 'Collection', 'Settings'] as tab}
                            <Tabs.Trigger
                                value={tab}
                                class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
                            >
                                {tab}
                            </Tabs.Trigger>
                        {/each}
                    </Tabs.List>
                    
                    <Tabs.Content value="Build">
                                <input 
                                    class="w-full"
                                    type="search" 
                                    placeholder="Find a card or filter the list" 
                                    oninput={(e) => {
                                        search(e.target.value)
                                    }}
                                />
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="grid gap-2 p-2 border border-border">
                                        <p>Filter by faction</p>
                                        <ToggleGroup.Root
                                            bind:value={filters.factions}
                                    type="multiple"
                                    class="h-input rounded-card-sm border-border bg-background-alt shadow-mini flex items-center gap-x-0.5 border px-[4px] py-1"
                                >
                                    {#each page.data.factions.filter((faction: Faction) => faction.attributes.side_id === identity.attributes.side_id) as faction}
                                        <ToggleGroup.Item
                                            aria-label={faction.id}
                                            value={faction.id}
                                            class="rounded-9px bg-background-alt hover:bg-muted active:bg-dark-10 data-[state=on]:bg-white data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10 inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                        >
                                            <Icon name={faction.id} />
                                        </ToggleGroup.Item>
                                    {/each}
                                </ToggleGroup.Root>
                            </div>
                            <div class="grid gap-2 p-2 border border-border">
                                <p>Filter by type</p>
                                <ToggleGroup.Root
                                    bind:value={filters.types}
                                    type="multiple"
                                    class="h-input rounded-card-sm border-border bg-background-alt shadow-mini flex items-center gap-x-0.5 border px-[4px] py-1"
                                >
                                    {#each filtered_types as card_type}
                                        <ToggleGroup.Item
                                            aria-label={card_type.id}
                                            value={card_type.id}
                                            class="rounded-9px bg-background-alt hover:bg-muted active:bg-dark-10 data-[state=on]:bg-white data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10 inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                        >
                                            <Icon name={card_type.id} />
                                        </ToggleGroup.Item>
                                    {/each}
                                </ToggleGroup.Root>
                            </div>
                        </div>
                    </Tabs.Content>

                    {#each ['Notes', 'Check', 'History', 'Collection', 'Settings'] as tab}
                        <Tabs.Content value={tab}>
                            {tab}
                        </Tabs.Content>
                    {/each}
                </Tabs.Root>
                
            </div>
            <div class="columns columns-2 gap-4">
                {#each Object.entries(deck.cards) as [card_type, cards]}
                    <div class="grid gap-2" style="break-inside: avoid-column;">
                        <div class="flex flex-row items-center gap-2">
                            <Icon name={card_type} size="sm" />
                            <h2 class="text-lg">{locales(card_type)}</h2>
                        </div>
                        <div class="grid gap-2">
                            {#if Object.keys(cards).length > 0}
                                {#each Object.entries(cards) as [card_id, quantity]}
                                    <a href="/cards/{card_id}" class="flex flex-row items-center gap-2">
                                        {quantity}x {filtered_cards.find(card => card.id === card_id)?.attributes.title}
                                        <Influence
                                            value={filtered_cards.find(card => card.id === card_id)?.attributes.influence_cost}
                                            faction={filtered_cards.find(card => card.id === card_id)?.attributes.faction_id}
                                            inline={true}
                                            text={false}
                                            total={false}
                                        />
                                    </a>
                                {/each}
                            {:else}
                                <p class="text-muted">No cards selected</p>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
            <div>
                {#if results.length > 0}
                    <table>
                        <thead>
                            <tr>
                                <th>{locales('qty')}</th>
                                <th>{locales('title')}</th>
                                <th>{locales('type')}</th>
                                <th>{locales('influence')}</th>
                                <th>{locales('faction')}</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each results as result}
                                <tr class="border-b border-b-border">
                                    <td>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="3" 
                                            value="0" 
                                            class="w-16" 
                                            oninput={(e) => {
                                                if (!e.target || !result.attributes.card_type_id) return;

                                                if (!deck.cards[result.attributes.card_type_id]) {
                                                    deck.cards[result.attributes.card_type_id] = {};
                                                }

                                                deck.cards[result.attributes.card_type_id][result.id] = parseInt((e.target as HTMLInputElement).value) || 0;
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <a href="/cards/{result.id}" target="_blank">{result.attributes.title} ({result.attributes.card_cycle_names[0]})</a>
                                    </td>
                                    <td>
                                        <span class="icon-label">
                                            <Icon name={result.attributes?.card_type_id} size="sm" />
                                            {locales(result.attributes?.card_type_id)}
                                        </span>
                                    </td>
                                    <td>
                                        {#if result.attributes.influence_cost}
                                            
                                            <span class="icon-label">
                                                <span data-faction-theme={result.attributes?.faction_id}>
                                                    <Influence value={result.attributes?.influence_cost} />
                                                </span>
                                            </span>
                                        {:else}
                                            N/A
                                        {/if}
                                    </td>
                                    <td>
                                        <span class="icon-label">
                                            <span data-faction-theme={result.attributes?.faction_id}>
                                                <Icon name={result.attributes?.faction_id} size="sm" />
                                            </span>
                                            {locales(result.attributes?.faction_id)}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="icon-label">
                                            {#if result.attributes.cost}
                                                <Icon name="credit" size="sm" />
                                                {locales(result.attributes?.cost)}
                                            {:else if result.attributes.memory_cost}
                                                <Icon name="memory" size="sm" />
                                                {locales(result.attributes?.memory_cost)}
                                            {:else if result.attributes.trash_cost}
                                                <Icon name="trash_cost" size="sm" />
                                                {locales(result.attributes?.trash_cost)}
                                            {/if}
                                        </span>
                                    </td>
                                </tr>
                                <!-- <Card card={result} quantity={0} influence={false} /> -->
                            {/each}
                        </tbody>
                    </table>
                {/if}
            </div>
        </div>
        <br/>
        <hr/>
        <br/>
        <p>Want to choose another identity?</p>
        <button onclick={() => reset()}>Choose Another Identity</button>
    </Wrapper>
{:else if side}
    <Header title="Choose decklist for {side}" inline={false} />
    <Wrapper class="grid gap-4">
        <Button onclick={() => reset()} variant="outline">Back</Button>
        <ul class="flex flex-row flex-wrap gap-2">
            {#each data.identities.filter((_identity: Card) => _identity.attributes.side_id === side) as _identity}
                <Button 
                    class="flex flex-row gap-4 items-center" 
                    onclick={() => {
                        identity = _identity;
                        filters.factions = [_identity.attributes.faction_id];
                        console.log('Selected side', identity?.attributes.side_id);
                    }}
                >
                    <Icon name={_identity.attributes.faction_id} size="sm" />
                    <p>{_identity.attributes.title}</p>
                </Button>
            {/each}
        </ul>
    </Wrapper>
{:else}
    <Header title="Create a new decklist" subtitle="Select a side" inline={false} />
    <Wrapper class="grid grid-cols-2 gap-4">
        {#each ["corp", "runner"] as _side}
            <div class="grid content-center items-center border border-border rounded-xl p-8 aspect-video text-center gap-4">
                <h2>Create a {locales(_side)} deck</h2>
                <Button 
                    onclick={() => {
                        side = _side;
                    }}
                >
                    <Icon name={_side} size="lg" /> 
                    <span>{locales(_side)}</span>
                </Button>
            </div>
        {/each}
    </Wrapper>
{/if}