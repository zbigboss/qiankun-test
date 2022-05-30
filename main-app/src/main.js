import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 微前端 start
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: 'child-app-vue',
    entry: '//localhost:3000',
    container: '#vue-app',
    activeRule: '/child-app-vue',
  },
  {
    name: 'child-app-vue3',
    entry: '//localhost:3001',
    container: '#vue-app-3',
    activeRule: '/child-app-vue3',
  },
  {
    name: 'child-app-react',
    entry: '//localhost:3002',
    container: '#react-app',
    activeRule: '/child-app-react',
  },
]);

start();
// 微前端 end