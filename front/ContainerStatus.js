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
	if (!line) {
		return null;
	}
	const arr = line.split('\t');
	const options = {};
	ContainerStatus.keys.forEach((key, index)=>{
		options[key] = arr[index];
	});
	const instance = new ContainerStatus(options);
	return instance;
};

module.exports = ContainerStatus;
