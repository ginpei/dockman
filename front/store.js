const Vue = require('vue');
const Vuex = require('vuex');
const ContainerStatus = require('./ContainerStatus.js');  // TODO remove

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		working: true,
		list: [],
	},

	mutations: {
		START_WORKING(state) {
			state.working = true;
		},

		FINISH_FORKING(state) {
			state.working = false;
		},

		SET_LIST(state, list) {
			state.list = list;
		},
	},

	actions: {
		setListFromStdout({ commit }, data) {
			const list = data.toString()
				.split('\n')
				.map(d=>ContainerStatus.fromCLIResult(d))
				.filter(d=>d);

			commit('SET_LIST', list);
		},
	},
});
