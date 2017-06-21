<style scoped>
p {
	background-color: #fff9f9;
	border: 1px solid #c99;
	border-radius: 0.2em;
	color: #966;
	padding: 1em;
}
</style>

<template>
	<p>ERROR #{{code}}: <q>{{message}}</q> <a :href="url">Search on the Internet</a></p>
</template>

<script>
module.exports = {
	props: ['code', 'message'],
	computed: {
		url() {
			// remove long word
			const threshold = 10;
			const query = this.message
				.split(' ')
				.filter(d=>d.length<threshold)
				.join(' ');

			return `https://www.google.com/search?q=${query}`;
		},
	},
};
</script>
