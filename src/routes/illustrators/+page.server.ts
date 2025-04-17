import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params, parent }) {

    const illustrators = await query('illustrators?page[size]=999');

    if (illustrators.data.length === 0) {
        throw error(404, 'Illustrators not found');
    }

    return {
        illustrators
    };
}