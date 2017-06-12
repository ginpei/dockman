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
		<h1>{{title}}</h1>
		<p>
			<button @click="update_onclick">Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters.someChecked">Remove</button>
		</p>
		<div v-show="$store.state.working">
			...
		</div>
		<div v-show="!$store.state.working && $store.state.list && $store.state.list.length > 0">
			<container-status-table></container-status-table>
		</div>
		<div v-show="!$store.state.working && $store.state.errorCode">
			<p>ERROR #{{$store.state.errorCode}}: <q>{{$store.state.errorMessage}}</q></p>
		</div>
	</div>
</template>

<script>
const ContainerStatusTable = require('./ContainerStatusTable.vue');
const ContainerStatus = require('./ContainerStatus.js');

module.exports = {
	components: {
		ContainerStatusTable,
	},
	data: function() {
		return {
			ready: true,
			title: 'Docker Containers',
		};
	},
	mounted: function() {
		this.$store.dispatch('update');
	},
	methods: {
		update_onclick(event) {
			this.$store.dispatch('update');
		},

		remove_onclick(event) {
			const ids = this.$store.getters.checkedIds;
			const cmd = spawn('docker', ['rm', ids.join(' ')]);
			cmd.on('close', (code)=>{
				this.$store.dispatch('update');
			});
		},
	},
};
</script>
