import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    username: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    LOGOUT(state, user) {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    login({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/users/authenticate",
            qs.stringify({ email: data.email, password: data.password }),
            {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            }
          )
          .then(function (result) {
            commit("SET_USER", result.user);
            resolve(result);
          });
      })

    },
    register() { }
  },
  modules: {}
});
