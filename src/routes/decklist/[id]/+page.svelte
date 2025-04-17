<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import { format_date } from '$lib/utils';
	import Table from '$lib/components/table/Wrapper.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Header from '$lib/components/Header.svelte';
	import { locales } from '$lib/i18n';
	import Influence from '$lib/components/Influence.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Tabs, DropdownMenu } from 'bits-ui';
	import Notes from '$lib/components/Notes.svelte';
	import { action } from '$lib/utils';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	const count = data.cards.reduce((accumulator, group) => {
		accumulator[group.type] = group.data
			.map((card) => {
				card.quantity = data.meta.attributes.card_slots[card.id] || 0;
				return card;
			})
			.reduce((sum, card) => sum + card.quantity, 0);
		return accumulator;
	}, {});

	// const action = async (
	// 	action: 'download' | 'export',
	// 	format: 'json' | 'txt' | 'otcgn' | 'bbcode' | 'md' | 'jinteki.net'
	// ) => {
	// 	const response = await fetch(
	// 		`/api/decklist/${action}?type=decklist&id=${data.meta.id}&format=${format}`
	// 	);
	// 	const blob = await response.blob();
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = `decklist.${format}`;
	// 	a.click();
	// 	URL.revokeObjectURL(url);
	// };

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
</script>

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
				<div>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>Download</DropdownMenu.Trigger>
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
						<DropdownMenu.Trigger>Export</DropdownMenu.Trigger>
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

					<Button variant="outline" onclick={() => window.print()}>Print</Button>
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
							<div class="max-w-32">
								<Card card={data.identity} />
							</div>
							<div>
								<p>Side: {data.identity.attributes.side_id}</p>
								<div>
									<div class="icon-label">
										<span data-faction-theme={data.identity.attributes.faction_id}>
											<Icon name={data.identity.attributes.faction_id} />
										</span>
										<p>{locales(data.identity.attributes.faction_id)}</p>
									</div>
									<p>{data.identity.attributes.title}</p>
									<p>{data.identity.attributes.text}</p>
									<p>influence_limit: {data.identity.attributes.influence_limit}</p>
									<p>deck limit: {data.identity.attributes.minimum_deck_size} (minimum)</p>
								</div>
							</div>
							<div class="columns columns-2 gap-4">
								{#each data.cards as group}
									<div class="grid gap-2" style="break-inside: avoid-column;">
										<div class="flex flex-row items-center gap-2">
											<Icon name={group.type.toLowerCase()} size="sm" />
											<h2 class="text-lg">{locales(group.type)} ({count[group.type]})</h2>
										</div>
										<div class="grid gap-2">
											{#each group.data as card}
												<a href="/cards/{card.id}" class="flex flex-row items-center gap-2">
													{data.meta.attributes.card_slots[card.id]}x {card.attributes.title}
													<Influence
														value={card.attributes.influence_cost}
														faction={card.attributes.faction_id}
														inline={true}
														text={false}
														total={false}
													/>
												</a>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
						<div>
							<Notes note={data.meta.attributes.notes} />
						</div>
					</div>
				</Tabs.Content>
				<Tabs.Content value="cards" class="select-none pt-3">
					<div class="grid gap-8">
						{#each data.cards as group}
							<div class="grid gap-4">
								<div class="flex flex-row items-center gap-2">
									<Icon name={group.type.toLowerCase()} />
									<h2 class="text-2xl">{locales(group.type)} ({count[group.type]})</h2>
								</div>
								<div class="grid grid-cols-8 gap-4">
									{#each group.data as card}
										<Card
											{card}
											quantity={data.meta.attributes.card_slots[card.id]}
											stacked={true}
										/>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</Tabs.Content>
				<Tabs.Content value="table" class="select-none pt-3 grid gap-8">
					{#each data.cards as group}
						<div class="grid gap-2">
							<div class="flex flex-row items-center gap-2">
								<Icon name={group.type.toLowerCase()} />
								<h2 class="text-2xl">{locales(group.type)} ({count[group.type]})</h2>
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
												<a href="/cards/{card.id}">
													{card.attributes.title}
												</a>
											</td>
											<td>
												{#if card.attributes.influence_cost}
													<Influence
														value={card.attributes.influence_cost}
														faction={card.attributes.faction_id}
													/>
												{:else}
													<span class="not-applicable">-</span>
												{/if}
											</td>
											<td data-faction-theme={card.attributes.faction_id}>
												{#if card.attributes.faction_id}
													<a href="/factions/{card.attributes.faction_id}">
														<Icon name={card.attributes.faction_id} size="sm" />
													</a>
												{:else}
													<span class="not-applicable">-</span>
												{/if}
											</td>
											<!-- <td>
												<span class="icon-label">
													<Icon name={card.attributes.card_type_id} size="sm" />
													{locales(card.attributes.card_type_id)}
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
