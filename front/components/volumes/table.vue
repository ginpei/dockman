<template>
	<table class="the-table mdl-data-table">
		<thead>
			<tr>
				<th></th>
				<th class="mdl-data-table__cell--non-numeric">Name</th>
				<th class="mdl-data-table__cell--non-numeric">Driver</th>
				<th class="mdl-data-table__cell--non-numeric">Scope</th>
				<th class="mdl-data-table__cell--non-numeric">Mountpoint</th>
				<th class="mdl-data-table__cell--non-numeric">Labels</th>
			</tr>
		</thead>
		<tbody>
			<table-row v-for="d in $store.state.volume.items" :d="d"></table-row>
		</tbody>
	</table>
</template>

<script>
const TableRow = require('./table_row.vue');

module.exports = {
	components: {
		TableRow,
	},
};
</script>
