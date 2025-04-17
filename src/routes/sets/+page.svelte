<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/icons/Icon.svelte';
	import Wrapper from '$lib/components/Wrapper.svelte';
	import { format_date } from '$lib/utils';
	import { locales } from '$lib/i18n';

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

<Wrapper class="grid gap-8">
	<table class="results mt-5">
		<thead>
			<tr>
				<th>{locales('name')}</th>
				<th>{locales('cards')}</th>
				<th>{locales('release_date')}</th>
				<th>{locales('publisher')}</th>
				<th>{locales('legality')}</th>
				<th>x</th>
				<th>y</th>
			</tr>
		</thead>
		<tbody>
			{#each data.cycles.data as cycle}
				<tr>
					<td>
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
					</td>
					<td>{cycle.attributes.size}</td>
					<td>{format_date(cycle.attributes.date_release)}</td>
					<td>
						<label class="icon-label">
							<Icon name={cycle.attributes.released_by} size="sm" />
							{locales(cycle.attributes.released_by)}
						</label>
					</td>
					<td>Standard</td>
					<td>Startup</td>
					<td>Eternal</td>
				</tr>
				{#if cycle.attributes.card_set_ids.length > 1}
					{#each cycle.attributes.card_set_ids as set_id}
						{#each data.sets.data.filter((s: any) => s.id === set_id) as set}
							<tr>
								<td>
									<span class="icon-label">
										<Icon name="subroutine" size="sm" />
										<a href="/sets/{set.id}">{set.attributes.name}</a>
									</span>
								</td>
								<td>{set.attributes.size}</td>
								<td>{set.attributes.date_release}</td>
								<td>
									<span class="icon-label">
										<Icon name={cycle.attributes.released_by} size="sm" />
										{locales(cycle.attributes.released_by)}
									</span>
								</td>
								<td>Standard</td>
								<td>Startup</td>
								<td>Eternal</td>
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
