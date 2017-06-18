const ContainerStatus = require('../../ContainerStatus.js');  // TODO remove

module.exports = {
	namespaced: true,

	state: {
		working: true,
		containers: [],
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
				const row = state.containers.find(d=>d.id===id);
				return row.status.startsWith('Exited ');
			});
		},

		errorIds(state, getters) {
			return getters.doneIds.filter(id=>{
				const row = state.containers.find(d=>d.id===id);
				return !row.status.startsWith('Exited (0) ');
			});
		},

		runningIds(state, getters) {
			return getters.allIds.filter(id=>{
				const row = state.containers.find(d=>d.id===id);
				return row.status.startsWith('Up ');
			});
		},

		someChecked(state) {
			return Object.values(state.checked).some(d=>d);
		},

		checkedIds(state) {
			return Object.keys(state.checked).filter(id=>state.checked[id]);
		},

		containersAvailable(state) {
			return !state.working && state.containers.length > 0;
		},

		containerErrorOccured(state) {
			return !state.working && state.errorCode;
		},
	},

	mutations: {
		START_WORKING(state) {
			state.working = true;
		},

		FINISH_FORKING(state) {
			state.working = false;
		},

		SET_CONTAINERS(state, containers) {
			state.containers = containers;
		},

		RESET_CHECKED(state) {
			state.checked = state.containers.reduce((s, d)=>{
				s[d.id] = false;
				return s;
			}, {});
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
				dispatch('setContainersFromStdout', data);
			});

			cmd.stderr.on('data', (data)=>{
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);
			});
		},

		setContainersFromStdout({ commit }, data) {
			const containers = data.toString()
				.split('\n')
				.map(d=>ContainerStatus.fromCLIResult(d))
				.filter(d=>d);

			commit('SET_CONTAINERS', containers);
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
};
