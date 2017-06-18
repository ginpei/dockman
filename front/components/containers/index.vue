<template>
	<base-layout>
		<div class="container">
			<h1 class="title">Containers</h1>
			<div v-show="$store.state.container.working">
				...
			</div>
			<div v-show="$store.getters['container/containersAvailable']">
				<container-status-bulk-editor></container-status-bulk-editor>
				<container-status-table></container-status-table>
			</div>
			<div v-show="$store.getters['container/containerErrorOccured']">
				<p>ERROR #{{$store.state.container.errorCode}}: <q>{{$store.state.container.errorMessage}}</q></p>
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
		this.$store.dispatch('container/update');
	},
};
</script>
