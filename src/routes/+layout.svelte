<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import SpriteSheet from '$lib/components/icons/SpriteSheetV2.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<SpriteSheet />

<ParaglideJS {i18n}>
	<Navigation />
	<main id="page">
		{#key page.url}
			{@render children()}
		{/key}
	</main>
	<Footer />
</ParaglideJS>
