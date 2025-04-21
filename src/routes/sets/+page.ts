import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load() {
    const cycles = await query('card_cycles?sort=-date_release&page[size]=999');
    const sets = await query('card_sets?sort=-date_release&page[size]=999');

    if (cycles.data.length === 0) {
        throw error(404, 'Cycles not found');
    }

    if (sets.data.length === 0) {
        throw error(404, 'Sets not found');
    }

    return {
        cycles,
        sets
    };
}