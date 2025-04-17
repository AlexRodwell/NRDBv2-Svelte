import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params, parent }) {

    const cycle = await query(`card_cycles/${params.name}`);
    const cards = await query(`cards?filter[card_cycle_id]=borealis`);

    if (cycle.data.length === 0) {
        throw error(404, 'Cycle not found');
    }

    if (cards.data.length === 0) {
        throw error(404, 'Cards not found');
    }

    return {
        cycle: cycle.data,
        cards: cards.data
    };
}