<template>
	<base-layout>
		<div class="container">
			<h1 class="title">Images</h1>
			<div v-show="$store.state.image.working">
				...
			</div>
			<div v-show="$store.getters['image/listAvailable']">
				<image-status-bulk-editor></image-status-bulk-editor>
				<image-status-table></image-status-table>
			</div>
			<div v-show="$store.getters['image/errorOccured']">
				<p>
					<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
				</p>
				<p>ERROR #{{$store.state.image.errorCode}}: <q>{{$store.state.image.errorMessage}}</q></p>
			</div>
		</div>
	</base-layout>
</template>

<script>
const BaseLayout = require('../BaseLayout.vue');
const ImageStatusBulkEditor = require('./bulk_editor.vue');
const ImageStatusTable = require('./table.vue');

module.exports = {
	components: {
		BaseLayout,
		ImageStatusBulkEditor,
		ImageStatusTable,
	},
	mounted: function() {
		this.$store.dispatch('image/update');
	},
	methods: {
		update_onclick(event) {
			this.$store.dispatch('image/update');
		},
	},
};
</script>
