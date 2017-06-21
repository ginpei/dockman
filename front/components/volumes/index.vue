<template>
	<base-layout>
		<div class="container">
			<div class="row">
				<h1 class="col title">Volumes</h1>
				<div class="col text-right">
					<a class="block" href="https://docs.docker.com/engine/reference/commandline/volume/">Document</a>
				</div>
			</div>
			<bulk-editor></bulk-editor>
			<working-indicator :show="$store.getters['volume/working']"></working-indicator>
			<div v-show="$store.getters['volume/errorOccured']">
				<p>ERROR #{{$store.state.volume.errorCode}}: <q>{{$store.state.volume.errorMessage}}</q></p>
			</div>
			<div v-show="$store.getters['volume/listAvailable']">
				<volume-table></volume-table>
			</div>
		</div>
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const BulkEditor = require('./bulk_editor.vue');
const VolumeTable = require('./table.vue');
const WorkingIndicator = require('../misc/WorkingIndicator.vue');

module.exports = {
	components: {
		BaseLayout,
		BulkEditor,
		VolumeTable,
		WorkingIndicator,
	},
	mounted: function() {
		this.$store.dispatch('volume/update');
	},
};
</script>
