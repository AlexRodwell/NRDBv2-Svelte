import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params, parent }) {

    // card_sets
    const formats = await query('formats?page[size]=999');

    if (formats.data.length === 0) {
        throw error(404, 'Cycles not found');
    }

    return {
        formats: formats.data
    };
}