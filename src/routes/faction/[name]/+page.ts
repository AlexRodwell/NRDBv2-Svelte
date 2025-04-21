import { error } from '@sveltejs/kit';
import query from '$lib/api';
import type { SidesIds, FactionIds, Card, CardTypeIds, ApiResponse, Decklist } from '$lib/types'

export async function load({ params }) {

    const faction = await query(`factions/${params.name}`);
    let card_type_id: Extract<CardTypeIds, 'corp_identity' | 'runner_identity'> = 'corp_identity'

    const factions: { [key in SidesIds]: FactionIds[] } = {
        corp: ["haas_bioroid", "jinteki", "nbn", "weyland_consortium", "neutral_corp"],
        runner: ["anarch", "criminal", "shaper", "adam", "apex", "sunny_lebeau", "neutral_runner"],
    }

    if (factions.corp.includes(params.name as FactionIds)) {
        card_type_id = 'corp_identity';
    } else if (factions.runner.includes(params.name as FactionIds)) {
        card_type_id = 'runner_identity';
    }

    const identities = await query(`cards?filter[faction_id]=${params.name}&filter[card_type_id]=${card_type_id}`);
    const identity_ids = identities.data.map((identity: Card) => identity.id);

    // Fetch the decklists for each identity in parallel
    // Use Promise.all to wait for all the requests to complete
    // Probably not the best way to do this, but it works for now
    const decks: ApiResponse<Decklist[]> = await Promise.all(identity_ids.map(async (identity_id: string) => {
        return await query(`decklists?filter[identity_card_id]=${identity_id}&page[size]=5`); // &sort=-votes
    })).then((responses) => {
        const decks_by_identity = responses.reduce((accumulator, response, index) => {
            accumulator[identity_ids[index]] = response.data;
            return accumulator;
        }, {});

        return decks_by_identity;
    });

    if (!faction.data) {
        throw error(404, 'Faction not found');
    }

    if (identities.data.length === 0) {
        throw error(404, 'Identities not found');
    }

    return {
        faction: faction.data,
        identities: identities.data,
        decks: decks,
    };
}