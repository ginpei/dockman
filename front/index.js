const Vue = require('vue');
const App = require('./app.vue');

new Vue({  // eslint-disable-line no-new
	el: '#app',
	render: f=>f(App),
});
