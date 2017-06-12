const Vue = require('vue');
const Vuex = require('vuex');
const ContainerStatus = require('./ContainerStatus.js');  // TODO remove

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		working: true,
		list: [],
		checked: {},
		errorCode: 0,
		errorMessage: '',
	},

	getters: {
		allIds(state) {
			return Object.keys(state.checked);
		},

		doneIds(state, getters) {
			return getters.allIds.filter(id=>{
				const row = state.list.find(d=>d.id===id);
				return row.status.startsWith('Exited ');
			});
		},

		errorIds(state, getters) {
			return getters.doneIds.filter(id=>{
				const row = state.list.find(d=>d.id===id);
				return !row.status.startsWith('Exited (0) ');
			});
		},

		runningIds(state, getters) {
			return getters.allIds.filter(id=>{
				const row = state.list.find(d=>d.id===id);
				return row.status.startsWith('Up ');
			});
		},

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

		SET_CHECKED(state, payload) {
			state.checked[payload.id] = payload.checked;
		},

		SET_ERROR_CODE(state, value) {
			state.errorCode = value;
		},

		SET_ERROR_MESSAGE(state, value) {
			state.errorMessage = value;
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
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);
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

		selectNone({ getters, commit }) {
			getters.allIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: false }));
		},

		selectDoneItems({ getters, commit, dispatch }) {
			dispatch('selectNone');
			getters.doneIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},

		selectErrorItems({ getters, commit, dispatch }) {
			dispatch('selectNone');
			getters.errorIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},

		selectRunningItems({ getters, commit, dispatch }) {
			dispatch('selectNone');
			getters.runningIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},
	},
});
