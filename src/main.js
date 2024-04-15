import Vue from 'vue';
import Login from './Login.vue'

import router from "./router";
import VueRouter from "vue-router"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import globalMixin from './globalMixin/globalMixin';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.mixin(globalMixin);

new Vue({
  router,
  render: h => h(Login),
}).$mount('#app')
