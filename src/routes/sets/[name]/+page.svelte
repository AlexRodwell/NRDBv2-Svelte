<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import Header from '$lib/components/Header.svelte';
	import { format_date } from '$lib/utils';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import Influence from '$lib/components/Influence.svelte';
	import { locale } from '$lib/i18n';
	import { tooltip } from '$lib/actions';
	import * as Table from '$lib/components/table';

	let { data } = $props();
</script>

<Header
	icon={data.set.id}
	category={locale('set')}
	title={data.set.attributes.name}
	inline={false}
>
	{#snippet subtitle()}
		<p>
			Released on <time datetime={data.set.attributes.date_release}
				>{format_date(data.set.attributes.date_release)}</time
			>, by <Icon class="inline" name={data.set.attributes.released_by} size="sm" />
			<a href="/publishers/{data.set.attributes.released_by}"
				>{locale(data.set.attributes.released_by)}</a
			>
		</p>
	{/snippet}
	{#snippet actions()}
		<Button href="/sets/prev" variant="pill">
			{locale('previous')}
		</Button>
		<Button href="/sets/next" variant="pill">
			{locale('next')}
		</Button>
	{/snippet}
</Header>

<Wrapper>
	<div class="grid gap-8">
		<table class="results mt-5">
			<thead>
				<tr>
					<th>{locale('name')}</th>
					<th>{locale('influence')}</th>
					<th>{locale('faction')}</th>
					<th>{locale('type')}</th>
					<th>{locale('subtype')}</th>
					<th>{locale('cost')}</th>
					<th>{locale('trash')}</th>
					<th>{locale('strength')}</th>
				</tr>
			</thead>
			<tbody>
				{#each data.cards as card}
					<tr>
						<Table.Cell>
							<a href="/cards/{card.id}" use:tooltip={card}>
								{card.attributes.title}
							</a>
						</Table.Cell>
						<Table.Cell>
							{#if card.attributes.influence_cost}
								<Influence
									value={card.attributes.influence_cost}
									faction={card.attributes.faction_id}
								/>
							{/if}
						</Table.Cell>
						<Table.Cell>
							<span data-faction-theme={card.attributes.faction_id}>
								<Icon name={card.attributes.faction_id} />
							</span>
							{locale(card.attributes.faction_id)}
						</Table.Cell>
						<Table.Cell>
							<Icon name={card.attributes.card_type_id} size="sm" />
							{locale(card.attributes.card_type_id)}
						</Table.Cell>
						<Table.Cell>
							{card.attributes.display_subtypes}
						</Table.Cell>
						<Table.Cell>
							{#if card.attributes.cost}
								{card.attributes.cost}
								<Icon name="credit" size="sm" />
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if card.attributes.trash_cost}
								<span class="icon-label">
									{card.attributes.trash_cost}
									<Icon name="trash-cost" size="sm" />
								</span>
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if card.attributes.strength}
								<span class="icon-label">
									{card.attributes.strength}
									<Icon name="strength" size="sm" />
								</span>
							{/if}
						</Table.Cell>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Wrapper>
