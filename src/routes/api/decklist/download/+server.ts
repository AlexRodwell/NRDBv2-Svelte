import type { RequestHandler } from './$types';
import query from '$lib/api';

export const GET: RequestHandler = async ({ request }) => {

    const headers = request.headers;

    const params = new URL(request.url).searchParams;

    const type = params.get('type');
    const id = params.get('id');
    const format = params.get('format');

    if (!type || !id || !format) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Missing required parameters: type, id, format'
        }), { status: 400 });
    }

    if (format !== 'json' && format !== 'txt' && format !== 'otcgn') {
        return new Response(JSON.stringify({
            success: false,
            message: 'Invalid format parameter. Must be json, txt, or otcgn.'
        }), { status: 400 });
    }

    if (type !== 'decklist') {
        return new Response(JSON.stringify({
            success: false,
            message: 'Invalid type parameter. Must be decklist.'
        }), { status: 400 });
    }

    const decklist = await query(`decklists?filter[id]=${id}`);

    let fileContent: string = '';

    switch (format) {
        case 'json':
            // fileContent = JSON.stringify({ type, id, format });
            return new Response(JSON.stringify(decklist.data[0], null, 2), { status: 200 });
            break;
        case 'txt':
            // fileContent = `type: ${type}\nid: ${id}\nformat: ${format}`;
            return new Response(decklist.data, {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            break;
        case 'otcgn':
            const fileContent = `[${type}]\nname=${id}\nformat=${format}`;
            return new Response(fileContent, {
                status: 200,
                headers: {
                    'Content-Type': 'text/xml'
                }
            });
            break;
    }
}