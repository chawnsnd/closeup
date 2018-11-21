// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import eventBus from './eventBus.js'
import eventBusPlugin from './eventBusPlugin.js';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueCookie from 'vue-cookie';


Vue.config.productionTip = false

require('es6-promise').polyfill();

Vue.use(eventBusPlugin);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
