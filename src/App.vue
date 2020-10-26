<template>
  <v-app dark>
    <Navbar :key="username"></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Navbar
  },
  data: () => ({
    username: -2
  }),
  beforeCreate() {
    if (this.$session.exists()) {
      axios.defaults.headers.common["x-access-token"] = this.$session.get(
        "jwt"
      );
      let user = this.$session.get("user");
      this.$socket.client.emit("connected", user.username);
      this.$socket.client.on("connected", data => {
        console.log(data);
      });
      axios.get("/users/" + user.username).then(res => {
        this.$store.commit("SET_USER", res.data.data);
        this.$session.set("user", res.data.data);
      });
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "SET_USER") {
        this.username = state.user.following.length;
      }
    });
  },
  computed: mapState(["user"])
};
</script>
