<template>
	<table class="the-table mdl-data-table">
		<thead>
			<tr>
				<th></th>
				<th class="mdl-data-table__cell--non-numeric">ID</th>
				<th class="mdl-data-table__cell--non-numeric">Image</th>
				<th class="mdl-data-table__cell--non-numeric">Names</th>
				<th class="mdl-data-table__cell--non-numeric">Created At</th>
				<th class="mdl-data-table__cell--non-numeric">Status</th>
			</tr>
		</thead>
		<tbody>
			<container-status-table-row v-for="d in $store.state.containers" :d="d"></container-status-table-row>
		</tbody>
	</table>
</template>

<script>
const ContainerStatusTableRow = require('./table_row.vue');

module.exports = {
	components: {
		ContainerStatusTableRow,
	},
};
</script>
