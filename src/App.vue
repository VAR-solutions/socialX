<template>
  <v-app dark>
    <Navbar :key="username"></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "axios";
export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({}),
  beforeCreate() {
    if (this.$session.exists()) {
      axios.defaults.headers.common["x-access-token"] = this.$session.get(
        "jwt"
      );
      let user = this.$session.get("user");
      axios.get("/users/" + user.username).then(res => {
        this.$store.commit("SET_USER", res.data.data);
        this.$session.set("user", res.data.data);
      });
    }
  },
  computed: {
    // username() {
    //   if (this.$session.exists()) {
    //     return this.$session.get("user");
    //   } else {
    //     return "noauth";
    //   }
    // }
  },
  watch: {
    username() {
      if (this.$session.exists()) {
        return this.$session.get("user");
      } else {
        return "noauth";
      }
    }
  },
  updated() {
    this.username;
  }
};
</script>
