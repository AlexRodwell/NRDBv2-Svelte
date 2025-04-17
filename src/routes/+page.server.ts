import query from '$lib/api';

export async function load({ params, parent }) {
    const decklists = await query('decklists?page[limit]=10'); // 'decklists?filter[sort]=-created_at&page[limit]=10' // Updated
    const set = await query('card_sets?sort=-date_release&page[size]=1');

    const dotw = decklists.data[0];
    const latestDecklists = decklists.data.slice(0, 10);

    return {
        decks: {
            weekly: dotw, // Deck of the Week
            latest: latestDecklists, // Latest Decklists
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