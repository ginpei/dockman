module.exports = {
	namespaced: true,

	state: {
		working: true,
		images: [],
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
				const row = state.images.find(d=>d.id===id);
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
			return !state.working && state.images.length > 0;
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

		SET_IMAGES(state, images) {
			state.images = images;
		},

		RESET_CHECKED(state) {
			state.checked = state.images.reduce((s, d)=>{
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
				'ID',
				'Repository',
				'Tag',
				'Digest',
				'CreatedSince',
				'CreatedAt',
				'Size',
			];
			const format = colKeys.map(d=>`{{.${d}}}`).join('\\t');
			const cmd = spawn('docker', ['images', '--format', format]);

			cmd.stdout.on('data', (data)=>{
				dispatch('setImagesFromStdout', data);
			});

			cmd.stderr.on('data', (data)=>{
				commit('SET_ERROR_MESSAGE', data.toString());
			});

			cmd.on('close', (code)=>{
				commit('FINISH_FORKING');
				commit('SET_ERROR_CODE', code);
			});
		},

		setImagesFromStdout({ commit }, data) {
			const images = data.toString()
				.split('\n')
				.filter(d=>d)
				.map((line)=>{
					const cols = line.split('\t');
					return {
						id: cols[0],
						repository: cols[1],
						tag: cols[2],
						digest: cols[3],
						createdSince: cols[4],
						createdAt: cols[5],
						size: cols[6],
					};
				});

			commit('SET_IMAGES', images);
			commit('RESET_CHECKED');
		},

		prune({ dispatch }) {
			const cmd = spawn('docker', ['image', 'prune', '-f']);

			cmd.stdout.on('data', (data)=>{
				const message = data.toString();
				console.log(message);
			});

			cmd.on('close', (code)=>{
				dispatch('update');
			});
		},

		removeFromIds({ commit, dispatch }, ids) {
			const cmd = spawn('docker', ['image', 'rm', ids.join(' ')]);

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
			getters.allIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: false }));
		},

		selectNoNameItems({ getters, commit, dispatch }) {
			dispatch('selectNone');
			getters.noNameIds.forEach(id=>commit('SET_CHECKED', { id: id, checked: true }));
		},
	},
};
