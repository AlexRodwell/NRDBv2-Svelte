<script lang="ts">
    interface Props {
        children?: any;
    }

    let { children }: Props = $props();
</script>

<td>
    <span class="tabel-cell icon-label">
        {@render children?.()}
    </span>
</td>