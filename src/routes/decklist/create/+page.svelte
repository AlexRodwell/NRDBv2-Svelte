<script lang="ts">
    import Wrapper from "$lib/components/Wrapper.svelte";
    import Icon from "$lib/components/icons/Icon.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import type { Card as TCard, SidesIds, CardType, CardTypeIds, Faction } from '$lib/types';
    import { page } from '$app/state';
    import Fuse from 'fuse.js'
    import { locale } from "$lib/i18n";
	import Header from "$lib/components/Header.svelte";
	import Influence from "$lib/components/Influence.svelte";
    import { DatePicker, ToggleGroup, Tabs, DropdownMenu, Tooltip } from "bits-ui";
	import { onMount } from "svelte";
    import Debug from '$lib/components/Debug.svelte';
    import { tooltip } from "$lib/actions";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();

    let identity = $state<TCard | null>(data?.identity?.id ? data.identity : null);
    let side = $state<TCard['attributes']['side_id'] | null>(data.side ?? null);

    let filtered_cards = $state<TCard[] | []>([]);
    let filtered_types = $state<CardType[] | []>([]);

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

    let results = $state<TCard[]>([]);

    const search = (str: string = '') => {
        // if (str.length === 0) {
        //     results = $state.snapshot(filtered_cards.slice(0, 30));
        //     return;
        // }

        console.log('Searching for:', {
            $or: [
                { title: str, },
                ...filters.factions.map(faction => ({ faction_id: faction })),
                ...filters.types.map(type => ({ card_type_id: type }))
            ]
        });
        const fuse_result: { item: TCard }[] = fuse.search({
            $or: [
                { title: str, },
                ...filters.factions.map(faction => ({ faction_id: faction })),
                ...filters.types.map(type => ({ card_type_id: type }))
            ]
        });
        
		results = fuse_result.slice(0, 20).map((result) => result.item);
	}

    let filters = $state<{
        factions: string[];
        types: string[];
    }>({
        factions: [identity?.attributes.faction_id],
        types: []
    });

    let deck = $state<{
        cards: { 
            [key: CardTypeIds]: { 
                [key: TCard['id']]: number 
            } 
        };
    }>({
        cards: {}
    });

    // Remove URL parameters on mount
    onMount(() => {
        // const url = new URL(window.location.href);
        // 
        // url.searchParams.forEach((value, key) => {
        //     url.searchParams.delete(key);
        // });
        // 
        // window.history.pushState({}, '', url);
    });

    let fuse: Fuse<TCard>;

    const select_identity = (selected_side: SidesIds) => {

        filtered_cards = page.data.cards.filter((card: TCard) => card.attributes.card_type_id !== `${selected_side}_identity`)

        filtered_types = selected_side === 'corp' ? 
            page.data.card_types.filter((type: { id: CardTypeIds }) => 
                type.id !== 'event' &&
                type.id !== 'hardware' &&
                type.id !== 'resource' &&
                type.id !== 'program' &&
                type.id !== 'corp_identity' &&
                type.id !== 'runner_identity' 
            ) : page.data.card_types.filter((type: { id: CardTypeIds }) => 
                type.id !== 'agenda' &&
                type.id !== 'asset' &&
                type.id !== 'operation' &&
                type.id !== 'upgrade' &&
                type.id !== 'corp_identity' &&
                type.id !== 'runner_identity'
            )

        deck.cards = selected_side === 'corp' ? {
            agenda: {},
            asset: {},
            operation: {},
            upgrade: {}
        } : {
            event: {},
            hardware: {},
            resource: {},
            icebreak: {},
            program: {}
        }

        fuse = new Fuse(filtered_cards, {
            threshold: 0.3,
            keys: [
                { name: 'id', getFn: (_) => _.id }, // "id",
                { name: 'card_type_id', getFn: (_) => _.attributes.card_type_id }, // "type",
                { name: 'title', getFn: (_) => _.attributes.title }, // "title",
                { name: 'faction_id', getFn: (_) => _.attributes.faction_id }, // "faction",
            ]
        });

        // Filter cards to the user's selected identity's faction
        search(identity?.attributes.faction_id ?? '');
    }
</script>

{#if identity && side}
    <Header 
        icon={identity.attributes.faction_id}
        title="Decklist for {identity.attributes.title}" 
        inline={false}
    />
    <Wrapper>
        <div class="grid gap-8 grid-cols-[3fr_4fr]">
            <div>
                <div class="sticky top-8">
                    <div class="flex flex-row gap-8 items-center">
                        <div class="w-full max-w-32">
                            <Card data={identity} details={false} />
                        </div>
                    </div>
                    <div>
                        <div class="columns-group columns columns-2 gap-4">
                            {#each filtered_types as card_type}
                                <div class="grid gap-2" style="break-inside: avoid-column;">
                                    <div class="flex flex-row items-center gap-2">
                                        <Icon name={card_type.id} size="sm" />
                                        <p class="text-lg">{locale(card_type.id)}</p>
                                    </div>
                                    <div class="grid gap-2">
                                        {#if Object.keys(deck.cards[card_type.id] || {}).length > 0}
                                            {#each Object.entries(deck.cards[card_type.id] || {}) as [card_id, quantity]}
                                                <a href="/cards/{card_id}" class="flex flex-row items-center gap-2" use:tooltip={filtered_cards.find(card => card.id === card_id)}>
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
                                            <p class="opacity-60">No cards selected</p>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                        {JSON.stringify(deck.cards, null, 2)}
                    </div>
                </div>
            </div>
            <div>
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
                                        onValueChange={(value) => {
                                            filters.factions = value;
                                            search();
                                        }}
                                        type="multiple"
                                        class="rounded-card-sm border-border bg-background-alt shadow-mini flex items-center gap-x-0.5 border px-[4px] py-1 rounded-md"
                                    >
                                        {#each page.data.factions.filter((faction: Faction) => faction.attributes.side_id === identity.attributes.side_id) as faction}
                                            <ToggleGroup.Item
                                                aria-label={faction.id}
                                                value={faction.id}
                                                class="rounded-9px bg-background-alt hover:bg-muted active:bg-dark-10 data-[state=on]:bg-white data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10 inline-flex size-10 items-center justify-center transition-all active:scale-[0.98] rounded-sm"
                                            >
                                                <Tooltip.Provider>
                                                    <Tooltip.Root delayDuration={200}>
                                                        <Tooltip.Trigger>
                                                            <Icon name={faction.id} />
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Content sideOffset={8}>
                                                            <div
                                                                class="rounded-input border-dark-10 bg-background shadow-popover outline-hidden z-0 flex items-center justify-center border p-3 text-sm font-medium"
                                                            >
                                                                {faction.attributes.name}
                                                            </div>
                                                        </Tooltip.Content>
                                                    </Tooltip.Root>
                                                </Tooltip.Provider>
                                                
                                            </ToggleGroup.Item>
                                        {/each}
                                    </ToggleGroup.Root>
                                </div>
                                <div class="grid gap-2 p-2 border border-border">
                                    <p>Filter by type</p>
                                    <ToggleGroup.Root
                                        bind:value={filters.types}
                                        onValueChange={(value) => {
                                            console.log('Selected types:', value);
                                            filters.types = value;
                                            search();
                                        }}
                                        type="multiple"
                                        class="h-input rounded-card-sm border-border bg-background-alt shadow-mini flex items-center gap-x-0.5 border px-[4px] py-1"
                                    >
                                        {#each filtered_types as card_type}
                                            <ToggleGroup.Item
                                                aria-label={card_type.id}
                                                value={card_type.id}
                                                class="rounded-9px bg-background-alt hover:bg-muted active:bg-dark-10 data-[state=on]:bg-white data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10 inline-flex size-10 items-center justify-center transition-all active:scale-[0.98]"
                                            >
                                                <Tooltip.Provider>
                                                    <Tooltip.Root delayDuration={200}>
                                                        <Tooltip.Trigger>
                                                            <Icon name={card_type.id} />
                                                        </Tooltip.Trigger>
                                                        <Tooltip.Content sideOffset={8}>
                                                            <div
                                                                class="rounded-input border-dark-10 bg-background shadow-popover outline-hidden z-0 flex items-center justify-center border p-3 text-sm font-medium"
                                                            >
                                                                {card_type.attributes.name}
                                                            </div>
                                                        </Tooltip.Content>
                                                    </Tooltip.Root>
                                                </Tooltip.Provider>
                                            </ToggleGroup.Item>
                                        {/each}
                                    </ToggleGroup.Root>
                                </div>
                            </div>
                            <div>
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th>{locale('quantity')}</th>
                                            <th>{locale('name')}</th>
                                            <th>{locale('type')}</th>
                                            <th>{locale('influence')}</th>
                                            <th>{locale('faction')}</th>
                                            <th>{locale('trash')}</th>
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
                                                    <a href="/cards/{result.id}" use:tooltip={result}>
                                                        {result.attributes.title} ({result.attributes.card_cycle_names[0]})
                                                    </a>
                                                </td>
                                                <td>
                                                    <span class="icon-label">
                                                        <Icon name={result.attributes?.card_type_id} size="sm" />
                                                        {locale(result.attributes?.card_type_id)}
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
                                                        {locale(result.attributes?.faction_id)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class="icon-label">
                                                        {#if result.attributes.cost}
                                                            <Icon name="credit" size="sm" />
                                                            {locale(result.attributes?.cost)}
                                                        {:else if result.attributes.memory_cost}
                                                            <Icon name="memory" size="sm" />
                                                            {locale(result.attributes?.memory_cost)}
                                                        {:else if result.attributes.trash_cost}
                                                            <Icon name="trash_cost" size="sm" />
                                                            {locale(result.attributes?.trash_cost)}
                                                        {/if}
                                                    </span>
                                                </td>
                                            </tr>
                                            <!-- <Card data={result} quantity={0} influence={false} /> -->
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </Tabs.Content>
                        <Tabs.Content value="Notes">
                            <div>
                                <label>
                                    <span>Tags</span>
                                    <input type="text" class="w-full" />
                                </label>
                                <small>Tags are for easy filtering in your list of decks, e.g. tournament or glacier.</small>
                            </div>
                            <label>
                                <span>Notes</span>
                                <textarea class="w-full"></textarea>
                            </label>
                            <div>
                                Markdown preview here
                            </div>
                        </Tabs.Content>
                        {#each ['Check', 'History', 'Collection', 'Settings'] as tab}
                            <Tabs.Content value={tab}>
                                {tab}
                            </Tabs.Content>
                        {/each}
                    </Tabs.Root>
                </div>
            </div>
        </div>
        <br/>
        <hr/>
        <br/>
        <p>Want to choose another identity?</p>
        <button onclick={() => reset()}>Choose Another Identity</button>
    </Wrapper>
    <Debug data={[
        filtered_cards,
        filtered_types
    ]} />
    <br/>
{:else if side}
    <Header title="Choose decklist for {side}" inline={false} />
    <Wrapper>
        <Button onclick={() => reset()} variant="outline">Back</Button>
        <ul class="grid gap-2">
            {#each data.identities.filter((_identity: Card) => _identity.attributes.side_id === side) as _identity}
                <Button 
                    class="flex flex-row gap-4 items-center" 
                    onclick={() => {
                        identity = _identity;
                        filters.factions = [_identity.attributes.faction_id];
                        select_identity(_identity.attributes.side_id)
                    }}
                    variant="outline"
                >
                    <Icon name={_identity.attributes.faction_id} size="sm" />
                    <p>{_identity.attributes.title}</p>
                </Button>
            {/each}
        </ul>
    </Wrapper>
{:else}
    <Header title="Create a new decklist" subtitle="Select a side" inline={false} />
    <Wrapper class="grid-cols-2">
        {#each ["corp", "runner"] as _side}
            <div class="grid content-center items-center justify-center border border-border rounded-xl p-8 aspect-video text-center gap-4">
                <h2>Create a {locale(_side)} deck</h2>
                <Button 
                    onclick={() => {
                        side = _side;
                    }}
                >
                    <Icon name={`${_side}_identity`} size="lg" /> 
                    <span>{locale(_side)}</span>
                </Button>
            </div>
        {/each}
    </Wrapper>
{/if}

<Debug data={data} />