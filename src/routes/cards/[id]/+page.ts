import { error } from '@sveltejs/kit';
import query from '$lib/api';
import type { ApiResponse, Card, Printing, Rulings } from '$lib/types';
import { redirect } from '@sveltejs/kit';

const format_printing_id = (id: string, value: number) => {
    return (parseInt(id) + value).toString().padStart(id.length, '0')
}

export async function load({ params }) {

    let id = params.id;

    // Check if the id is a number, if so, we need to get the card id from the printings endpoint
    if (!isNaN(Number(params.id))) {
        const print_id: ApiResponse<Card> = await query(`printings/${params.id}`);
        id = print_id.data.attributes.card_id;

        throw redirect(302, `/cards/${id}`);
    }

    const card: ApiResponse<Card> = await query(`cards/${id}`);
    const printings: ApiResponse<Printing> = await query(`printings/?filter[card_id]=${id}`);
    const rulings: ApiResponse<any> = await query(`rulings?filter[card_id]=${id}`);
    const reviews: ApiResponse<any> = await query(`reviews?filter[card_id]=${id}`);

    if (!card.data) {
        throw error(404, 'Cards not found');
    }

    const previous = await query(`printings/${format_printing_id(card.data.attributes.printing_ids[0], -1)}`).then(res => res.data.attributes.card_id).catch(e => (null));
    const next = await query(`printings/${format_printing_id(card.data.attributes.printing_ids[0], 1)}`).then(res => res.data.attributes.card_id).catch(e => (null));

    return {
        card: card.data,
        printings: printings.data,
        rulings: rulings.data,
        reviews: reviews.data,
        previous: previous ?? null,
        next: next ?? null
    };
}