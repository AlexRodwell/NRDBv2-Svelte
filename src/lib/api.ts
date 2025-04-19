import { PUBLIC_API_URL } from "$env/static/public";

const query_builder = (parameters: object, prefix = ''): string => {
    const query = Object.entries(parameters).map(([key, value]) => {
        const full_key = prefix ? `${prefix}[${key}]` : key;

        if (Array.isArray(value)) {
            return `${encodeURIComponent(full_key)}=${value.map(encodeURIComponent).join(',')}`;
        } else if (typeof value === 'object' && value !== null) {
            return query_builder(value, full_key);
        }
        return `${encodeURIComponent(full_key)}=${encodeURIComponent(value)}`;
    }).join('&');

    return query ? `?${query}` : '';
}

const query = async (endpoint: string, parameters: object = {}) => {
    const response = await fetch(`${PUBLIC_API_URL}/${endpoint}`); // }${query_builder(parameters)}

    if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }

    return response.json();
}

export const image = (id: string | string[]) => {
    return `https://card-images.netrunnerdb.com/v2/large/${Array.isArray(id) ? id[0] : id}.jpg`;
}

export default query;