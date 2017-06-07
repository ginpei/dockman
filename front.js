/* global Vue */
// const Vue = require('vue');
const { spawn } = require('child_process');

class ContainerStatus {
	constructor(options) {
		if (options.format) {
			const fArray = options.format.split('\t');
			'id image createdAt names status'.split(' ').forEach((key, index)=>{
				this[key] = fArray[index];
			});
		}
	}
}
ContainerStatus.format = '{{.ID}}\t{{.Image}}\t{{.CreatedAt}}\t{{.Names}}\t{{.Status}}';

var app = new Vue({
	el: '#app',
	data: {
		ready: true,
		title: 'Docker Containers',
		list: [],
		checked: {},
		hasChecked: false,
		errorCode: 0,
		errorMessage: '',
	},
	methods: {
		update() {
			const cmd = spawn('docker', ['ps', '-a', '--format', ContainerStatus.format]);

			cmd.stdout.on('data', (data)=>{
				const list = data.toString()
					.split('\n')
					.map(d=>new ContainerStatus({ format: d }));
				app.list = list;
			});

			cmd.stderr.on('data', (data)=>{
				this.errorMessage = data.toString();
			});

			cmd.on('close', (code)=>{
				this.errorCode = code;
			});
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
