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
			<button @click="remove_onclick" v-bind:disabled="!hasChecked">Remove</button>
		</p>
		<div v-show="state.working">
			...
		</div>
		<div v-show="!state.working && list && list.length > 0">
			<table class="the-table">
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Image</th>
						<th>Names</th>
						<th>Created At</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="d in list" :class="getClassesFor(d)">
						<td><input v-model="checked[d.id]" @click="checked_onclick" type="checkbox" /></td>
						<td>{{d.id}}</td>
						<td>{{d.image}}</td>
						<td>{{d.names}}</td>
						<td>{{d.createdAt}}</td>
						<td>{{d.status}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div v-show="!state.working && errorCode">
			<p>ERROR #{{errorCode}}: <q>{{errorMessage}}</q></p>
		</div>
	</div>
</template>

<script>
const ContainerStatus = require('./ContainerStatus.js');
const store = require('./store.js');

module.exports = {
	data: function() {
		return {
			state: store.state,
			ready: true,
			title: 'Docker Containers',
			list: [],
			checked: {},
			hasChecked: false,
			errorCode: 0,
			errorMessage: '',
		};
	},
	mounted: function() {
		this.update();
	},
	methods: {
		update() {
			store.commit('startWorking');
			this.checked = {};
			this.hasChecked = false;

			const cmd = spawn('docker', ['ps', '-a', '--format', ContainerStatus.format]);

			cmd.stdout.on('data', (data)=>{
				this.list = this.createContainerStatusList(data);
			});

			cmd.stderr.on('data', (data)=>{
				this.errorMessage = data.toString();
			});

			cmd.on('close', (code)=>{
				store.commit('finishWorking');
				this.errorCode = code;
			});
		},

		createContainerStatusList(data) {
			return data.toString()
				.split('\n')
				.map(d=>ContainerStatus.fromCLIResult(d))
				.filter(d=>d);
		},

		getClassesFor(containerStatus) {
			const classes = {
				'is-stopped': containerStatus.stopped,
				'is-working': containerStatus.working,
			};
			return classes;
		},

		update_onclick(event) {
			this.update();
		},

		remove_onclick(event) {
			const ids = Object.keys(this.checked);
			const cmd = spawn('docker', ['rm', ids.join(' ')]);
			cmd.on('close', (code)=>{
				this.update();
			});
		},

		checked_onclick(event) {
			this.hasChecked = Object.values(this.checked).some(d=>d);
		},
	},
};
</script>
