<template>
	<tr :class="classes">
		<td class="mdl-data-table__cell--non-numeric"><input v-model="$store.state.checked[d.id]" type="checkbox" /></td>
		<td class="mdl-data-table__cell--non-numeric">{{d.id}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.image}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.names}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.createdAt}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.status}}</td>
	</tr>
</template>

<script>
module.exports = {
	props: ['d'],

	computed: {
		classes() {
			return {
				'is-stopped': this.d.status.startsWith('Exited '),
				'is-working': this.d.status.startsWith('Up '),
			};
		},
	},

	methods: {
	},
};
</script>
