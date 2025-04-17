// import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ request }) {
    const params = new URL(request.url).searchParams;
    const identity = params.get('identity') ? await query(`cards/${params.get('identity')}`) : null;
    const identities = await query(`cards?filter[card_type_id]=runner_identity,corp_identity&page[size]=999`);
    const card_types = await query(`card_types`);
    
    return {
        identity: identity ? identity.data : null,
        side: params.get('side') ?? identity?.data?.[0]?.attributes?.side_id ?? null,
        identities: identities.data,
        card_types: card_types.data
    }
}