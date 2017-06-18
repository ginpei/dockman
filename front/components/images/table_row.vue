<template>
	<tr :class="classes">
		<td class="mdl-data-table__cell--non-numeric"><input v-model="$store.state.image.checked[d.id]" type="checkbox" /></td>
		<td class="mdl-data-table__cell--non-numeric">{{d.id}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.repository}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.tag}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.digest}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.createdSince}}</td>
		<td class="mdl-data-table__cell--non-numeric">{{d.createdAt}}</td>
		<td class="">{{d.size}}</td>
	</tr>
</template>

<script>
module.exports = {
	props: ['d'],
};
</script>
