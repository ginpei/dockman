<template>
	<tr :class="classes">
		<td class="mdl-data-table__cell--non-numeric"><input v-model="$store.state.image.checked[d.id]" type="checkbox" /></td>
		<td class="mdl-data-table__cell--non-numeric">{{d.id}}</td>
		<td class="mdl-data-table__cell--non-numeric">
			<span v-if="url" @click="repository_click" class="link">{{d.repository}}</span>
			<span v-else>{{d.repository}}</span>
		</td>
		<td class="mdl-data-table__cell--non-numeric">
			<span v-if="url" @click="tag_click" class="link">{{d.tag}}</span>
			<span v-else>{{d.tag}}</span>
		</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.digest}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.createdSince}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.createdAt}}</td>
		<td class="">{{d.size}}</td>
	</tr>
</template>

<script>
module.exports = {
	props: ['d'],
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
