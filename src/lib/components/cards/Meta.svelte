<script lang="ts">
    interface Props {
        children: any;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    {@render children()}
</svelte:head>