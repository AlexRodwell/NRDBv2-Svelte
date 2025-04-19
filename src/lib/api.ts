import { PUBLIC_API_URL } from "$env/static/public";

const query = async (endpoint: string, parameters: object = {}) => {
    const response = await fetch(`${PUBLIC_API_URL || 'https://api-preview.netrunnerdb.com/api/v3/public'}/${endpoint}`);

    if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    return response.json();
}

export const image = (id: string | string[]) => {
    return `https://card-images.netrunnerdb.com/v2/large/${Array.isArray(id) ? id[0] : id}.jpg`;
}

export default query;