<script lang="ts">
	interface Props {
		name: // | 'upgrade'
		// | 'operation'
		// | 'event'
		// | 'identity'
		// | 'agenda'
		// | 'ice'
		// | 'asset'
		// | 'hardware'
		// | 'program'
		// | 'resource'
		// | 'weyland_consortium'
		// | 'anarch'
		// | 'shaper'
		// | 'nbn'
		// | 'haas_bioroid'
		// | 'criminal'
		// | 'jinteki'
		// | 'neutral_corp'
		// | 'neutral_runner'
		// | 'sunny'
		// | 'apex'
		// | 'adam'
		// | 'cost'
		// | 'trash'
		// | 'strength'
		// | 'agenda';
		| 'adam'
			| 'anarch'
			| 'apex'
			| 'criminal'
			| 'haas_bioroid'
			| 'jinteki'
			| 'nbn'
			| 'neutral_corp'
			| 'neutral_runner'
			| 'neutral'
			| 'shaper'
			| 'sunny_lebeau'
			| 'weyland_consortium'
			| 'agenda_points_simple'
			| 'agenda_points'
			| 'click'
			| 'credit'
			| 'interrupt'
			| 'link'
			| 'mu'
			| 'rez_cost'
			| 'strength'
			| 'subroutine'
			| 'trash_ability'
			| 'trash_cost'
			| 'ashes'
			| 'borealis'
			| 'core_set'
			| 'creation_and_control'
			| 'data_and_destiny'
			| 'draft'
			| 'flashpoint'
			| 'genesis'
			| 'honor_and_profit'
			| 'kitara'
			| 'liberation'
			| 'lunar'
			| 'magnum_opus_reprint'
			| 'magnum_opus'
			| 'mumbad'
			| 'napd_multiplayer'
			| 'order_and_chaos'
			| 'red_sand'
			| 'reign_and_reverie'
			| 'revised_core_set'
			| 'salvaged_memories'
			| 'sansan'
			| 'spin'
			| 'system_core_2019'
			| 'system_gateway'
			| 'system_update_2021'
			| 'terminal_directive'
			| 'agenda'
			| 'asset'
			| 'event'
			| 'hardware'
			| 'ice'
			| 'identity'
			| 'operation'
			| 'program'
			| 'resource'
			| 'upgrade'
			| 'null_signal_games'
			| 'nsg'
			| 'fantasy_flight_games'
			| 'ffg'
			| 'certificate'
			| 'rotation'
			| 'heart'
			| string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fill' | 'none';
		class?: string;
		fallback?: boolean;
		inline?: boolean;
		label?: string;
	}

	let {
		name,
		size = 'md',
		class: class_list = '',
		fallback = false,
		inline = false,
		label = name
	}: Props = $props();

	const icons = {
		// upgrade: 'type-upgrade',
		// operation: 'type-operation',
		// event: 'type-event',
		// identity: 'type-identity',
		// agenda: 'type-agenda',
		// ice: 'type-ice',
		// asset: 'type-asset',
		// hardware: 'type-hardware',
		// program: 'type-program',
		// resource: 'type-resource',
		// strength: 'type-strength',
		// weyland_consortium: 'faction-weyland-consortium',
		// anarch: 'faction-anarch',
		// shaper: 'faction-shaper',
		// nbn: 'faction-nbn',
		// haas_bioroid: 'faction-haas-bioroid',
		// criminal: 'faction-criminal',
		// jinteki: 'faction-jinteki',
		// neutral_corp: 'faction-neutral-corp',
		// neutral_runner: 'faction-neutral-runner',
		// sunny: 'faction-sunny',
		// apex: 'faction-apex',
		// adam: 'faction-ada',
		// cost: 'cost',
		// trash: 'trash'
		adam: 'faction-adam',
		anarch: 'faction-anarch',
		apex: 'faction-apex',
		criminal: 'faction-criminal',
		haas_bioroid: 'faction-haas-bioroid',
		jinteki: 'faction-jinteki',
		nbn: 'faction-nbn',
		neutral_corp: 'faction-neutral-corp',
		neutral_runner: 'faction-neutral-runner',
		neutral: 'faction-neutral',
		shaper: 'faction-shaper',
		sunny_lebeau: 'faction-sunny-lebeau',
		weyland_consortium: 'faction-weyland-consortium',
		agenda_points_simple: 'game-agenda-points-simple',
		agenda_points: 'game-agenda-points',
		click: 'game-click',
		credit: 'game-credit',
		interrupt: 'game-interrupt',
		link: 'game-link',
		mu: 'game-mu',
		rez_cost: 'game-rez-cost',
		strength: 'game-strength',
		subroutine: 'subroutine',
		trash_ability: 'game-trash-ability',
		trash_cost: 'game-trash-cost',
		ashes: 'set-ashes',
		borealis: 'set-borealis',
		core_set: 'set-core-set',
		creation_and_control: 'set-creation-and-control',
		data_and_destiny: 'set-data-and-destiny',
		draft: 'set-draft',
		flashpoint: 'set-flashpoint',
		genesis: 'set-genesis',
		honor_and_profit: 'set-honor-and-profit',
		kitara: 'set-kitara',
		liberation: 'set-liberation',
		lunar: 'set-lunar',
		magnum_opus_reprint: 'set-magnum-opus-reprint',
		magnum_opus: 'set-magnum-opus',
		mumbad: 'set-mumbad',
		napd_multiplayer: 'set-napd-multiplayer',
		order_and_chaos: 'set-order-and-chaos',
		red_sand: 'set-red-sand',
		reign_and_reverie: 'set-reign-and-reverie',
		revised_core_set: 'set-revised-core-set',
		salvaged_memories: 'set-salvaged-memories',
		sansan: 'set-sansan',
		spin: 'set-spin',
		system_core_2019: 'set-system-core-2019',
		system_gateway: 'set-system-gateway',
		system_update_2021: 'set-system-update-2021',
		terminal_directive: 'set-terminal-directive',
		agenda: 'type-agenda',
		asset: 'type-asset',
		event: 'type-event',
		hardware: 'type-hardware',
		ice: 'type-ice',
		identity: 'type-identity',
		operation: 'type-operation',
		program: 'type-program',
		resource: 'type-resource',
		upgrade: 'type-upgrade',
		null_signal_games: 'faction-neutral',
		nsg: 'faction-neutral',
		fantasy_flight_games: 'faction-fantasy-flight-games',
		ffg: 'faction-fantasy-flight-games',
		corp_identity: 'type-identity',
		runner_identity: 'type-identity',
		certificate: 'certificate',
		rotation: 'rotation',
		heart: 'heart'
	};

	let class_size = $state<string>('h-12 w-12');

	switch (size) {
		case 'xs':
			class_size = 'w-3 h-3';
			break;
		case 'sm':
			class_size = 'w-4 h-4';
			break;
		case 'md':
			class_size = 'w-6 h-6';
			break;
		case 'lg':
			class_size = 'w-8 h-8';
			break;
		case 'xl':
			class_size = 'w-10 h-10';
			break;
		case 'fill':
			class_size = 'w-full h-full';
			break;
		case 'none':
			class_size = '';
			break;
		// default:
		// 	class_size = ''; // Fallback size
	}
</script>

{#snippet svg_path(value: string)}
	<svg
		class={['fill-theme', class_size, inline ? 'inline-flex' : '', class_list]}
		aria-label={label}
	>
		<use xlink:href="#icon-{value}"></use>
	</svg>
{/snippet}

{#if icons?.[name]}
	{@render svg_path(icons[name])}
{:else if fallback}
	{@render svg_path(icons['neutral'])}
{/if}
