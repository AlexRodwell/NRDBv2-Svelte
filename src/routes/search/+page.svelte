<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/icons/Icon.svelte";
	import Wrapper from "$lib/components/Wrapper.svelte";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Header title="Advanced Search" inline={false} />

<Wrapper class="grid-cols-2">

    <label class="grid gap-1">
        <span>Side (corp, runner)</span>
        <select>
            <option value="all">All</option>
            {#each data.sides as side}
                <option value={side.id}>{side.attributes.name}</option>
            {/each}
        </select>
    </label>

    <div>
        <span>Factions</span>
        <div class="grid gap-1">
            {#each data.factions as faction}
                <label for={faction.id} class="flex flex-row gap-2">
                    <input type="checkbox" id={faction.id} value={faction.id} />
                    <span class="icon-label">
                        <span data-faction-theme={faction.id}>
                            <Icon name={faction.id} size="sm" />
                        </span>
                        {faction.attributes.name}
                    </span>
                </label>
            {/each}
        </div>
    </div>

    <label class="grid gap-1">
        <span>Card(s)</span>
        <input type="text">
    </label>

    <label class="grid gap-1">
        <span>Sort</span>
        <select>
            <option value="popularity">Popularity</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
            <option value="reputation">Reputation</option>
        </select>
    </label>

    <label class="grid gap-1">
        <span>Rotation</span>
        <!-- Not the best HTML element for UX (most users don't know you can click+drag to multi-select), should be checkboxes instead -->
        <select multiple>
            <option value="all">All</option>
            <option value="rotation1">Rotation 1</option>
            <option value="rotation2">Rotation 2</option>
        </select>
    </label>

    <label class="grid gap-1">
        <span>Author name</span>
        <input type="text">
    </label>

    <label class="grid gap-1">
        <span>Decklist name</span>
        <input type="text">
    </label>

    <label class="grid gap-1">
        <span>Tournament legal</span>
        <select>
            <option value="ignore">Ignore</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    </label>

    <label class="grid gap-1">
        <span>Legality</span>
        <select multiple>
            <option value="all">All</option>
            <option value="legal">Legal</option>
            <option value="banned">Banned</option>
        </select>
    </label>

    <label class="grid gap-1">
        <span>Filter by card pool</span>
        <select>
            {#each data.card_pools as pool}
                <option value={pool.id}>{pool.name}</option>
            {/each}
        </select>
    </label>

    <!-- <label class="grid gap-1">
        <span>Filter by card pack(s)</span>
        <div>
            <input type="checkbox" id="pack1" value="" />
            <input type="checkbox" id="pack2" value="" />
            <input type="checkbox" id="pack3" value="" />
            <input type="checkbox" id="pack4" value="" />
        </div>
    </label> -->

    <label class="grid gap-1">
        <span>Search</span>
        <Button type="button" onclick={() => { /* Function to build search URL and redirect */ }}>Search</Button>
    </label>
    
    {#if data.result}
        Results returned in API response, to be displayed in a table format below:
    {/if}
</Wrapper>