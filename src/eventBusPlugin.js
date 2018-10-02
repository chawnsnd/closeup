import eventBus from './eventBus.js';

export default {
  install(Vue, options) {
    Vue.prototype.eventBus = eventBus;
  }
};
