import { error } from '@sveltejs/kit';
import query from '$lib/api';
import type { ApiResponse, Faction, Card } from '$lib/types';

export const load = async ({ data }) => {
    const factions: ApiResponse<Faction[]> = await query(`factions`);
    const cards: ApiResponse<Card[]> = await query(`cards?page[size]=2500`);

    if (factions.data.length === 0) {
        throw error(404, 'Factions not found');
    }

    if (cards.data.length === 0) {
        throw error(404, 'Cards not found');
    }

    /* const cards_formatted = cards.data.map((card: any) => {
        return {
            id: card.id,
            // type: card.type,
            attributes: {
                title: card.attributes.title,
                card_type_id: card.attributes.card_type_id,
                faction_id: card.attributes.faction_id,
                influence_cost: card.attributes.influence_cost,
                card_cycle_names: card.attributes.card_cycle_names,
                cost: card.attributes.cost,
                memory_cost: card.attributes.memory_cost,
                trash_cost: card.attributes.trash_cost,
                side_id: card.attributes.side_id,
            }
        };
    }); */

    return {
        ...data,
        factions: factions.data,
        cards: cards.data /* cards_formatted */
    };
}