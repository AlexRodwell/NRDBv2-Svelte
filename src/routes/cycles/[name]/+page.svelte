<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import Header from '$lib/components/Header.svelte';
	import { format_date } from '$lib/utils';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import { locale } from '$lib/i18n';
	import Influence from '$lib/components/Influence.svelte';
	import { tooltip } from '$lib/actions';
	import * as Table from '$lib/components/table';

	let { data } = $props();

	const released = new Date(data.cycle.attributes.date_release) < new Date() ? true : false;
</script>

<Header icon={data.cycle.id} category={locale('cycle')} title={data.cycle.attributes.name} inline={false}>
	{#snippet subtitle()}
		<p>
			{released ? 'Released' : 'To be released'} on
			<time datetime={data.cycle.attributes.date_release}
				>{format_date(data.cycle.attributes.date_release)}</time
			>, by <Icon class="inline" name={data.cycle.attributes.released_by} size="sm" />
			<a href="/publishers/{data.cycle.attributes.released_by}"
				>{locale(data.cycle.attributes.released_by)}</a
			>
		</p>
	{/snippet}
	{#snippet actions()}
		<Button href="/sets/prev" variant="outline">
			{locale('previous')}
		</Button>
		<Button href="/sets/next" variant="outline">
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
					<Table.Row>
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
								<Icon name={card.attributes.faction_id} size="sm" />
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
								{card.attributes.trash_cost}
								<Icon name="trash" size="sm" />
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if card.attributes.strength}
								{card.attributes.strength}
								<Icon name="strength" size="sm" />
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			</tbody>
		</table>
	</div>
</Wrapper>
