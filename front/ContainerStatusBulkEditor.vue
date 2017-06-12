<template>
	<p>
		<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
		<button @click="remove_onclick" :disabled="!$store.getters.someChecked"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
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
