module.exports = {
	namespaced: true,

	state: {
		numWorking: 0,
		items: [],
		checked: {},
		errorCode: 0,
		errorMessage: '',
	},

	getters: {
		working(state) {
			return state.numWorking > 0;
		},

		allNames(state) {
			return Object.keys(state.checked);
		},

		someChecked(state) {
			return Object.values(state.checked).some(d=>d);
		},

		checkedNames(state) {
			return Object.keys(state.checked).filter(name=>state.checked[name]);
		},

		listAvailable(state, getters) {
			return !getters.working && state.items.length > 0;
		},

		errorOccured(state, getters) {
			return !getters.working && state.errorCode;
		},
	},

	mutations: {
		START_WORKING(state) {
			state.numWorking += 1;
		},

		FINISH_FORKING(state) {
			state.numWorking -= 1;
		},

		SET_ITEMS(state, items) {
			state.items = items;
		},

		RESET_CHECKED(state) {
			state.checked = state.items.reduce((s, d)=>{
				s[d.name] = false;
				return s;
			}, {});
		},

		SET_CHECKED(state, payload) {
			state.checked[payload.name] = payload.checked;
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

		prune({ commit, dispatch }) {
			commit('START_WORKING');

			const cmd = spawn('docker', ['volume', 'prune', '-f']);

			cmd.stdout.on('data', (data)=>{
				const message = data.toString();
				console.log(message);
			});

			cmd.stderr.on('data', (data)=>{
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);

				// if no errors
				if (!code) {
					dispatch('update');
				}
			});
		},

		removeFromNames({ commit, dispatch }, names) {
			commit('START_WORKING');

			const cmd = spawn('docker', ['volume', 'rm', names.join(' ')]);

			cmd.stderr.on('data', (data)=>{
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);

				// if no errors
				if (!code) {
					dispatch('update');
				}
			});
		},

		selectNone({ getters, commit }) {
			getters.allNames.forEach(name=>commit('SET_CHECKED', { name: name, checked: false }));
		},
	},
};
