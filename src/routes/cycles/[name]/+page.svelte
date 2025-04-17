<script lang="ts">
	import Icon from '$lib/components/icons/Icon.svelte';
	import Header from '$lib/components/Header.svelte';
	import { format_date } from '$lib/utils';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import Button from '$lib/components/Button.svelte';
	import { locales } from '$lib/i18n';
	import Influence from '$lib/components/Influence.svelte';

	let { data } = $props();

	const released = new Date(data.cycle.attributes.date_release) < new Date() ? true : false;
</script>

<Header icon={data.cycle.id} category={locales('set')} title={data.cycle.attributes.name} inline={false}>
	{#snippet subtitle()}
		<p>
			{released ? 'Released' : 'To be released'} on
			<time datetime={data.cycle.attributes.date_release}
				>{format_date(data.cycle.attributes.date_release)}</time
			>, by <Icon class="inline" name={data.cycle.attributes.released_by} size="sm" />
			<a href="/publishers/{data.cycle.attributes.released_by}"
				>{locales(data.cycle.attributes.released_by)}</a
			>
		</p>
	{/snippet}
	{#snippet actions()}
		<Button href="/sets/prev" variant="pill">
			{locales('previous')}
		</Button>
		<Button href="/sets/next" variant="pill">
			{locales('next')}
		</Button>
	{/snippet}
</Header>

<Wrapper>
	<div class="grid gap-8">
		<table class="results mt-5">
			<thead>
				<tr>
					<th>{locales('name')}</th>
					<th>{locales('influence')}</th>
					<th>{locales('faction')}</th>
					<th>{locales('type')}</th>
					<th>{locales('subtype')}</th>
					<th>{locales('cost')}</th>
					<th>...</th>
					<th>{locales('strength')}</th>
				</tr>
			</thead>
			<tbody>
				{#each data.cards as card}
					<tr>
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
							<Icon name={card.attributes.faction_id} />
						</td>
						<td>
							<span class="icon-label">
								<Icon name={card.attributes.card_type_id} size="sm" />
								{locales(card.attributes.card_type_id)}
							</span>
						</td>
						<td>
							<span class="icon-label">
								{card.attributes.display_subtypes}
							</span>
						</td>
						<td>
							{#if card.attributes.cost}
								<span class="icon-label">
									{card.attributes.cost}
									<Icon name="credit" size="sm" />
								</span>
							{/if}
						</td>
						<td>
							{#if card.attributes.trash_cost}
								<span class="icon-label">
									{card.attributes.trash_cost}
									<Icon name="trash-cost" size="sm" />
								</span>
							{/if}
						</td>
						<td>
							{#if card.attributes.strength}
								<span class="icon-label">
									{card.attributes.strength}
									<Icon name="strength" size="sm" />
								</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Wrapper>
