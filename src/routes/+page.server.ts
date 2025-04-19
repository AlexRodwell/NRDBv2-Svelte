import query from '$lib/api';
import type { ApiResponse, Card, Decklist } from '$lib/types';

export async function load({ params, parent }) {
    const decklists: ApiResponse<Decklist[]> = await query('decklists?page[limit]=10'); // 'decklists?filter[sort]=-created_at&page[limit]=10' // Updated
    const set: ApiResponse<any[]> = await query('card_sets?sort=-date_release&page[size]=1');

    const dotw_id: ApiResponse<Card> = await query(`cards/${decklists.data[0].attributes.identity_card_id}`);
    const dotw_cards: ApiResponse<Card> = await query(`cards?filter[decklist_id]=${decklists.data[0].id}`);

    return {
        decks: {
            weekly: {
                identity: dotw_id.data,
                decklist: decklists.data[0],
                cards: dotw_cards.data
            },
            latest: decklists.data.slice(0, 10)
        },
        ...(new Date(set.data[0].attributes.date_release) > new Date() ?
            {
                upcoming_set: set.data[0],
                latest_set: false
            } : {
                upcoming_set: false,
                latest_set: set.data[0]
            }),
    };
}