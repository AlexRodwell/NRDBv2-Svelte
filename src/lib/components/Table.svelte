<table class="results mt-5">
	<thead>
		<tr>
			<th>Name</th>
			<th>Cards</th>
			<th>Release Date</th>
			<th>Publisher</th>
			<th>Legality</th>
			<th></th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		<!-- {{#each @model as |cycle|}}
            <tr>
            <td>
                <Icon @icon={{cycle.id}} />
                {{#if (eq cycle.cardSets.length 1)}}
                {{! Cursed way to get the first index of a singleton array }}
                {{#each cycle.cardSets as |set|}}
                    <LinkTo @route="set" @model={{set.id}}>
                    {{cycle.name}}
                    </LinkTo>
                {{/each}}
                {{else}}
                <LinkTo @route="cycle" @model={{cycle.id}}>
                    {{cycle.name}}
                </LinkTo>
                {{/if}}
            </td>
            <td>{{cycle.cardCount}}</td>
            <td>{{format-date cycle.dateRelease}}</td>
            <td>
                {{#if (eq cycle.releasedBy "null_signal_games") }}
                <attr title="Null Signal Games">NSG</attr>
                {{else}}
                <attr title="Fantasy Flight Games">FFG</attr>
                {{/if}}
            </td>
            <td>Standard</td>
            <td>Startup</td>
            <td>Eternal</td>
            </tr>
            {{#if (gt cycle.cardSets.length 1)}}
            {{#each cycle.cardSets as |set|}}
                <tr>
                <td>
                    <span class="ps-2">
                    <Icon @icon="subroutine" />
                    <LinkTo @route="set" @model={{set.id}}>{{set.name}}</LinkTo>
                    </span>
                </td>
                <td>{{set.size}}</td>
                <td>{{format-date set.dateRelease}}</td>
                <td>
                    {{#if (eq cycle.releasedBy "null_signal_games") }}
                    <attr title="Null Signal Games">NSG</attr>
                    {{else}}
                    <attr title="Fantasy Flight Games">FFG</attr>
                    {{/if}}
                </td>
                <td>Standard</td>
                <td>Startup</td>
                <td>Eternal</td>
                </tr>
            {{/each}}
            {{/if}}
        {{/each}} -->
	</tbody>
</table>
