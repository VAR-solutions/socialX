<template>
  <v-container fluid pa-0>
    <v-row justify="center">
      <h1 class="regular font-weight-light mb-3">Have something on your mind ?</h1>
       
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn class="mt-1 ml-3" color="primary" dark v-on="on">Create Post</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Draft</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <!-- <v-file-input 
                    :rules="rules"
                    accept="image/*"
                    placeholder="Select a Photo*"
                    prepend-icon="mdi-camera"
                    label="Post"
                    required
                    v-on:change="handleFileUpload()"
                    ref="file"
                    id="file"
                  ></v-file-input>-->
                  <label>
                    Upload a Photo*
                    <input
                      type="file"
                      id="file"
                      ref="file"
                      accept="image/*"
                      v-on:change="handleFileUpload()"
                    />
                  </label>
                </v-col>
                <v-col cols="12">
                  <img v-bind:src="imagePreview" v-show="showPreview" height="250" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="caption" label="Caption"></v-text-field>
                </v-col>
                <!-- <v-col cols="12">
                  <v-text-field label="Location"></v-text-field>
                </v-col>-->
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" @click="dialog = false">Discard</v-btn>
            <v-btn color="primary" @click="createpost">Post</v-btn>
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
      rules: [value => !!value || "Image is Required"],
      file: null,
      showPreview: false,
      imagePreview: "",
      caption: ""
    };
  },
  methods: {
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    createpost() {
      let formData = new FormData();
      formData.append("photo", this.file);
      formData.append("content", this.caption);
      formData.append("username", this.$store.state.user.username);
      formData.append("time", Date.now());
      axios.post("/posts", formData).then(res => {
        var post = res.data.data;
        post.photo = this.arrayBufferToBase64(post.photo.data.data);
        this.posts.unshift(post);
        this.dialog = false;
        this.caption = "";
        this.file = null;
        this.showPreview = false;
        this.imagePreview = "";
        location.reload()
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];

      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    }
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    axios.get("/posts").then(res => {
      res.data.data.forEach(element => {
        element.photo = this.arrayBufferToBase64(element.photo.data.data);
        this.posts.push(element);
      });
    });
  }
};
</script>

<style>
</style>