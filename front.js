const elExec = document.querySelector('#exec');
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

const cmd = spawn('docker', ['ps', '-a', '--format', DockerInfo.format]);

cmd.stdout.on('data', (data) => {
	const list = data.toString().split('\n').map(d=>new DockerInfo({ format: d }));
	const html = list
		.map((info)=>{
			if (!info.id) {
				return '';
			}

			const html = `<tr><td><code>${info.id}</code></td><td><code>${info.names}</code></td></tr>`;
			return html;
		})
		.join('');
	const elList = document.querySelector('#tbody');
	elList.innerHTML = html;
});

cmd.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
});

cmd.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});
