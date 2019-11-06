<template>
  <div>
    <!-- Right -->
    <v-navigation-drawer v-model="drawerRight" app clipped right dark>
      <v-list dark dense>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>SocialX</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!auth" exact text depressed to="/signup">SignUp</v-btn>
        <v-btn v-if="!auth" exact text depressed to="/login">Login</v-btn>
        <v-btn v-if="auth" exact text depressed @click="logout">Logout</v-btn>
      </v-toolbar-items>

      <v-btn-icon v-if="winsize" @click.stop="drawerRight = !drawerRight" ><v-icon>mdi-account-multiple</v-icon></v-btn-icon>
    </v-app-bar>

    <!-- Left -->

    <v-navigation-drawer dark v-model="drawer" app>
      <v-list dark dense>
        <v-list-item>
          <v-avatar class="mx-auto" size="150">
            <img :src="photo" alt="John" />
          </v-avatar>
        </v-list-item>
        <v-list-item >
          <div class="mx-auto">
          Name
          </div>
        </v-list-item>
        <v-list-item >
          <div class="mx-auto">
          Username
          </div>
        </v-list-item>
        <v-list-item >
          <div class="mx-auto">
            <v-btn exact router to="/profile" class="ma-2" outlined color="white">View Profile</v-btn>
          </div>
        </v-list-item>

        <v-list-item>
        </v-list-item>
        

        <v-list-group color="dark" prepend-icon="mdi-apple-finder" value="true">
          <template v-slot:activator>
            <v-list-item-title dark>Discover Friends</v-list-item-title>
          </template>

          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Ananya Tewari</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photo"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Hardik Soni</v-list-item-title>
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
    drawerRight: null,
    right: false,
    left: false,
    photo:
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
  }),
  created(){
    this.user= this.$session.get("user").user;
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    auth() {
      if (this.$session.exists()) {
        axios.defaults.headers.common["x-access-token"] = this.$session.get(
          "jwt"
        );
        return true;
      } else {
        return false;
      }
    },
    winsize() {
      console.log(window.innerWidth);
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
  }
};
</script>

<style>
</style>