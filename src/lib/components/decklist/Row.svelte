<script lang="ts">
	import Box from "../Box.svelte";
    import type { Decklist } from "$lib/types";
    import Icon from "$lib/components/icons/Icon.svelte";
    import { locales } from "$lib/i18n";
	import { format_date } from "$lib/utils";
    import Badge from '$lib/components/Badge.svelte';

    interface Props {
        data: Decklist;
    }

    let { data }: Props = $props();
</script>

<Box class="relative grid grid-cols-[5fr_1fr] gap-8 overflow-hidden">

    <Icon name={data.attributes.faction_id} size="none" class="!absolute top-0 bottom-0 -left-8 opacity-[2%] scale-200 pointer-events-none" />
    
    <div class="grid gap-2">
        <a href="/faction/{data.attributes.faction_id}" class="icon-label">
            <span data-faction-theme={data.attributes.faction_id}>
                <Icon name={data.attributes.faction_id} size="sm" />
            </span>
            {locales(data.attributes.faction_id)}
        </a>
        <a href="/decklist/{data.id}" class="text-xl">
            {data.attributes.name}
        </a>
        <div class="flex flex-row gap-4">
            <a href="/profile/{data.attributes.user_id}">
                {data.attributes.user_id}
                <!-- TODO: Get user rating -->
                <span>(1337)</span>
            </a>

            <Badge>
                {#snippet icon()}
                    <Icon name="certificate" size="xs" />
                {/snippet}
                2024 Accelerated Meta
            </Badge>
            <Badge>
                {#snippet icon()}
                    <Icon name="rotation" size="xs" />
                {/snippet}
                Test Sixth rotation
            </Badge>
        </div>
    </div>
    <div class="grid gap-2 items-center content-center text-center">
        <p>{format_date(data.attributes.created_at)}</p>
        <div class="flex flex-row gap-4">
            <div>
                <Icon name="likes" size="sm" />
                19 (Likes)
            </div>
            <div>
                <Icon name="favorite" size="sm" />
                8 (Favorites)
            </div>
            <div>
                <Icon name="comments" size="sm" />
                5 (Comments)
            </div>
        </div>
    </div>
</Box>