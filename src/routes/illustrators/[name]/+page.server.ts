import { error } from '@sveltejs/kit';
import query from '$lib/api';

export async function load({ params, parent }) {

    const illustrator = await query(`illustrators/${params.name}`);
    const printings = await query(`printings?filter[illustrator_id]=${params.name}&page[size]=999`);

    // if (illustrator.data.length === 0) {
    //     throw error(404, 'Illustrators not found');
    // }

    return {
        illustrator,
        printings
    };
}