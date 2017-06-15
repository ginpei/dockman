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
}

.menu-item {
	--color-fore: #003;
	--color-back: #cef;
	--margin: 1px;
	--size: calc(var(--haba) - var(--margin) * 2);

	background-color: var(--color-back);
	border-radius: calc(var(--haba) / 10);
	border: 2px solid var(--color-fore);
	box-sizing: border-box;
	color: 2px solid var(--color-fore);
	display: block;
	height: var(--size);
	line-height: var(--haba);
	margin: var(--margin);
	text-align: center;
	text-decoration: none;
	width: var(--size);
}

.content {
	border: 1px solid transparent;
}
</style>

<template>
	<div class="wrapper">
		<div class="menu">
			<router-link to="/" class="menu-item">H</router-link>
			<router-link to="/images/" class="menu-item">I</router-link>
			<router-link to="/containers/" class="menu-item">C</router-link>
			<router-link to="/volumes/" class="menu-item">V</router-link>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>
