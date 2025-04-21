import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load() {
    const illustrators = await query('illustrators?page[size]=999');

    return {
        illustrators
    };
}