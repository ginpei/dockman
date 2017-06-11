const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		working: false,
	},

	mutations: {
		START_WORKING(state) {
			state.working = true;
		},

		FINISH_FORKING(state) {
			state.working = false;
		},
	},
});
