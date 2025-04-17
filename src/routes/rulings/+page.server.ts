import query from '$lib/api';

export async function load() {
    const rulings = await query(`rulings`);
    
    return {
        rulings: rulings.data
    };
}