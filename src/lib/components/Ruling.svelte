<script lang="ts">
    import Icon from '$lib/components/icons/Icon.svelte';
    import Box from '$lib/components/Box.svelte';
    // import type { Ruling } from '$lib/types';
    import { format_date } from '$lib/utils';

    interface Props {
        data: { [key: string]: any }; // Ruling;
    }

    let { data }: Props = $props();
</script>

<!-- TODO: improve styling/layout/structure -->
<Box>
    {#if data.attributes.nsg_rules_team_verified}
        <span class="icon-label">
            <Icon name="nsg" />
            Verified
        </span>
    {:else}
        <span> Unverified </span>
    {/if}
    <p>Updated: {format_date(data.attributes.updated_at)}</p>

    <!-- These strings contain markdown, we need to format them -->
    <p>{@html data.attributes.question}</p>
    <p>{@html data.attributes.answer}</p>
</Box>