<template>
	<base-layout>
		<div class="container">
			<div class="row">
				<h1 class="col title">Containers</h1>
				<div class="col text-right">
					<a class="open" href="https://docs.docker.com/engine/reference/commandline/container/">Document</a>
				</div>
			</div>
			<container-status-bulk-editor></container-status-bulk-editor>
			<working-indicator :show="$store.state.container.working"></working-indicator>
			<div v-show="$store.getters['container/errorOccured']">
				<p>ERROR #{{$store.state.container.errorCode}}: <q>{{$store.state.container.errorMessage}}</q></p>
			</div>
			<div v-show="$store.getters['container/listAvailable']">
				<container-status-table></container-status-table>
			</div>
		</div>
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const ContainerStatusBulkEditor = require('./bulk_editor.vue');
const ContainerStatusTable = require('./table.vue');
const ContainerStatus = require('../../ContainerStatus.js');
const WorkingIndicator = require('../misc/WorkingIndicator.vue');

module.exports = {
	components: {
		BaseLayout,
		ContainerStatusBulkEditor,
		ContainerStatusTable,
		WorkingIndicator,
	},
	mounted: function() {
		this.$store.dispatch('container/update');
	},
	methods: {
		update_onclick(event) {
			this.$store.dispatch('container/update');
		},
	},
};
</script>
