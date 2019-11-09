<template>
  <Profile :username="username" :key="username"></Profile>
</template>

<script>
import Profile from "../components/Profile";

export default {
  name: "profile",
  components: {
    Profile
  },
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  updated() {
    this.username;
  }
};
</script>

<style>
</style>