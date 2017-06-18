<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="remove_onclick" :disabled="!$store.getters['image/someChecked']"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
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
			this.$store.dispatch('image/update');
		},

		remove_onclick(event) {
			const ids = this.$store.getters['image/checkedIds'];
			this.$store.dispatch('image/removeFromIds', ids);
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
