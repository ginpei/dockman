<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters.someChecked"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
		</p>
		<p>
			Select:
			<button @click="selectNone_click" class="link">None</button>
			<button @click="selectDoneItems_click" class="link">Done</button>
			<button @click="selectErrorItems_click" class="link">Error</button>
			<button @click="selectRunningItems_click" class="link">Running</button>
		</p>
	</div>
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

		selectNone_click(event) {
			this.$store.dispatch('selectNone');
		},

		selectDoneItems_click(event) {
			this.$store.dispatch('selectDoneItems');
		},

		selectErrorItems_click(event) {
			this.$store.dispatch('selectErrorItems');
		},

		selectRunningItems_click(event) {
			this.$store.dispatch('selectRunningItems');
		},
	},
};
</script>
