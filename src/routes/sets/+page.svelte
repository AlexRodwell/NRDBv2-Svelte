<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import { format_date } from '$lib/utils';
	import { locale } from '$lib/i18n';
	import * as Table from '$lib/components/table';
	interface Props {
		data: any;
	}

	let { data }: Props = $props();
</script>

<Header
	category="Sets"
	title="Card Sets"
	subtitle="All sets, including core sets, expansions, and cycles."
	inline={false}
/>

<Wrapper>
	<table class="results mt-5">
		<thead>
			<tr>
				<th>{locale('name')}</th>
				<th>{locale('cards')}</th>
				<th>{locale('release_date')}</th>
				<th>{locale('publisher')}</th>
				<th>{locale('legality')}</th>
				<th>x</th>
				<th>y</th>
			</tr>
		</thead>
		<tbody>
			{#each data.cycles.data as cycle}
				<tr>
					<Table.Cell>
						<a href={`/cycles/${cycle.id}`}>{cycle.attributes.name}</a>
						<!-- {#if cycle.relationships['card_sets'].data.length === 1}
								{#each cycle.relationships['card_sets'].data as set}
									<a href="/sets/{set.id}">
										{cycle.attributes.name}
									</a>
								{/each}
							{:else}
								<a href="/cycles/{cycle.id}">
									{cycle.attributes.name}
								</a>
							{/if} -->
					</Table.Cell>
					<Table.Cell>{cycle.attributes.size}</Table.Cell>
					<Table.Cell>{format_date(cycle.attributes.date_release)}</Table.Cell>
					<Table.Cell>
						<label class="icon-label">
							<Icon name={cycle.attributes.released_by} size="sm" />
							{locale(cycle.attributes.released_by)}
						</label>
					</Table.Cell>
					<Table.Cell>Standard</Table.Cell>
					<Table.Cell>Startup</Table.Cell>
					<Table.Cell>Eternal</Table.Cell>
				</tr>
				{#if cycle.attributes.card_set_ids.length > 1}
					{#each cycle.attributes.card_set_ids as set_id}
						{#each data.sets.data.filter((s: any) => s.id === set_id) as set}
							<tr>
								<Table.Cell>
									<span class="icon-label">
										<Icon name="subroutine" size="sm" />
										<a href="/sets/{set.id}">{set.attributes.name}</a>
									</span>
								</Table.Cell>
								<Table.Cell>{set.attributes.size}</Table.Cell>
								<Table.Cell>{set.attributes.date_release}</Table.Cell>
								<Table.Cell>
									<span class="icon-label">
										<Icon name={cycle.attributes.released_by} size="sm" />
										{locale(cycle.attributes.released_by)}
									</span>
								</Table.Cell>
								<Table.Cell>Standard</Table.Cell>
								<Table.Cell>Startup</Table.Cell>
								<Table.Cell>Eternal</Table.Cell>
							</tr>
						{/each}
					{/each}
				{/if}
			{/each}
		</tbody>
	</table>

	<!-- {#each data.cycles.data as set}
			<a href="/sets/{set.id}">
				{set.attributes.name}
			</a>
		{/each} -->
</Wrapper>
