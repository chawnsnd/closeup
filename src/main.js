// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import eventBus from './eventBus.js'
import eventBusPlugin from './eventBusPlugin.js';
import Socket from './socket.js';
import VueAxios from 'vue-axios';
import axios from './customAxios.js'


Vue.config.productionTip = false

Vue.use(eventBusPlugin);
Vue.use(Socket);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
