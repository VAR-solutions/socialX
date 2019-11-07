<template>
  <v-app dark>
    <Navbar></Navbar>
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
  data: () => ({
    //
  }),
  beforeCreate() {
    if (this.$session.exists()) {
      axios.defaults.headers.common["x-access-token"] = this.$session.get(
        "jwt"
      );
      let user = this.$session.get("user").user;
      axios.get("/users/" + user.username).then(res => {
        this.$store.commit("SET_USER", user);
      });
    }
  }
};
</script>
