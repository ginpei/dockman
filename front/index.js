/* global Vue */
// const Vue = require('vue');
const ContainerStatus = require('./ContainerStatus.js');
const { spawn } = require('child_process');

var app = new Vue({
	el: '#app',
	data: {
		ready: true,
		working: false,
		title: 'Docker Containers',
		list: [],
		checked: {},
		hasChecked: false,
		errorCode: 0,
		errorMessage: '',
	},
	methods: {
		update() {
			this.working = true;
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
				this.working = false;
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
});

app.update();
