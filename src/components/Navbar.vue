<template>
  <div>
    <!-- Right -->
    <v-navigation-drawer v-if="auth" v-model="drawerRight" app clipped right dark>
      <v-list v-if="auth" dark dense>
        <v-list-group color="dark" prepend-icon="mdi-account-multiple" value="true">
          <template v-slot:activator>
            <v-list-item-title dark>Online Friends</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Vishal Gaur</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon color="green">mdi-circle-small</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Vashist Hegde</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon color="green">mdi-circle-small</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-group color="dark" prepend-icon="mdi-account-multiple" value="true">
          <template v-slot:activator>
            <v-list-item-title dark>Friends</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Vishal Gaur</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon color="green">mdi-circle-small</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Vashist Hegde</v-list-item-title>
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
        </router-link>SocialX
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
        <v-list-item>
          <v-avatar class="mx-auto" size="150">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSry6wge2X4Kc4dPVlwhL8sLBRzJF-7xTKu_IqCaebGD5ugW9XY&s" alt="John" />
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
              :to="{ name: 'profile', params: {username: user.username}}"
              class="ma-2"
              outlined
              color="white"
            >View Profile</v-btn>
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
              <v-img :src="photo"></v-img>
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
  </div>
</template>

<script>
// console.log(window.innerWidth);
import axios from "axios";
export default {
  data: () => ({
    drawer: null,
    user: {},
    sugges: [],
    drawerRight: null,
    right: false,
    left: false,
    photo:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  }),
  created() {
    if (this.$session.get("jwt")) {
      this.user = this.$session.get("user").user;
      axios.get("/users/" + this.user.username + "/suggestions").then(res => {
        res.data.data.forEach(username => {
          axios.get("/users/" + username).then(r => {
            this.sugges.push({
              name: r.data.data.name,
              username: r.data.data.username
            });
          });
        });
      });
    }
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$store.commit("LOGOUT");
      this.$router.push({ name: "login" });
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