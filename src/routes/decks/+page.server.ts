import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
    // TODO: Add user authentication check, as this page is only for logged in users

    // Return users decks
    if (true) {
        return {
            decks: [{}, {}, {}]
        }
    }

    throw redirect(302, '/login');
}