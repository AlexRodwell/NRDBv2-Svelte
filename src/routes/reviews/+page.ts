import query from '$lib/api';

export async function load() {
    const reviews = await query(`reviews`);
    
    return {
        reviews: reviews.data
    };
}