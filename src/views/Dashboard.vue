<template>
  <v-container fluid pa-0>
    <Post v-for="(post,k) in posts" :key="k" :post="post" />
  </v-container>
</template>

<script>
import axios from "axios";
import Post from "../components/Post";
export default {
  name: "dashboard",
  components: {
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    
    axios.get("/posts").then(res => {
      res.data.data.posts.forEach(element => {
        this.posts.push(element);
      });
    });
  }
};
</script>

<style>
</style>