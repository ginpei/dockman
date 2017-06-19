<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters['volume/someChecked']"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
		</p>
		<p>
			Select:
			<button @click="selectNone_click" class="link">None</button>
		</p>
	</div>
</template>

<script>
module.exports = {
	methods: {
		update_onclick(event) {
			this.$store.dispatch('volume/update');
		},

		remove_onclick(event) {
			const names = this.$store.getters['volume/checkedNames'];
			this.$store.dispatch('volume/removeFromNames', names);
		},

		selectNone_click(event) {
			this.$store.dispatch('volume/selectNone');
		},
	},
};
</script>
