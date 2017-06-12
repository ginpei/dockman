<style>
.the-table {
	border-collapse: collapse;
}
.the-table > thead > tr > th {
	border-bottom: 2px solid #ccc;
}
.the-table > tbody > tr:hover {
	background-color: #ffe;
}
.the-table > tbody > tr > td {
	border-top: 1px solid #ccc;
	padding: 0.4em;
}
</style>

<template>
	<table class="the-table">
		<thead>
			<tr>
				<th></th>
				<th>ID</th>
				<th>Image</th>
				<th>Names</th>
				<th>Created At</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<container-status-table-row v-for="d in $store.state.list" :d="d"></container-status-table-row>
		</tbody>
	</table>
</template>

<script>
const ContainerStatusTableRow = require('./ContainerStatusTableRow.vue');

module.exports = {
	components: {
		ContainerStatusTableRow,
	},
};
</script>
