const ContainersIndex = require('./components/containers/index.vue');
const Home = require('./components/misc/Home.vue');
const ImagesIndex = require('./components/images/index.vue');
const VolumesIndex = require('./components/volumes/index.vue');
const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

module.exports = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/images/', component: ImagesIndex },
		{ path: '/containers/', component: ContainersIndex },
		{ path: '/volumes/', component: VolumesIndex },
	],
});
