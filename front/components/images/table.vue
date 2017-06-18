<template>
	<table class="the-table mdl-data-table">
		<thead>
			<tr>
				<th></th>
				<th class="mdl-data-table__cell--non-numeric">ID</th>
				<th class="mdl-data-table__cell--non-numeric">Repository</th>
				<th class="mdl-data-table__cell--non-numeric">Tag</th>
				<th class="mdl-data-table__cell--non-numeric">Digest</th>
				<th class="mdl-data-table__cell--non-numeric">CreatedSince</th>
				<th class="mdl-data-table__cell--non-numeric">CreatedAt</th>
				<th class="">Size</th>
			</tr>
		</thead>
		<tbody>
			<table-row v-for="d in $store.state.image.images" :d="d"></table-row>
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
