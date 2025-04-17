<script lang="ts">
    import { onMount } from 'svelte';
	import { Label, Switch } from "bits-ui";

    let theme = $state<'light' | 'dark'>('light');
    let is_dark = $derived<boolean>(theme === 'dark');

    onMount(() => {
        is_dark = (localStorage.getItem('theme') as 'light' | 'dark') === 'dark';
        theme = (localStorage.getItem('theme') as 'light' | 'dark');
    });

    const set_theme = () => {
        theme = theme === 'light' ? 'dark' : 'light';
        is_dark = theme === 'dark';
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };
</script>

<!-- <button onclick={set_theme}>
    Theme: {theme}
</button> -->

<div class="flex items-center space-x-3">
    <Switch.Root
        id="dnd"
        name="hello"
        class="border border-border data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        bind:checked={is_dark}
        onclick={set_theme}
    >
        <Switch.Thumb
        class="border border-border pointer-events-none block size-6 shrink-0 rounded-full transition-transform data-[state=checked]:bg-white data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
        />
    </Switch.Root>
    <Label.Root for="dnd" class="text-sm font-medium">{theme}</Label.Root>
</div>