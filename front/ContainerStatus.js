class ContainerStatus {
	constructor(options) {
		ContainerStatus.keys.forEach(key=>{
			this[key] = options[key];
		});
	}

	get working() {
		return this.status.startsWith('Up ');
	}

	get stopped() {
		return this.status.startsWith('Exited ');
	}
}

ContainerStatus.format = '{{.ID}}\t{{.Image}}\t{{.CreatedAt}}\t{{.Names}}\t{{.Status}}';

ContainerStatus.keys = 'id image createdAt names status'.split(' ');

ContainerStatus.fromCLIResult = function(line) {
	if (!line) {
		return null;
	}
	const arr = line.split('\t');
	const options = {};
	ContainerStatus.keys.forEach((key, index)=>{
		options[key] = arr[index];
	});
	return options;
	// const instance = new ContainerStatus(options);
	// return instance;
};

module.exports = ContainerStatus;
