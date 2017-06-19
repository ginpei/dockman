<template>
	<base-layout>
		<div class="container">
			<h1 class="title">Volumes</h1>
			<div v-show="$store.state.volume.working">
				...
			</div>
			<div v-show="$store.getters['volume/listAvailable']">
				<bulk-editor></bulk-editor>
				<volume-table></volume-table>
			</div>
			<div v-show="$store.getters['volume/errorOccured']">
				<p>ERROR #{{$store.state.volume.errorCode}}: <q>{{$store.state.volume.errorMessage}}</q></p>
			</div>
		</div>
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const BulkEditor = require('./bulk_editor.vue');
const VolumeTable = require('./table.vue');

module.exports = {
	components: {
		BaseLayout,
		BulkEditor,
		VolumeTable,
	},
	mounted: function() {
		this.$store.dispatch('volume/update');
	},
};
</script>
