import query from '$lib/api';

export async function load() {
    const decklists = await query(`decklists?page[size]=30`);

    return {
        decklists: decklists.data
    };
}