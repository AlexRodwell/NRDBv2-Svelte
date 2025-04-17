<script lang="ts">
	interface Props {
		columns: string[];
	}

	let { columns }: Props = $props();
</script>

<thead>
	<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
	</tr>
</thead>
