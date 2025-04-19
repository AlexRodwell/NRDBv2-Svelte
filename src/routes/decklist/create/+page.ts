import { error } from '@sveltejs/kit';
import query from '$lib/api';
import type { ApiResponse, Card, CardType } from '$lib/types';

export const load = async ({ parent, data }) => {
    const identities: ApiResponse<Card[]> = await query(`cards?filter[card_type_id]=runner_identity,corp_identity&page[size]=999`);
    const card_types: ApiResponse<CardType[]> = await query(`card_types`);

    return {
        ...data,
        identities: identities.data,
        card_types: card_types.data
    }
}