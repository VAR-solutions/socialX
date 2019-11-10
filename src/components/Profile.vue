<template>
  <v-container fluid>
    <v-layout row wrap pt-0 mt-0>
      <!-- profile -->
      <v-flex d-flex xs12 sm12 md12 lg12 pt-0 mt-0 shrink>
        <v-card width="100%" mt-1 elevation="0" color="#303030">
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg6>
              <v-layout align-center justify-center>
                <v-avatar size="170" class="align-center">
                  <img :src="dp" />
                </v-avatar>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm12 md6 lg6>
              <v-layout align-center justify-start>{{user.username}}</v-layout>

              <v-layout align-center justify-start>
                <!-- <v-icon>mdi-account</v-icon> -->
                {{user.name}}
              </v-layout>

              <v-layout v-if="user.email" align-center justify-start>
                <!-- <v-icon>mdi-at</v-icon> -->
                {{user.email}}
              </v-layout>

              <v-layout v-if="user.mobile" align-center justify-start>
                <!-- <v-icon>mdi-phone</v-icon> -->
                {{user.mobile}}
              </v-layout>

              <v-layout v-if="user.location" align-center justify-start>{{user.location}}</v-layout>
              <v-layout align-center justify-start>
                <v-btn v-if="notinfollowings" @click="follow">Follow</v-btn>
              </v-layout>
              <v-layout align-center justify-start>
                <v-btn v-if="infollowings" @click="unfollow">Unfollow</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- followers/following -->
      <v-flex>
        <v-layout align-center justify-center>
          <!-- followers -->
          <div class="text-center">
            <v-dialog v-model="followersModal" width="500">
              <template v-slot:activator="{ on }">
                <v-btn text :disabled="followersCount == 0" v-on="on">{{followersCount}} &nbsp;Followers</v-btn>
              </template>

              <v-card>
                <v-card-title>
                  Followers
                  <v-spacer></v-spacer>
                  <v-icon @click="followersModal = false">mdi-close</v-icon>
                </v-card-title>
                <v-card-text>
                  <v-list-item v-for="person in followers" :key="person.name">
                    <v-list-item-avatar>
                      <v-img :src="person.dp"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="person.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card-text>

                <v-divider></v-divider>
              </v-card>
            </v-dialog>
          </div>

          <!-- following -->
          <div class="text-center">
            <v-dialog v-model="followingModal" width="500">
              <template v-slot:activator="{ on }">
                <v-btn text :disabled="followingCount == 0" v-on="on">{{followingCount}}&nbsp;Following</v-btn>
              </template>

              <v-card>
                <v-card-title>
                  Following
                  <v-spacer></v-spacer>
                  <v-icon @click="followingModal = false">mdi-close</v-icon>
                </v-card-title>

                <v-card-text>
                  <v-list-item v-for="person in following" :key="person.name">
                    <v-list-item-avatar>
                      <v-img :src="person.dp"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="person.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon>mdi-chat</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-container grid-list-sm align-content-space-between>
          <v-layout row wrap>
            <v-flex v-for="(i,key) in posts" :key="key" :post="i" xs6 sm4 md4 lg4>
              <!-- <Post v-for="(i,key) in posts" :key="key" :post="i" /> -->
              <v-dialog :overlay-opacity="1" max-width="1000px">
                <template v-slot:activator="{ on }">
                  <v-img
                    v-on="on"
                    class="white--text align-end"
                    height="250px"
                    :src="'data:image/jpeg;base64,'+ i.photo"
                  ></v-img>
                </template>
                <Postmodal :post="i" />
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Post from "../components/Post";
import Postmodal from "../components/Postmodal";
export default {
  name: "profile",
  props: ["username"],
  data() {
    return {
      user: {},
      posts: [],
      dp: "",
      followersModal: false,
      followingModal: false,
      dialog: false,
      followers: [],
      following: [],
      notinfollowings: false,
      infollowings: false,
      followersCount: 0,
      followingCount: 0,
      photo:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
    };
  },

  components: {
    Post,
    Postmodal
  },

  computed: {
    title: function() {
      return (
        this.$route.meta.title +
        (this.$route.params.username ? this.$route.params.username : "")
      );
    }
  },
  methods: {
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    follow() {
      axios
        .post(
          "/users/follow",
          qs.stringify({
            user2: this.username
          })
        )
        .then(res => {
          this.notinfollowings = false;
          this.infollowings = true;
          axios
            .get("/users/" + this.$session.get("user").username)
            .then(res => {
              this.$session.set("user", res.data.data);
              this.$store.commit("SET_USER", res.data.data);
            });
        });
    },
    unfollow() {
      axios
        .post(
          "/users/unfollow",
          qs.stringify({
            user2: this.username
          })
        )
        .then(res => {
          this.infollowings = false;
          this.notinfollowings = true;
          axios
            .get("/users/" + this.$session.get("user").username)
            .then(res => {
              this.$session.set("user", res.data.data);
              this.$store.commit("SET_USER", res.data.data);
            });
        });
    }
  },
  created() {
    if (this.$session.get("user").username != this.username) {
      if (this.$session.get("user").following.includes(this.username)) {
        this.notinfollowings = false;
        this.infollowings = true;
      } else {
        this.notinfollowings = true;
        this.infollowings = false;
      }
    } else {
      this.notinfollowings = false;
      this.infollowings = false;
    }

    axios.get("/users/" + this.$route.params.username).then(res => {
      this.user = res.data.data;
      if (this.user.dp) {
        this.dp =
          "data:image/jpeg;base64," +
          this.arrayBufferToBase64(this.user.dp.data.data);
      } else {
        this.dp = this.photo;
      }
    });

    axios.get("/posts/" + this.$route.params.username).then(res => {
      res.data.data.forEach(post => {
        post.photo = this.arrayBufferToBase64(post.photo.data.data);
        this.posts.push(post);
      });
    });
    // console.log(this.username);
    axios
      .get("/users/" + this.$route.params.username + "/followers")
      .then(res => {
        res.data.data.forEach(person => {
          this.followersCount += 1;
          axios.get("/users/" + person).then(userdata => {
            if (userdata.data.data.dp) {
              this.followers.push({
                name: userdata.data.data.name,
                username: userdata.data.data.username,
                dp:
                  "data:image/jpeg;base64," +
                  this.arrayBufferToBase64(userdata.data.data.dp.data.data)
              });
            } else {
              this.followers.push({
                name: userdata.data.data.name,
                username: userdata.data.data.username,
                dp: this.photo
              });
            }
          });
        });
      });

    axios
      .get("/users/" + this.$route.params.username + "/following")
      .then(res => {
        res.data.data.forEach(person => {
          this.followingCount += 1;
          axios.get("/users/" + person).then(userdata => {
            if (userdata.data.data.dp) {
              this.following.push({
                name: userdata.data.data.name,
                username: userdata.data.data.username,
                dp:
                  "data:image/jpeg;base64," +
                  this.arrayBufferToBase64(userdata.data.data.dp.data.data)
              });
            } else {
              this.following.push({
                name: userdata.data.data.name,
                username: userdata.data.data.username,
                dp: this.photo
              });
            }
          });
        });
      });
  }
};
</script>

<style scoped>
.resp {
  width: 100%;
  height: auto;
}
</style>