<template>
	<base-layout>
		<div class="container">
			<div class="row">
				<h1 class="col title">Images</h1>
				<div class="col text-right">
					<a class="block" href="https://docs.docker.com/engine/reference/commandline/image/">Document</a>
				</div>
			</div>
			<image-status-bulk-editor></image-status-bulk-editor>
			<working-indicator :show="$store.getters['image/working']"></working-indicator>
			<div v-show="$store.getters['image/errorOccured']">
				<p>ERROR #{{$store.state.image.errorCode}}: <q>{{$store.state.image.errorMessage}}</q></p>
			</div>
			<div v-show="$store.getters['image/listAvailable']">
				<image-status-table></image-status-table>
			</div>
		</div>
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const ImageStatusBulkEditor = require('./bulk_editor.vue');
const ImageStatusTable = require('./table.vue');
const WorkingIndicator = require('../misc/WorkingIndicator.vue');

module.exports = {
	components: {
		BaseLayout,
		ImageStatusBulkEditor,
		ImageStatusTable,
		WorkingIndicator,
	},
	mounted: function() {
		this.$store.dispatch('image/update');
	},
};
</script>
