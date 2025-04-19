<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { i18n } from '$lib/i18n';

	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import SpriteSheet from '$lib/components/icons/SpriteSheetV2.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { page } from '$app/state';
	import { tooltip } from '$lib/store';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		document.body.style.setProperty('--scroll', `${window.scrollY}px`);

		window.addEventListener('scroll', () => {
			document.body.style.setProperty('--scroll', `${window.scrollY}px`);
		});

		// Remove the event listener when the component is destroyed
		return () => {
			window.removeEventListener('scroll', () => {
				document.body.style.setProperty('--scroll', `${window.scrollY}px`);
			});
		};
	});
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
	<Tooltip />
</ParaglideJS>
