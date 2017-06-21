<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters['container/someChecked']"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
			<button @click="stop_onclick" :disabled="!$store.getters['container/someChecked']"><i class="fa fa-stop-circle" aria-hidden="true"></i> Stop</button>
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
			this.$store.dispatch('container/update');
		},

		remove_onclick(event) {
			const ids = this.$store.getters['container/checkedIds'];
			this.$store.dispatch('container/removeFromIds', ids);
		},

		stop_onclick(event) {
			// TODO move logics to store
			const ids = this.$store.getters['container/checkedIds'];
			const cmd = spawn('docker', ['stop', ids.join(' ')]);
			cmd.on('close', (code)=>{
				this.$store.dispatch('container/update');
			});
		},

		selectNone_click(event) {
			this.$store.dispatch('container/selectNone');
		},

		selectDoneItems_click(event) {
			this.$store.dispatch('container/selectDoneItems');
		},

		selectErrorItems_click(event) {
			this.$store.dispatch('container/selectErrorItems');
		},

		selectRunningItems_click(event) {
			this.$store.dispatch('container/selectRunningItems');
		},
	},
};
</script>
