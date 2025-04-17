<script>
    import Wrapper from "$lib/components/Wrapper.svelte";
	import { page } from "$app/state";
</script>

<Wrapper>
    <h1>Error {page.status}</h1>
    <p>{page.error?.message}</p>
</Wrapper>