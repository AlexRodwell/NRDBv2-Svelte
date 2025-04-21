import query from '$lib/api';

export async function load() {
    const formats = await query('formats?page[size]=999');

    return {
        formats: formats.data
    };
}