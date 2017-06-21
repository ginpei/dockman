<template>
	<div>
		<p>
			<button @click="update_onclick"><i class="fa fa-refresh" aria-hidden="true"></i> Update</button>
			<button @click="prune_onclick" :disabled="!$store.getters['image/listAvailable']"><i class="fa fa-scissors" aria-hidden="true"></i> Prune</button>
			<button @click="remove_onclick" :disabled="!$store.getters['image/someChecked']"><i class="fa fa-trash" aria-hidden="true"></i> Remove</button>
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
			this.$store.dispatch('image/update');
		},

		prune_onclick(event) {
			const message = 'WARNING! This will remove all dangling images.\nAre you sure you want to continue?';
			const yes = window.confirm(message);
			if (yes) {
				this.$store.dispatch('image/prune');
			}
		},

		remove_onclick(event) {
			const ids = this.$store.getters['image/checkedIds'];
			this.$store.dispatch('image/removeFromIds', ids);
		},

		selectNone_click(event) {
			this.$store.dispatch('image/selectNone');
		},

		selectNoNameItems_click(event) {
			this.$store.dispatch('image/selectNoNameItems');
		},
	},
};
</script>
