// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Using marterialize CSS
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';

import Vue from 'vue';

import App from '@/App';
import router from '@/routes/router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
