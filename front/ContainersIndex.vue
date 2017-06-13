<style>
.the-table {
	border-collapse: collapse;
}
.the-table > thead > tr > th {
	border-bottom: 2px solid #ccc;
}
.the-table > tbody > tr:hover {
	background-color: #ffe;
}
.the-table > tbody > tr > td {
	border-top: 1px solid #ccc;
	padding: 0.4em;
}

.is-working {
	font-weight: bold;
}
.is-stopped {
	color: #333;
}
</style>

<template>
	<div>
		<h1>Docker Containers</h1>
		<div v-show="$store.state.working">
			...
		</div>
		<div v-show="tableAvailable">
			<container-status-bulk-editor></container-status-bulk-editor>
			<container-status-table></container-status-table>
		</div>
		<div v-show="errored">
			<p>ERROR #{{$store.state.errorCode}}: <q>{{$store.state.errorMessage}}</q></p>
		</div>
	</div>
</template>

<script>
const ContainerStatusBulkEditor = require('./ContainerStatusBulkEditor.vue');
const ContainerStatusTable = require('./ContainerStatusTable.vue');
const ContainerStatus = require('./ContainerStatus.js');

module.exports = {
	components: {
		ContainerStatusBulkEditor,
		ContainerStatusTable,
	},
	mounted: function() {
		this.$store.dispatch('update');
	},
	computed: {
		tableAvailable() {
			const s = this.$store.state;
			return !s.working && s.list.length > 0;
		},

		errored() {
			const s = this.$store.state;
			return !s.working && s.errorCode;
		},
	},
};
</script>
