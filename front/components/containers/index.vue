<template>
	<base-layout>
		<div class="container">
			<h1 class="title">Containers</h1>
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
