<style scoped>
.wrapper {
	padding-left: 50px;
	position: relative;
}

.menu {
	--haba: 50px;

	background-color: #ccc;
	height: 100%;
	left: 0;
	overflow: hidden;
	position: fixed;
	width: var(--haba);
	z-index: 1;  /* to prevent MDL table cells from coming over */
}

.menu-item {
	--color-fore: #003;
	--color-back: #cef;
	--margin: 1px;
	--size: calc(var(--haba) - var(--margin) * 2);

	background-color: #fff;
	background-size: contain;
	background-position: center center;
	border-radius: calc(var(--haba) / 10);
	border: 2px solid var(--color-fore);
	box-sizing: border-box;
	color: 2px solid var(--color-fore);
	display: block;
	font-size: 0;
	height: var(--size);
	line-height: var(--haba);
	margin: var(--margin);
	text-align: center;
	text-decoration: none;
	width: var(--size);
}

.menu-item-home {
	background-image: url("./images/ic-home.png");
}

.menu-item-images {
	background-image: url("./images/ic-images.png");
}

.menu-item-containers {
	background-image: url("./images/ic-containers.png");
}

.menu-item-volumes {
	background-image: url("./images/ic-volumes.png");
}

.content {
	border: 1px solid transparent;
}
</style>

<template>
	<div class="wrapper">
		<div class="menu">
			<router-link to="/" class="menu-item menu-item-home">Home</router-link>
			<router-link to="/images/" class="menu-item menu-item-images">Images</router-link>
			<router-link to="/containers/" class="menu-item menu-item-containers">Containers</router-link>
			<router-link to="/volumes/" class="menu-item menu-item-volumes">Volumes</router-link>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
const routingAnimation = require('../routing-animation.js').get();

module.exports = {
	mounted() {
		routingAnimation.start();
	},

	updated() {
		routingAnimation.animateNext();
	},

	unmounted() {
		routingAnimation.stop();
	},
};
</script>
