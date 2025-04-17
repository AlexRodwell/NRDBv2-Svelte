<script lang="ts">
	interface Props {
		note: string;
	}

	let { note }: Props = $props();

	note = note.replace(/<img data-src/g, '<img src');
</script>

{@html note}
