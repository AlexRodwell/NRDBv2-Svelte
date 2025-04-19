<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { format_date } from '$lib/utils';
	import Table from '$lib/components/table/Wrapper.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Header from '$lib/components/Header.svelte';
	import { locale } from '$lib/i18n';
	import Influence from '$lib/components/Influence.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Tabs, DropdownMenu } from 'bits-ui';
	import Notes from '$lib/components/Notes.svelte';
	import { action, group_cards_by_type, card_quantity } from '$lib/utils';
	import { tooltip } from '$lib/actions';
	import Meta from '$lib/components/cards/Meta.svelte';
	import DecklistContent from '$lib/components/decklist/Content.svelte';
	import { page } from '$app/state';
	import { image } from '$lib/api';
	import { corp_identity } from '$lib/paraglide/messages';
	
	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	const grouped_cards = group_cards_by_type(data.cards);
    const count = card_quantity(data.meta, grouped_cards);

	const share = async () => {
		try {
			await navigator.share({
				title: data.meta.attributes.name,
				text: `Decklist by ${data.meta.attributes.user_id}`,
				url: window.location.href
			});
		} catch (err) {
			console.error('Error sharing:', err);
		}
	};

	const print = () => {
		window.print()
	}
</script>

<Meta>
	<title>{data.meta.attributes.name}</title>
	<meta name="description" content={`A ${locale(data.identity.attributes.faction_id)} deck by ${data.meta.attributes.user_id}`} />
	<meta name="og:title" content={data.meta.attributes.name} />
	<meta name="og:description" content={`A ${locale(data.identity.attributes.faction_id)} deck by ${data.meta.attributes.user_id}`} />
	<!-- <meta name="og:image" content={data.identity.attributes.image_url} /> -->
	<meta name="og:url" content={page.url} />
	<meta name="og:updated_time" content={data.meta.attributes.updated_at} />
	<meta name="og:published_time" content={data.meta.attributes.created_at} />
</Meta>

<Header icon={data.meta.attributes.faction_id} title={data.meta.attributes.name} inline={false}>
	{#snippet subtitle()}
		<a href="/profile/{data.meta.attributes.user_id}">{data.meta.attributes.user_id}</a>
		<span
			>{format_date(data.meta.attributes.created_at)} (updated: {format_date(
				data.meta.attributes.updated_at
			)})</span
		>
	{/snippet}
</Header>

<Wrapper class="grid gap-8 content-start">
	<Tabs.Root value="decklist">
		<Tabs.List class="flex space-between">
			<div class="grid grid-cols-[1fr_auto] space-between w-full">
				<div>
					<Tabs.Trigger
						value="decklist"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						decklist
					</Tabs.Trigger>
					<Tabs.Trigger
						value="sets"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						sets
					</Tabs.Trigger>
					<Tabs.Trigger
						value="info"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						info
					</Tabs.Trigger>
					<Tabs.Trigger
						value="actions"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						actions
					</Tabs.Trigger>
				</div>
				<div class="flex flex-row gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button type="p" variant="outline">Download</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								class="border-muted bg-background shadow-popover outline-hidden focus-visible:outline-hidden w-[229px] rounded-xl border px-1 py-1.5"
								sideOffset={8}
							>
								{#each [{ value: 'json', label: 'JSON' }, { value: 'txt', label: 'Plain text' }, { value: 'otcgn', label: 'OTCGN' }] as { value, label }}
									<DropdownMenu.Item onclick={() => action('download', data.meta.id, value)}>
										{label}
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Button type="p" variant="outline">Export</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								class="border-muted bg-background shadow-popover outline-hidden focus-visible:outline-hidden w-[229px] rounded-xl border px-1 py-1.5"
								sideOffset={8}
							>
								{#each [{ value: 'bbcode', label: 'bbCode' }, { value: 'md', label: 'Markdown (Reddit)' }, { value: 'txt', label: 'Plain text' }, { value: 'jinteki.net', label: 'Jinteki.net format' }] as { value, label }}
									<DropdownMenu.Item onclick={() => action('export', data.meta.id, value)}>
										{label}
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>

					<Button variant="outline" onclick={() => print()}>Print</Button>
					<Button variant="outline" onclick={() => share()}>share</Button>
				</div>
			</div>
		</Tabs.List>
		<Tabs.Content value="decklist" class="select-none pt-3">
			<Tabs.Root value="default">
				<Tabs.List class="flex flex-row gap-4">
					<Tabs.Trigger
						value="default"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						default
					</Tabs.Trigger>
					<Tabs.Trigger
						value="cards"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						cards
					</Tabs.Trigger>
					<Tabs.Trigger
						value="table"
						class="bg-transparent py-2 px-4 data-[state=active]:bg-white data-[state=active]:text-black"
					>
						table
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="default">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<div class="max-w-32" use:tooltip={data.identity}>
								<Card data={data.identity} />
							</div>
							<div>
								<p>Side: {data.identity.attributes.side_id}</p>
								<div>
									<div class="icon-label">
										<span data-faction-theme={data.identity.attributes.faction_id}>
											<Icon name={data.identity.attributes.faction_id} />
										</span>
										<p>{locale(data.identity.attributes.faction_id)}</p>
									</div>
									<p>{data.identity.attributes.title}</p>
									<p>{data.identity.attributes.text}</p>
									<p>influence_limit: {data.identity.attributes.influence_limit}</p>
									<p>deck limit: {data.identity.attributes.minimum_deck_size} (minimum)</p>
								</div>
							</div>
							<p>Decklist contents:</p>
							<DecklistContent meta={data.meta} cards={data.cards} />
						</div>
						<div>
							<Notes note={data.meta.attributes.notes} />
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content value="cards" class="select-none pt-3">
					<div class="grid gap-8">
						{#each grouped_cards as group}
							<div class="grid gap-4">
								<div class="flex flex-row items-center gap-2">
									<Icon name={group.type.toLowerCase()} />
									<h2 class="text-2xl">{locale(group.type)} ({count[group.type]})</h2>
								</div>
								<div class="grid grid-cols-8 gap-4">
									{#each group.data as card}
										<div use:tooltip={card}>
											<Card
												data={card}
												quantity={data.meta.attributes.card_slots[card.id]}
												stacked={true}
											/>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</Tabs.Content>
				<Tabs.Content value="table" class="select-none pt-3 grid gap-8">
					{#each grouped_cards as group}
						<div class="grid gap-2">
							<div class="flex flex-row items-center gap-2">
								<Icon name={group.type.toLowerCase()} />
								<h2 class="text-2xl">{locale(group.type)} ({count[group.type]})</h2>
							</div>
							<Table
								headColumns={[
									'Qty.',
									'Name',
									'Influence',
									'Faction',
									// 'Type',
									'Subtype',
									'Cost',
									'...',
									'Strength'
								]}
							>
								{#snippet body()}
									{#each group.data as card}
										<tr>
											<td>
												<span
													class="flex aspect-square w-full max-w-6 items-center justify-center rounded-sm bg-[#262626] text-center text-sm"
												>
													{data.meta.attributes.card_slots[card.id]}
												</span>
											</td>
											<td>
												<a href="/cards/{card.id}" use:tooltip={card}>
													{card.attributes.title}
												</a>
											</td>
											<td>
												{#if card.attributes.influence_cost}
													<Influence
														value={card.attributes.influence_cost}
														faction={card.attributes.faction_id}
													/>
												{/if}
											</td>
											<td data-faction-theme={card.attributes.faction_id}>
												{#if card.attributes.faction_id}
													<a href="/faction/{card.attributes.faction_id}" title={locale(card.attributes.faction_id)}>
														<Icon name={card.attributes.faction_id} size="sm" />
														{locale(card.attributes.faction_id)}
													</a>
												{/if}
											</td>
											<!-- <td>
												<span class="icon-label">
													<Icon name={card.attributes.card_type_id} size="sm" />
													{locale(card.attributes.card_type_id)}
												</span>
											</td> -->
											<td>{card.attributes.display_subtypes}</td>
											<td>
												<span class="icon-label">
													<Icon name="credit" size="sm" />
													{card.cost}
												</span>
											</td>
											<td>
												{#if card.attributes.card_type_id === 'agenda'}
													<span class="icon-label">
														{card.attributes.agenda_points ?? ''}
														<Icon name="agenda" size="sm" />
													</span>
												{:else if card.attributes.trash_cost}
													<span class="icon-label">
														{card.attributes.trash_cost ?? ''}
														<Icon name="trash" size="sm" />
													</span>
												{/if}
											</td>
											<td>
												{#if card.attributes.strength}
													<span class="icon-label">
														{card.attributes.strength ?? ''}
														<Icon name="strength" size="sm" />
													</span>
												{/if}
											</td>
										</tr>
									{/each}
								{/snippet}
							</Table>
						</div>
					{/each}
				</Tabs.Content>
			</Tabs.Root>
		</Tabs.Content>
		<Tabs.Content value="sets">
			<div class="grid gap-2">
				{#each data.sets as set}
					<a href="/sets/{set.id}">{set.attributes.name}</a>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="info">info</Tabs.Content>
		<Tabs.Content value="actions">actions</Tabs.Content>
	</Tabs.Root>
</Wrapper>

<div class="printer not-print:hidden">
	{#each [data.identity, ...data.cards] as card}
		<!-- Get the quantity of the card from the meta data (decklist), add copies for total quantity -->
		{#each Array(data.meta.attributes.card_slots[card.id]) as _}
			<!-- TODO: these printings might include FFG art, which we probably can't allow to be printed, we need to add some logic, at some step to ensure we're using NSG art -->
			<div style="background-image: url({image(card.attributes.printing_ids)});"></div>
		{/each}
	{/each}
</div>