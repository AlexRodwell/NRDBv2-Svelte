import { error } from '@sveltejs/kit';
import query from '$lib/api';
import type { ApiResponse, Decklist } from '$lib/types.js';

export async function load({ params }) {

    // TODO: Update query strings to use real filters to get the expected results
    const routes: { path: string; title: string; query: string; }[] = [
        {
            path: 'recent', 
            title: 'Recent Decklists',
            query: '?page[size]=30'
        },
        {
            path: 'of-the-week', 
            title: 'Decklists of the Week',
            query: '?page[size]=30'
        },
        {
            path: 'tournament', 
            title: 'Tournament Decklists',
            query: '?page[size]=30&sort=-votes'
        },
        {
            path: 'hot-topics', 
            title: 'Hot Topics Decklists',
            query: '?page[size]=30'
        },
        {
            path: 'hall-of-fame', 
            title: 'Decklist Hall of fame',
            query: '?page[size]=30'
        },
        {
            path: 'mine', 
            title: 'My Decklists',
            query: '?page[size]=30'
        },
        {
            path: 'favorites',
            title: 'Favorite Decklists',
            query: '?page[size]=30'
        }
    ];

    const decklists: ApiResponse<Decklist[]> = await query(`decklists?${routes.find(route => route.path === params.type)?.query}`);

    if (!routes.find(route => route.path === params.type)) {
        throw error(404, 'Route not found');
    }

    return {
        title: routes.find(route => route.path === params.type)?.title,
        decklists: decklists.data
    };
}