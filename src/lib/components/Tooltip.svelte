<script lang="ts">
    import { tooltip } from '$lib/store';
    import { onMount } from 'svelte';
    import Icon from '$lib/components/icons/Icon.svelte';
    import { locale } from '$lib/i18n';
    import FormatText from '$lib/components/FormatText.svelte';
    import Card from '$lib/components/Card.svelte';
	import { page } from '$app/state';

    let tooltip_element: HTMLElement;

    const hide_tooltip = () => {
        tooltip.set({
            element: null,
            visible: false,
            content: null,
            position: {
                x: 0,
                y: 0
            }
        });
    }

    onMount(() => {
        // tooltip_element.addEventListener('mouseleave', () => hide_tooltip());
        window.addEventListener('scroll', () => hide_tooltip());
    });

    $effect(() => {
        // if ($tooltip.visible) {
        //     console.log('Tooltip visible', $tooltip.position.x, $tooltip.position.y);
        //     tooltip_element.style.setProperty('--height', `${tooltip_element.offsetHeight}px`);
        // }

        // Hide tooltip if the page changes
        if (page.url) {
            hide_tooltip();
        }

        // if ($tooltip.visible) {
        //     console.log('Tooltip visible', $tooltip.position.x, $tooltip.position.y);
        // }

        // TODO: add logic to check if the tooltip is outside the viewport and change the position/placement of it, to ensure it is always visible
        // if ($tooltip.visible) {
        //     const rect = tooltip_element.getBoundingClientRect();
        //     const windowWidth = window.innerWidth;
        //     const windowHeight = window.innerHeight;

        //     // Check if the tooltip is overflowing horizontally
        //     if (rect.left < 0) {
        //         tooltip_element.style.setProperty('--left', `0px`);
        //     } else if (rect.right > windowWidth) {
        //         tooltip_element.style.setProperty('--left', `${windowWidth - rect.width}px`);
        //     }

        //     // Check if the tooltip is overflowing vertically
        //     if (rect.top < 0) {
        //         tooltip_element.style.setProperty('--top', `0px`);
        //     } else if (rect.bottom > windowHeight) {
        //         tooltip_element.style.setProperty('--top', `${windowHeight - rect.height}px`);
        //     }
        // }
    })
</script>

<!-- $tooltip.visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0' -->
<div
    bind:this={tooltip_element}
    style="--left: {$tooltip.position.x}px; --top: calc({$tooltip.position.y}px + var(--scroll));"
    class="tooltip"
    data-visible={$tooltip.visible}
>
    {#if $tooltip?.content}
        <!-- <pre>{JSON.stringify($tooltip.content, null, 2)}</pre> -->
        <div class="w-28">
            <Card data={$tooltip.content} details={false} />
        </div>
        <div class="grid gap-2">
            {$tooltip.content?.attributes.title}
            <span class="icon-label text-sm">
                <Icon name={$tooltip.content?.attributes.card_type_id} size="xs" />
                {locale($tooltip.content?.attributes.card_type_id)}
            </span>
            {#if $tooltip.content.attributes?.text}
                <div data-faction-theme={$tooltip.content.attributes.faction_id} class="pl-2 border-l border-l-(--theme)">
                    <FormatText text={$tooltip.content.attributes.text} />
                </div>
            {/if}
        </div>
    {/if}
</div>
