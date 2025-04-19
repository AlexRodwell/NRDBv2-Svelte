
<script lang="ts">
    let { data }: { data: any } = $props();
</script>

{#if import.meta.env.DEV}
	{#each Object.entries(data) as [key, value]}
		<details>
			<summary>{key}</summary>
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</details>
	{/each}
{/if}