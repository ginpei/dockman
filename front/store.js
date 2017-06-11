const Vuex = require('vuex');

module.exports = new Vuex.Store({
	state: {
		working: false,
	},
	mutations: {
		startWorking(state) {
			state.working = true;
		},

		finishWorking(state) {
			state.working = false;
		},
	},
});
