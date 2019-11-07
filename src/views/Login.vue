<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="rgb(40,40,40)" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :rules="[rules.required, rules.email]"
                color="white"
                v-model="email"
                label="Email"
                name="email"
                type="text"
              />

              <v-text-field
                id="password"
                color="white"
                :rules="[rules.required]"
                v-model="password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="rgb(40,40,40)" dark @click="login">Login</v-btn>
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
  name: "login",
  props: {
    source: String
  },
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", data).then(res => {
        this.$session.start();
        this.$session.set("jwt", res.data.data.token);
        this.$session.set("user", res.data.data);
        axios.defaults.headers.common["x-access-token"] = res.data.data.token;
        this.$router.push({ name: "dashboard" });
      });
    }
  }
};
</script>

<style></style>
