import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueSession from 'vue-session';
import moment from "vue-moment";

Vue.config.productionTip = false;
Vue.use(VueSession);
Vue.use(moment);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
