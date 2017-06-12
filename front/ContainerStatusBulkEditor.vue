<template>
	<p>
		<button @click="update_onclick">Update</button>
		<button @click="remove_onclick" :disabled="!$store.getters.someChecked">Remove</button>
	</p>
</template>

<script>
module.exports = {
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
