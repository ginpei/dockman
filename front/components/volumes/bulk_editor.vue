<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters['volume/someChecked']"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
		</p>
		<p>
			Select:
			<button @click="selectNone_click" class="link">None</button>
			<button @click="selectNoNameItems_click" class="link">No Names</button>
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
			const ids = this.$store.getters['volume/checkedIds'];
			this.$store.dispatch('volume/removeFromIds', ids);
		},

		selectNone_click(event) {
			this.$store.dispatch('volume/selectNone');
		},

		selectNoNameItems_click(event) {
			this.$store.dispatch('volume/selectNoNameItems');
		},
	},
};
</script>
