<script lang="ts">
	import Box from "$lib/components/Box.svelte";
	import Button from "$lib/components/Button.svelte";
	import Wrapper from "$lib/components/Wrapper.svelte";
    import { action } from "$lib/utils";
    import Icon from "$lib/components/icons/Icon.svelte";
    import DecklistRow from "$lib/components/decklist/Row.svelte";
	import Header from "$lib/components/Header.svelte";

    interface Props {
		data: any;
	}

	let { data }: Props = $props();

    const deck_duplicate = (id: string) => {
        // API call to duplicate the deck
    };

    const deck_remove = (id: string) => {
        // API call to delete the deck
    };

    const deck_import = () => {
        // API call to import a deck
    }
</script>

<Header title="Decks" subtitle="Manage your decks" inline={false} />

<Wrapper>
    <div class="grid grid-cols-4 gap-4">
        {#each ['corp', 'runner'] as side}
            <Button
                href={`/decklist/create?side=${side}`}
                variant="outline"
            >
                <Icon name={`${side}_identity`} size="sm" />
                <p>Create new {side} deck</p>
            </Button>
        {/each}
        <Button onclick={() => deck_import()} variant="outline">
            Import deck
        </Button>

        <!-- TODO: add logic to handle download of all decks, should utilise /api/decklist/download -->
        <Button variant="outline">
            Download all decks
        </Button>

        <!--
            Other options:
            "Upload all decks", isn't this just import?
            "Select all"
            "Deselect all"
            "With select": "compare two or more decks", "compare one deck vs the other", "add one or more tags", "remove one or more tags", "clear all tags", "delete all decks selected" (wording of these is poor and should be improved)
        -->
    </div>
    <div class="grid gap-8">
        {#each data.decks as deck}
            <!-- <DecklistRow data={deck} /> -->

            <Box>
                <p>Meta (title, identity, ban list, influence, agenda points, cards, cards up to [set/cycle], too many copies and so on)</p>
    
                <br/>
                <hr/>
                <br/>
    
                <p>List of all cards in deck</p>
    
                <br/>
                <hr/>
                <br/>
    
                <Button href="/decklist/{deck.id}">View</Button>
                <Button href="/decklist/edit/{deck.id}">Edit</Button>
                <Button href="/decklist/publish/{deck.id}">Publish</Button>
                <Button onclick={() => deck_duplicate(deck.id)}>Duplicate</Button>
                <Button onclick={() => deck_remove(deck.id)}>Delete</Button>
                <br/>
    
                <p>Export:</p>
                {#each [{ value: 'json', label: 'JSON' }, { value: 'txt', label: 'Plain text' }, { value: 'otcgn', label: 'OTCGN' }] as { value, label }}
                    <Button onclick={() => {
                        action('download', deck.id, value);
                    }}>
                        {label}
                    </Button>
                {/each}
    
                <p>Created at: [date]</p>
                <p>Updated at: [date]</p>
            </Box>
        {/each}
    </div>
</Wrapper>