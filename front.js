/* global Vue */
// const Vue = require('vue');
const { spawn } = require('child_process');

class ContainerStatus {
	constructor(options) {
		ContainerStatus.keys.forEach(key=>{
			this[key] = options[key];
		});
	}
}
ContainerStatus.format = '{{.ID}}\t{{.Image}}\t{{.CreatedAt}}\t{{.Names}}\t{{.Status}}';
ContainerStatus.keys = 'id image createdAt names status'.split(' ');
ContainerStatus.fromCLIResult = function(line) {
	const arr = line.split('\t');
	const options = {};
	ContainerStatus.keys.forEach((key, index)=>{
		options[key] = arr[index];
	});
	const instance = new ContainerStatus(options);
	return instance;
};

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
				.map(d=>ContainerStatus.fromCLIResult(d));
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
