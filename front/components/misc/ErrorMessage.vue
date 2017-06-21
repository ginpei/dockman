<template>
	<p>ERROR #{{code}}: <q>{{message}}</q></p>
</template>

<script>
module.exports = {
	props: ['code', 'message'],
};
</script>
