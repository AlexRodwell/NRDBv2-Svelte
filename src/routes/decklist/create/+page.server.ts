import query from '$lib/api';
import type { ApiResponse, Card } from '$lib/types';

export async function load({ parent, request }) {
    const params = new URL(request.url).searchParams;
    
    const identity = params.get('identity') ?? null;
    const side = params.get('side') ?? null;

    if (identity) {
        const identity: ApiResponse<Card[]> = await query(`cards/${params.get('identity')}`);

        if (identity.data.length === 0) {
            // throw error(404, 'Identity not found');
            return {
                identity: null,
                side: side ?? null,
            }
        }

        return {
            identity: identity.data,
            side: identity.data[0].attributes.side_id,
        }
    }
    
    return {
        identity: null,
        side: side ?? null
    }
}