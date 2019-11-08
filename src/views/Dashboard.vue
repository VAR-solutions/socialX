<template>
  <v-container fluid pa-0>
    <v-row justify="center">
      <p>Have something on your mind ?</p>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Create Post</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Draft</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    :rules="rules"
                    accept="image/*"
                    placeholder="Select a Photo*"
                    prepend-icon="mdi-camera"
                    label="Post"
                    required
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field  label="Caption" ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field  label="Location" ></v-text-field>
                </v-col>
                
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn  color="error"  @click="dialog = false">Discard</v-btn>
            <v-btn  color="primary"  @click="createpost">Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

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
      posts: [],
      dialog: false,
      rules: [
        value => !!value || 'Image is Required',
      ],
    };
  },
  methods: {
    createpost() {
      console.log("recorded");

    },
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    axios.get("/posts").then(res => {
      res.data.data.forEach(element => {
        this.posts.push(element);
      });
    });
  }
};
</script>

<style>
</style>