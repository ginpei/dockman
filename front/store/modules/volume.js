module.exports = {
	namespaced: true,

	state: {
		working: true,
		items: [],
		checked: {},
		errorCode: 0,
		errorMessage: '',
	},

	getters: {
		allIds(state) {
			return Object.keys(state.checked);
		},

		noNameIds(state, getters) {
			return getters.allIds.filter(id=>{
				const row = state.items.find(d=>d.id===id);
				return row.repository === '<none>';
			});
		},

		someChecked(state) {
			return Object.values(state.checked).some(d=>d);
		},

		checkedIds(state) {
			return Object.keys(state.checked).filter(id=>state.checked[id]);
		},

		listAvailable(state) {
			return !state.working && state.items.length > 0;
		},

		errorOccured(state) {
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

		SET_ITEMS(state, items) {
			state.items = items;
		},

		RESET_CHECKED(state) {
			state.checked = state.items.reduce((s, d)=>{
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

			const colKeys = [
				'Name',
				'Driver',
				'Scope',
				'Mountpoint',
				'Labels',
				// 'Label',
			];
			const format = colKeys.map(d=>`{{.${d}}}`).join('\\t');
			const cmd = spawn('docker', ['volume', 'ls', '--format', format]);

			cmd.stdout.on('data', (data)=>{
				dispatch('setItemsFromStdout', data);
			});

			cmd.stderr.on('data', (data)=>{
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);
			});
		},

		setItemsFromStdout({ commit }, data) {
			const items = data.toString()
				.split('\n')
				.filter(d=>d)
				.map((line)=>{
					const cols = line.split('\t');
					return {
						name: cols[0],
						driver: cols[1],
						scope: cols[2],
						mountpoint: cols[3],
						labels: cols[4],
						// label: cols[5],
					};
				});

			commit('SET_ITEMS', items);
			commit('RESET_CHECKED');
		},

		removeFromIds({ dispatch }, ids) {
			const cmd = spawn('docker', ['image', 'rm', ids.join(' ')]);
			cmd.on('close', (code)=>{
				dispatch('update');
			});
		},

		selectNone({ getters, commit }) {
			getters.allIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: false }));
		},

		selectNoNameItems({ getters, commit, dispatch }) {
			dispatch('selectNone');
			getters.noNameIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},
	},
};
