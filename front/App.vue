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
		<div v-show="!$store.state.working && errorCode">
			<p>ERROR #{{errorCode}}: <q>{{errorMessage}}</q></p>
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
			errorCode: 0,
			errorMessage: '',
		};
	},
	mounted: function() {
		this.update();
	},
	methods: {
		update() {
			this.$store.commit('START_WORKING');

			const cmd = spawn('docker', ['ps', '-a', '--format', ContainerStatus.format]);

			cmd.stdout.on('data', (data)=>{
				this.$store.dispatch('setListFromStdout', data);
			});

			cmd.stderr.on('data', (data)=>{
				this.errorMessage = data.toString();
			});

			cmd.on('close', (code)=>{
				this.$store.commit('FINISH_FORKING');
				this.errorCode = code;
			});
		},

		update_onclick(event) {
			this.update();
		},

		remove_onclick(event) {
			const ids = this.$store.getters.checkedIds;
			const cmd = spawn('docker', ['rm', ids.join(' ')]);
			cmd.on('close', (code)=>{
				this.update();
			});
		},
	},
};
</script>
