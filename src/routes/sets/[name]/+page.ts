import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params }) {

    const set = await query(`card_sets/${params.name}`);
    const cards = await query(`cards?filter[card_set_id]=${params.name}`);

    if (!set.data) {
        throw error(404, 'Sets not found');
    }

    if (cards.data.length === 0) {
        throw error(404, 'Cards not found');
    }

    return {
        set: set.data,
        cards: cards.data
    };
}