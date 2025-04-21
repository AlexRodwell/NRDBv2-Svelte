import query from '$lib/api';

export async function load() {
    const sides = await query(`sides`);
    const factions = await query(`factions`);
    const card_pools = await query(`card_pools`);

    return {
        sides: sides.data,
        factions: factions.data,
        pools: card_pools.data,
        result: false
    };
}