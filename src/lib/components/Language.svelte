<script>
	import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime.js"
	import { i18n } from '$lib/i18n'
	import { page } from '$app/state';
    import { Tabs, DropdownMenu } from 'bits-ui';
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <!-- Language -->
        <!-- SVG from https://lucide.dev/icons/languages -->
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages-icon lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
        <DropdownMenu.Content
            class="border-muted bg-background shadow-popover outline-hidden focus-visible:outline-hidden w-[229px] rounded-xl border px-1 py-1.5 grid gap-2"
            sideOffset={8}
        >
            {#each availableLanguageTags as lang}
                <a 
                    href={i18n.route(page.url.pathname)}
                    hreflang={lang}
                    aria-current={lang === languageTag() ? "page" : undefined}
                >
                    {lang}
                </a>
            {/each}
        </DropdownMenu.Content>
    </DropdownMenu.Portal>
</DropdownMenu.Root>

