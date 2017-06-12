const Vue = require('vue');
const Vuex = require('vuex');
const ContainerStatus = require('./ContainerStatus.js');  // TODO remove

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		working: true,
		list: [],
		checked: {},
	},

	getters: {
		someChecked(state) {
			return Object.values(state.checked).some(d=>d);
		},

		checkedIds(state) {
			return Object.keys(state.checked).filter(id=>state.checked[id]);
		},
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

		RESET_CHECKED(state) {
			state.checked = state.list.reduce((s,d)=>(s[d.id]=false,s), {});
		},
	},

	actions: {
		update({ commit, dispatch }) {
			commit('START_WORKING');

			const cmd = spawn('docker', ['ps', '-a', '--format', ContainerStatus.format]);

			cmd.stdout.on('data', (data)=>{
				dispatch('setListFromStdout', data);
			});

			cmd.stderr.on('data', (data)=>{
				this.errorMessage = data.toString();
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				this.errorCode = code;
			});
		},

		setListFromStdout({ commit }, data) {
			const list = data.toString()
				.split('\n')
				.map(d=>ContainerStatus.fromCLIResult(d))
				.filter(d=>d);

			commit('SET_LIST', list);
			commit('RESET_CHECKED');
		},
	},
});
