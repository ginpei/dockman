<template>
	<tr :class="classes">
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
