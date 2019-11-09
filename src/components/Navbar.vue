<template>
  <div>
    <!-- Right -->
    <v-navigation-drawer v-if="auth" v-model="drawerRight" app clipped right dark>
      <v-list v-if="auth" dark dense>
        <v-list-group color="dark" prepend-icon="mdi-account-multiple" value="true">
          <template v-slot:activator>
            <v-list-item-title dark>Following</v-list-item-title>
          </template>
          <v-list-item
            v-for="(people, i) in friends"
            :key="i"
            :to="{ name: 'profile', params: {username: people.username}}"
          >
            <v-list-item-avatar>
              <v-img :src="people.dp"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ people.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon color="green">mdi-circle-small</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right color="rgb(40,40,40)" flat dark>
      <v-app-bar-nav-icon v-if="auth" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{ name: 'dashboard'}">
          <v-avatar :tile="true">
            <v-img
              src="https://c7.uihere.com/files/203/717/254/social-science-global-perspectives-social-media-world-business-social-media.jpg"
            ></v-img>
          </v-avatar>
          <span>SocialX</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!auth" exact text depressed to="/signup">SignUp</v-btn>
        <v-btn v-if="!auth" exact text depressed to="/login">Login</v-btn>
        <v-btn v-if="auth" exact text depressed @click="logout">Logout</v-btn>
      </v-toolbar-items>

      <!-- <v-btn v-if="winsize && auth" @click.stop="drawerRight = !drawerRight"> -->
      <v-icon v-if="winsize && auth" @click.stop="drawerRight = !drawerRight">mdi-account-multiple</v-icon>
      <!-- </v-btn> -->
    </v-app-bar>

    <!-- Left -->

    <v-navigation-drawer dark v-model="drawer" v-if="auth" app>
      <v-list dark dense>
        <v-list-item :to="{ name: 'profile', params: {username: user.username}}">
          <v-avatar class="mx-auto" size="150">
            <v-img :src="dp" width="150"></v-img>
          </v-avatar>
        </v-list-item>
        <v-list-item>
          <div class="mx-auto">{{ user.name }}</div>
        </v-list-item>
        <v-list-item>
          <div class="mx-auto">{{ user.username }}</div>
        </v-list-item>
        <v-list-item>
          <div class="mx-auto">
            <v-btn
              exact
              router
              @click.stop="dialog = true"
              class="ma-2"
              outlined
              color="white"
            >Update Profile</v-btn>
          </div>
        </v-list-item>

        <v-list-item></v-list-item>

        <v-list-group color="dark" prepend-icon="mdi-apple-finder" value="true">
          <template v-slot:activator>
            <v-list-item-title dark>Discover Friends</v-list-item-title>
          </template>

          <v-list-item
            v-for="(people, i) in sugges"
            :key="i"
            :to="{ name: 'profile', params: {username: people.username}}"
          >
            <v-list-item-avatar>
              <v-img :src="people.dp"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ people.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary />
    <v-navigation-drawer v-model="right" fixed right temporary />
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Create Post</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Update DP</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label>
                  File Preview
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    accept="image/*"
                    v-on:change="handleFileUpload()"
                  />
                </label>
              </v-col>
              <v-layout row wrap>
                <v-flex>
                  <img v-bind:src="imagePreview" v-show="showPreview" height="150" />
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex>
                  <v-btn color="primary" @click="updateDp">Change DP</v-btn>
                </v-flex>
              </v-layout>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="location" label="Location"></v-text-field>
                <v-text-field v-model="mobile" label="Mobile"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" @click="dialog = false">Discard</v-btn>
          <v-btn color="primary" @click="updateProfile">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// console.log(window.innerWidth);
import axios from "axios";
import qs from "qs";
export default {
  data: () => ({
    drawer: null,
    location: "",
    file: null,
    dialog1: true,
    dp: "",
    showPreview: true,
    imagePreview: "",
    expand: false,
    dialog: false,
    user: {},
    sugges: [],
    friends: [],
    drawerRight: null,
    right: false,
    left: false,
    mobile: "",
    photo:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  }),
  created() {
    if (this.$session.get("jwt")) {
      this.user = this.$session.get("user");
      if (this.user.dp) {
        this.dp =
          "data:image/jpeg;base64," +
          this.arrayBufferToBase64(this.user.dp.data.data);
      } else {
        this.dp = this.photo;
      }
      this.location = this.user.location;
      this.mobile = this.user.mobile;
      this.imagePreview = this.dp;

      axios.get("/users/" + this.user.username + "/suggestions").then(res => {
        res.data.data.forEach(suggestion => {
          axios.get("/users/" + suggestion).then(r => {
            if (r.data.data.dp) {
              this.sugges.push({
                name: r.data.data.name,
                username: r.data.data.username,
                dp:
                  "data:image/jpeg;base64," +
                  this.arrayBufferToBase64(r.data.data.dp.data.data)
              });
            } else {
              this.sugges.push({
                name: r.data.data.name,
                username: r.data.data.username,
                dp: this.photo
              });
            }
          });
        });
      });

      axios.get("/users/" + this.user.username + "/following").then(res => {
        res.data.data.forEach(follow => {
          axios.get("/users/" + follow).then(r => {
            if (r.data.data.dp) {
              this.friends.push({
                name: r.data.data.name,
                username: r.data.data.username,
                dp:
                  "data:image/jpeg;base64," +
                  this.arrayBufferToBase64(r.data.data.dp.data.data)
              });
            } else {
              this.friends.push({
                name: r.data.data.name,
                username: r.data.data.username,
                dp: this.photo
              });
            }
          });
        });
      });
    }
  },
  methods: {
    updateDp() {
      let formData = new FormData();
      formData.append("dp", this.file);
      formData.append("username", this.user.username);
      axios.put("/users/updateDp", formData).then(res => {
        this.dialog = false;
        this.imagePreview = "";
        this.file = null;
        this.$session.set("user", res.data.data);
        this.dp =
          "data:image/jpeg;base64," +
          this.arrayBufferToBase64(res.data.data.dp.data.data);
        location.reload();
      });
    },
    updateProfile() {
      axios
        .put(
          "/users/update",
          qs.stringify({
            location: this.location,
            mobile: this.mobile
          })
        )
        .then(res => {
          this.dialog = false;
          location.reload();
        });
    },
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    logout() {
      this.$session.destroy();
      this.$store.commit("LOGOUT");
      this.$router.push({ name: "login" });
    },
    imgUrlAlt(event) {
      event.target.src =
        "https://firebasestorage.googleapis.com/v0/b/csgo-auction.appspot.com/o/side-03.png?alt=media&token=91ce7293-e061-4a46-8929-d72bb6917499";
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
  computed: {
    auth() {
      return this.$store.state.isAuthenticated;
    },
    winsize() {
      // console.log(window.innerWidth);
      if (window.innerWidth > 1125) {
        return false;
      }
      return true;
    }
  },
  watch: {
    group() {
      this.drawer = false;
    }
  },
  updated() {
    this.auth;
  }
};
</script>

<style>
</style>