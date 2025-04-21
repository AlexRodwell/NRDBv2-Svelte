import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params }) {
    // TODO: Add user authentication check, as this page is only for logged in users, and to check if this deck belongs to the user

    const deck = await query(`decklists?filter[id]=${params.id}`);
    const cards = await query(`cards?filter[decklist_id]=${deck.data[0].id}`);

    if (!deck.data[0]) {
        throw error(404, 'Deck not found');
    }

    if (cards.data.length === 0) {
        throw error(404, 'Cards not found');
    }

    return {
        meta: deck.data[0],
        cards: cards.data
    };
}