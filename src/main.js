import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueSession from 'vue-session';
import moment from "vue-moment";
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
const socket = io('http://ec2-3-21-103-10.us-east-2.compute.amazonaws.com:8000');
 
Vue.use(VueSocketIOExt, socket);
Vue.config.productionTip = false;
Vue.use(VueSession);
Vue.use(moment);
new Vue({
  router,
  store,
  vuetify,
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  render: h => h(App)
}).$mount("#app");
