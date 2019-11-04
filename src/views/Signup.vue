<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card dark class="elevation-12">
          <v-toolbar color="rgb(40,40,40)" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="name" label="Name" name="Name" type="text" />
              <v-text-field v-model="email" label="Email" name="email" type="text" />
              <v-text-field v-model="username" label="Usename" name="Username" type="text" />
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                type="password"
              />
            </v-form>
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
      username: ""
    };
  },
  methods: {
    register() {
      axios
        .post(
          "/users/register",
          qs.stringify({
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
          }),
          {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(function(res) {
          this.$router.push("login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
