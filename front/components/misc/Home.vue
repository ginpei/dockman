<template>
	<base-layout>
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
			<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
					<div class="mdl-layout-title" routing-animation>Dockman</div>
					<div class="mdl-layout-spacer"></div>
					<nav class="mdl-navigation mdl-layout--large-screen-only">
						<router-link to="/containers/" class="mdl-navigation__link">Images</router-link>
						<router-link to="/containers/" class="mdl-navigation__link">Containers</router-link>
						<router-link to="/containers/" class="mdl-navigation__link">Volumes</router-link>
					</nav>
				</div>
			</header>
			<main class="mdl-layout__content">
			</main>
		</div>
	</base-layout>
</template>

<style scoped>
main {
	background-image: url('./images/containers.jpg');
	background-position: center center;
	background-size: cover;
	box-shadow: 0 0 30vw rgba(0,0,0,1) inset;
	min-height: calc(100vh - 56px);
	opacity: 0.3;
}
</style>

<script>
const BaseLayout = require('../BaseLayout.vue');

module.exports = {
	components: {
		BaseLayout,
	},
};
</script>
