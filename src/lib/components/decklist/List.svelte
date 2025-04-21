<script lang="ts">
    import Header from "$lib/components/Header.svelte";
	import Wrapper from "$lib/components/Wrapper.svelte";
    import Button from "$lib/components/Button.svelte";
    import RowDecklist from "$lib/components/decklist/Row.svelte";
    import type { Decklist } from "$lib/types";
    import { locale } from "$lib/i18n";

    interface Props {
        title?: string;
        data: Decklist[];
    }

    let { title = 'Decks', data }: Props = $props();

    const navigation = [
        {
            path: '/search',
            label: locale('Search')
        },
        {
            path: '/decklists',
            label: locale('popular')
        },
        {
            path: '/decklists/recent',
            label: locale('recent')
        },
        {
            path: '/decklists/of-the-week',
            label: locale('decklists of the week')
        },
        {
            path: '/decklists/tournament',
            label: locale('tournaments')
        },
        {
            path: '/decklists/hot-topics',
            label: locale('hot topics')
        },
        {
            path: '/decklists/hall-of-fame',
            label: locale('hall of fame')
        },
        {
            path: '/decklists/mine',
            label: locale('my decklists')
        },
        {
            path: '/decklists/favorites',
            label: locale('my favourites')
        }
    ]
</script>

<Header title={title} inline={false} />

<Wrapper class="grid-cols-[1fr_3fr]">
    <div class="grid gap-2 content-start">
        {#each navigation as item}
            <Button href={item.path} variant="outline">{item.label}</Button>
        {/each}
    </div>
    <div class="grid gap-4">
        {#each data as decklist}
            <RowDecklist data={decklist} />
        {/each}
    </div>
    <!-- TODO: Add pagination -->
</Wrapper>

