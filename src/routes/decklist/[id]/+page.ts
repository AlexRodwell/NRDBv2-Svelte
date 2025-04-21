import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params }) {

    const decklist = await query(`decklists?filter[id]=${params.id}`);

    if (!decklist.data[0]) {
        throw error(404, 'Decklist not found');
    }

    const identity = await query(`cards/${decklist.data[0].attributes.identity_card_id}`);
    const cards = await query(`cards?filter[decklist_id]=${decklist.data[0].id}`);
    const _sets = [
        ...new Set(
            cards.data?.flatMap((card: any) => card.attributes.card_set_ids).filter(Boolean) ?? []
        )
    ];

    const sets = await query(`card_sets?filter[card_cycle_id]=${_sets.join(',')}`);

    return {
        meta: decklist.data[0],
        identity: identity.data,
        cards: cards.data,
        sets: sets.data
    };
}