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
			return `https://www.google.com/search?q=${this.message}`;
		},
	},
};
</script>
