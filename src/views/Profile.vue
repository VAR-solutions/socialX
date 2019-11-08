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
                  <img
                    src="https://i.pinimg.com/originals/6e/c9/86/6ec9863ac0550bae46bd1a610255b0da.jpg"
                  />
                </v-avatar>
              </v-layout>
            </v-flex>

            <v-flex xs12 sm12 md6 lg6>
              
              <v-layout align-center justify-center>
                {{user.username}}
              </v-layout>


              <v-layout align-center justify-center>
                <v-icon>mdi-account</v-icon>
                {{user.name}}
              </v-layout>

              <v-layout v-if="user.email" align-center justify-center>
                <v-icon>mdi-at</v-icon>
                {{user.email}}
              </v-layout>

              <v-layout v-if="user.mobile" >
                <v-icon>mdi-phone</v-icon>
                {{user.mobile}}
              </v-layout>

              <v-layout v-if="user.location" >
                <v-icon>mdi-location</v-icon>
                {{user.location}}
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
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
          <v-btn
          text
          v-on="on"
        >
          Followers
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Followers
        </v-card-title>

        <v-card-text>
         List of followers will be here
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>


    <!-- following -->
      <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
          <v-btn
          text
          v-on="on"
        >
          Following
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Following
        </v-card-title>

        <v-card-text>
          <v-list-item v-for="follower in followers" :key="follower.name" >
            <v-list-item-avatar >
              <v-img src="https://i.pinimg.com/originals/6e/c9/86/6ec9863ac0550bae46bd1a610255b0da.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="follower.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>chat</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>

        </v-layout>
      </v-flex>

      <!-- <v-layout align-center justify-center>
              <p>
                {{user.username}}
              </p>
            </v-layout>
            <v-card-text>
              
              <v-list-tile>
                <v-layout>
                  <v-list-tile-action>
                    <v-icon>mdi-account</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    {{user.name}}
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>

              <v-list-tile>
                <v-layout v-if="user.email">
                  <v-list-tile-action>
                    <v-icon>mdi-at</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    {{user.email}}
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>

              <v-list-tile>
                <v-layout v-if="user.mobile">
                  <v-list-tile-action>
                    <v-icon>mdi-phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    {{user.mobile}}
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>


              <v-list-tile>
                <v-layout >
                  <v-list-tile-action>
                    <v-icon>mdi-location</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content v-if="user.location">
                    {{user.location}}
                  </v-list-tile-content>
                </v-layout>
              </v-list-tile>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      </v-flex>-->

      <!-- posts -->

      <v-flex xs12 sm12 md12 lg12 pt-0 mt-0>
        <v-layout row wrap>
          <v-flex xs12>
            <Post v-for="(i,key) in posts" :key="key" :post="i" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>

  <!-- <v-navigation-drawer absolute permanent dark width="30%">
      <template >
          <v-list-item>
          <v-avatar class="mx-auto" size="150">
            <img src="https://i.pinimg.com/originals/6e/c9/86/6ec9863ac0550bae46bd1a610255b0da.jpg"/>
          </v-avatar>
        </v-list-item>
        <v-list-item >
          

          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" @click>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-navigation-drawer>-->
</template>

<script>
import axios from "axios";
import Post from "../components/Post";
export default {
  name: "profile",
  props: ["username"],
  data() {
    return {
      user: null,
      posts: [],
      dialog: false,
      followers: [],
      following: [],
    };
  },

  components: {
    Post
  },

  created() {
    this.user = this.$session.get("user").user;
    axios.get("/posts/").then(res => {
      res.data.data.posts.forEach(post => {
        this.posts.push(post);
      });
    });
    // console.log(this.username);
    axios.get("/users/" + this.username + "/followers").then(res => {
      let userDetails = {}
      res.data.forEach(follower => {
        console.log(follower)
        userDetails["username"] = follower
        axios.get("/users/" + follower).then(userdata => {
          userDetails["name"] = userdata.data.name;
        })
        this.followers.push(userDetails);
      })
      console.log(this.followers)
    })
  }
};
</script>

<style scoped>
.resp {
  width: 100%;
  height: auto;
}
</style>