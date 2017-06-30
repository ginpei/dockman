<template>
	<tr :class="classes" routing-animation>
		<td class="mdl-data-table__cell--non-numeric"><input v-model="$store.state.image.checked[d.id]" type="checkbox" /></td>
		<td class="mdl-data-table__cell--non-numeric">{{d.id}}</td>
		<td class="mdl-data-table__cell--non-numeric">
			<a v-if="url" :href="url">{{d.repository}}</a>
			<span v-else>{{d.repository}}</span>
		</td>
		<td class="mdl-data-table__cell--non-numeric">
			<a v-if="url" :href="taggedUrl">{{d.tag}}</a>
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
};
</script>
