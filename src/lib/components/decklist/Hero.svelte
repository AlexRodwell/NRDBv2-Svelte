<script lang="ts">
    import Icon from '$lib/components/icons/Icon.svelte';
    import Card from '$lib/components/Card.svelte';
	import Influence from '../Influence.svelte';
    import Notes from '../Notes.svelte';

    interface Props {
        decklist: any;
    }

    let { decklist }: Props = $props();
</script>

<div class="decklist-box">
    <div class="d-flex mx-2">
        <div class="visible-lg" style="width:200px">
            <Card card={decklist} details={false} />
        </div>
        <div class="decklist-stats ms-4">
            <Icon name={decklist.attributes.faction_id} />
            <p>{decklist.attributes.name}</p>
            <p class="decklist-identity-name">
                {decklist.attributes.identity_card_id}
            </p>

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
            <a id="ember116" class="ember-view button decklist-box-button" href="/decklist/27de800e-e148-40c2-9bd3-6f89c82cb162">
                
    <svg viewBox="0 0 5867 5867" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" fill="#999" height="1em" style="max-width: 100%; transform: translateY(-2px)"><path d="M5743.67 3576.01l-1621.44 1533v-1232.3H254.36V1058.35h583.718V3275.3h3284.16V2043l1621.44 1533z" fill-rule="nonzero" data-name="Layer 1"></path></svg>

                View deck
            </a>
        </div>
    </div>
    <Notes note={decklist.attributes.notes} />
</div>
