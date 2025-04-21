import { redirect } from '@sveltejs/kit';

export async function load() {
    // TODO: add user authentication check
    const auth = true;

    if (!auth) {
        throw redirect(302, '/login');
    }
    
    // TODO: get all of the users decks from the database
    return {
        decks: [{}, {}, {}]
    }
}