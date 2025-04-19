<script lang="ts">
	import Box from "../Box.svelte";
    import type { Decklist } from "$lib/types";
    import Icon from "$lib/components/icons/Icon.svelte";
    import { locale } from "$lib/i18n";
	import { format_date } from "$lib/utils";
    import Badge from '$lib/components/Badge.svelte';

    interface Props {
        data: Decklist;
    }

    let { data }: Props = $props();
</script>

<Box class="relative grid grid-cols-[5fr_1fr] @max-md/decklist:grid-cols-1 gap-8 overflow-hidden">

    <Icon name={data.attributes.faction_id} size="none" class="!absolute top-0 bottom-0 -left-8 opacity-[2%] scale-200 pointer-events-none" />
    
    <div class="grid gap-2">
        <a href="/faction/{data.attributes.faction_id}" class="icon-label">
            <span data-faction-theme={data.attributes.faction_id}>
                <Icon name={data.attributes.faction_id} size="sm" />
            </span>
            {locale(data.attributes.faction_id)}
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

            <div class="@max-md/decklist:hidden">
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
    </div>
    <div class="grid gap-2 items-center content-center text-center @max-md/decklist:hidden">
        <p>{format_date(data.attributes.created_at)}</p>
        <div class="flex flex-row gap-4">
            <div aria-label="[value] Likes">
                <Icon name="heart" size="sm" />
                19
            </div>
            <div aria-label="[value] Favorites">
                <Icon name="star" size="sm" />
                8
            </div>
            <div aria-label="[value] Comments">
                <Icon name="comment" size="sm" />
                5
            </div>
        </div>
    </div>
</Box>