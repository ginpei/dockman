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
	<p>ERROR #{{code}}: <q>{{message}}</q></p>
</template>

<script>
module.exports = {
	props: ['code', 'message'],
};
</script>
