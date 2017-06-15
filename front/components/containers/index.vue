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
	<base-layout>
		<router-link to="/">Home</router-link>
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
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const ContainerStatusBulkEditor = require('./bulk_editor.vue');
const ContainerStatusTable = require('./table.vue');
const ContainerStatus = require('../../ContainerStatus.js');

module.exports = {
	components: {
		BaseLayout,
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
