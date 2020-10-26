<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card dark class="elevation-12">
          <v-toolbar color="rgb(40,40,40)" dark text>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field color="white" v-model="name" label="Name" name="Name" type="text" />
              <v-text-field color="white" v-model="email" label="Email" name="email" type="text" />
              <v-text-field
                color="white"
                v-model="username"
                label="Usename"
                name="Username"
                type="text"
              />
              <v-text-field
                color="white"
                id="password"
                v-model="password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
            <span class="serror" v-if="signupError">Username or Email not available</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="rgb(40,40,40)" dark @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "signup",
  props: {
    source: String
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      username: "",
      signupError: false
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$router.push({ name: "login" });
        }).catch(err => {
          this.signupError = true
        });
    }
  }
};
</script>

<style>
.serror {
  color: red;
}
</style>
