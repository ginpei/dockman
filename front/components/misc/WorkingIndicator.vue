<template>
	<div :class="classes" class="loadingIndicator">
		<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
	</div>
</template>

<script>
module.exports = {
	props: ['show'],
	computed: {
		classes() {
			return {
				loading: this.show,
			};
		},
	},
};
</script>
