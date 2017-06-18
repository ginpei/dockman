/* global spawn */

const Vue = require('vue');
const Vuex = require('vuex');
const ContainerStatus = require('../ContainerStatus.js');  // TODO remove

Vue.use(Vuex);

module.exports = new Vuex.Store({
	state: {
		working: true,
		containers: [],
		checked: {},
		errorCode: 0,
		errorMessage: '',
	},

	getters: {
		allContainerIds(state) {
			return Object.keys(state.checked);
		},

		doneContainerIds(state, getters) {
			return getters.allContainerIds.filter(id=>{
				const row = state.containers.find(d=>d.id===id);
				return row.status.startsWith('Exited ');
			});
		},

		errorContainerIds(state, getters) {
			return getters.doneContainerIds.filter(id=>{
				const row = state.containers.find(d=>d.id===id);
				return !row.status.startsWith('Exited (0) ');
			});
		},

		runningContainerIds(state, getters) {
			return getters.allContainerIds.filter(id=>{
				const row = state.containers.find(d=>d.id===id);
				return row.status.startsWith('Up ');
			});
		},

		someContainersChecked(state) {
			return Object.values(state.checked).some(d=>d);
		},

		checkedContainerIds(state) {
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
		updateContainers({ commit, dispatch }) {
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

		selectNoContainers({ getters, commit }) {
			getters.allContainerIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: false }));
		},

		selectDoneContainers({ getters, commit, dispatch }) {
			dispatch('selectNoContainers');
			getters.doneContainerIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},

		selectErrorContainers({ getters, commit, dispatch }) {
			dispatch('selectNoContainers');
			getters.errorContainerIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},

		selectRunningContainers({ getters, commit, dispatch }) {
			dispatch('selectNoContainers');
			getters.runningContainerIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},
	},
});
