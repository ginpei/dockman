const Vue = require('vue');
const App = require('./App.vue');
const store = require('./store.js');

new Vue({  // eslint-disable-line no-new
	el: '#app',
	store,
	render: f=>f(App),
});
