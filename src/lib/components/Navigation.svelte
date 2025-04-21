<script lang="ts">
	import Language from "$lib/components/Language.svelte";
	import Theme from "$lib/components/Theme.svelte";
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/icons/Icon.svelte";
	import Search from "./Search.svelte";

	const navigation = [
		{
			path: '/decks',
			label: 'My Decks'
		},
		{
			path: '/decklists',
			label: 'Decklists'
		},
		{
			path: '/sets',
			label: 'Sets'
		},
		{
			path: '/factions',
			label: 'Factions'
		},
		{
			path: '/formats',
			label: 'Formats'
		},
		{
			path: '/bans',
			label: 'Bans'
		},
		{
			path: '/rotation',
			label: 'Rotation'
		},
		{
			path: '/reviews',
			label: 'Reviews'
		},
		{
			path: '/rulings',
			label: 'Rulings'
		},
		{
			path: '/illustrators',
			label: 'Illustrators'
		}
	];
</script>

<nav id="navigation" class="bg-foreground border-b border-b-border z-50">
	<div class="container grid grid-cols-[1fr_3fr_1fr] gap-8 py-6">
		<a class="flex flex-row gap-2 items-center text-lg font-semibold" href="/">
			<svg class="max-w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148.2 143.72">
				<polygon fill="#ff0000" points="99.28 99.28 68.46 99.28 68.46 88.71 88.71 88.71 88.71 10.57 10.57 10.57 10.57 88.71 38.71 88.71 38.71 99.28 0 99.28 0 0 99.28 0 99.28 99.28"/>
				<polygon fill="#0000ff" points="148.2 143.72 48.92 143.72 48.92 44.44 79.39 44.44 79.39 54.48 59.5 54.48 59.5 133.15 137.63 133.15 137.63 54.48 109.5 54.48 109.5 44.44 148.2 44.44 148.2 143.72"/>
			</svg>
			NetrunnerDB
		</a>
		<Search />
		<div class="flex flex-row justify-end gap-4">
			<!-- TODO: if user is logged in, hide/replace (both register/login) with account button (edit account, profile link, always be running profile, activity, logout/jackout) -->
			{#if true}
				<Button variant="outline" href="/register">
					<Icon name="subroutine" size="sm" />
					Register
				</Button>
			{/if}
			{#if true}
				<Button variant="outline" href="/login">
					<Icon name="subroutine" size="sm" />
					Login
				</Button>
			{/if}

			<Language />
			<Theme />
		</div>
	</div>
	<div class="border-t border-t-border">
		<div class="container py-4">
			<ul class="flex flex-row justify-center gap-8">
				{#each navigation as { path, label }, index}
					<li>
						<a href={path}>{label}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
