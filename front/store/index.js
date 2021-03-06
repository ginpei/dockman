/* global spawn */

const Vue = require('vue');
const Vuex = require('vuex');
const container = require('./modules/container.js');
const image = require('./modules/image.js');
const volume = require('./modules/volume.js');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		container,
		image,
		volume,
	},
});
