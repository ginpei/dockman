<template>
	<tr :class="classes" routing-animation>
		<td class="mdl-data-table__cell--non-numeric"><input v-model="$store.state.volume.checked[d.name]" type="checkbox" /></td>
		<td class="mdl-data-table__cell--non-numeric">{{d.name}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.driver}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.scope}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.mountpoint}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.labels}}</td>
	</tr>
</template>

<script>
const routingAnimation = require('../../routing-animation.js').get();

module.exports = {
	props: ['d'],

	updated() {
		routingAnimation.resetElement(this.$el);
	},

	computed: {
		url() {
			let url = null;
			const name = this.d.repository;
			const tag = this.d.tag;
			if (name === '<none>') {
				// do nothing, it shouldn't be a link
			}
			else if (name.includes('/')) {
				url = `https://hub.docker.com/r/${name}/`;
			}
			else if (tag !== 'latest') {
				url = `https://hub.docker.com/r/library/${name}/`;
			}
			return url;
		},

		taggedUrl() {
			const name = this.d.repository;
			const tag = this.d.tag;
			const url = `https://hub.docker.com/r/library/${name}/tags/${tag}/`;
			return url;
		},
	},
	methods: {
		repository_click(event) {
			const success = window.shell.openItem(this.url);
			if (!success) {
				console.error('Failed to open the URL', this.url);
			}
		},

		tag_click(event) {
			const success = window.shell.openItem(this.taggedUrl);
			if (!success) {
				console.error('Failed to open the URL', this.taggedUrl);
			}
		},
	},
};
</script>
