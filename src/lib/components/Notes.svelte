<script lang="ts">
    import { tooltip } from '$lib/actions';
    import Icon from "$lib/components/icons/Icon.svelte";
    interface Props {
        note: string;
    }

    let { note }: Props = $props();


    // Function to parse the note into segments
    function note_formatted(note: string) {
        const paragraphs = note.split(/<\/?p>/).filter(paragraph => paragraph.trim());

        const segments = paragraphs.map(paragraph => {
            const paragraph_segments: Array<{ type: 'text' | 'link'; content: string; href?: string; external?: 'true' | 'false' }> = [];
            let current = paragraph;
            let match;

            // Find all <a> tags in the paragraph
            while ((match = /<a.*?href=["'](.*?)["'].*?>(.*?)<\/a>/i.exec(current))) {
                const [full_match, href, content] = match;
                const index = current.indexOf(full_match);

                // Add the text before the link
                if (index > 0) {
                    paragraph_segments.push({ type: 'text', content: current.substring(0, index) });
                }

                // Add the link
                paragraph_segments.push({
                    type: 'link',
                    content,
                    href,
                    external: href.startsWith('http') && !href.startsWith('https://netrunnerdb.com/') ? 'true' : 'false'
                });

                current = current.substring(index + full_match.length);
            }

            // Add the remaining text
            if (current.length > 0) {
                paragraph_segments.push({ type: 'text', content: current });
            }

            return paragraph_segments;
        });

        return segments;
    }

    const segments = note_formatted(note);
</script>

<!-- Render the parsed segments -->
<div class="content">
    {#each segments as paragraph}
        <p>
            {#each paragraph as segment}
                {#if segment.type === 'text'}
                    {@html segment.content}
                {:else if (segment.type === 'link')}

                    {#if segment.href.includes('/card/')}
                        <!-- TODO: pass in correct card data into use:tooltip={} parameter, current note data all uses printing ID's for card, instead of the id (slugified title), which is required in this svelte setup, as it's based on the new API (api-preview) -->
                        <!-- use:tooltip={{}} - removed from <a> for now to avoid errors -->
                        <a href={segment.href}>
                            {@html segment.content}
                        </a>
                    {:else}
                        <a class="icon-label" href={segment.href} data-external={segment.external}>
                            {@html segment.content}
                            {#if segment.href?.includes('alwaysberunning.net')}
                                <Icon name="alwaysberunning" size="sm" />
                            {:else}
                                <Icon name="external" size="sm" />
                            {/if}
                        </a>
                    {/if}
                {/if}
            {/each}
        </p>
    {/each}
</div>
