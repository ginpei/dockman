<template>
	<tr :class="getClassesFor(d)">
		<td><input v-model="$store.state.checked[d.id]" type="checkbox" /></td>
		<td>{{d.id}}</td>
		<td>{{d.image}}</td>
		<td>{{d.names}}</td>
		<td>{{d.createdAt}}</td>
		<td>{{d.status}}</td>
	</tr>
</template>

<script>
module.exports = {
	props: ['d'],
	data() {
		return {
			checked: this.$store.state.checked[this.d.id],
		};
	},

	methods: {
		getClassesFor(d) {
			const classes = {
				'is-stopped': d.stopped,
				'is-working': d.working,
			};
			return classes;
		},
	},
};
</script>
