import query from '$lib/api';

export async function load({ params }) {
    const illustrator = await query(`illustrators/${params.name}`);
    const printings = await query(`printings?filter[illustrator_id]=${params.name}&page[size]=999`);

    return {
        illustrator,
        printings
    };
}