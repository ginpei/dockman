/* global Vue */
// const Vue = require('vue');
const { spawn } = require('child_process');

class DockerInfo {
	constructor(options) {
		if (options.format) {
			const fArray = options.format.split('\t');
			'id image createdAt names status'.split(' ').forEach((key, index)=>{
				this[key] = fArray[index];
			});
		}
	}
}
DockerInfo.format = '{{.ID}}\t{{.Image}}\t{{.CreatedAt}}\t{{.Names}}\t{{.Status}}';

var app = new Vue({
	el: '#app',
	data: {
		title: 'Docker Containers',
		list: [],
		checked: {},
	},
	methods: {
		update() {
			const cmd = spawn('docker', ['ps', '-a', '--format', DockerInfo.format]);

			cmd.stdout.on('data', (data)=>{
				const list = data.toString()
					.split('\n')
					.map(d=>new DockerInfo({ format: d }));
				app.list = list;
			});

			// TODO: show error and anything needed

			// cmd.stderr.on('data', (data)=>{
			// 	console.log(`stderr: ${data}`);
			// });

			// cmd.on('close', (code)=>{
			// 	console.log(`child process exited with code ${code}`);
			// });
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
	},
});

app.update();
