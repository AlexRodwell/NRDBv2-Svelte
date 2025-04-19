<script lang="ts">
    interface Props {
        children: any;
    }

    const { children }: Props = $props();
</script>

<tr>
    {@render children()}
</tr>