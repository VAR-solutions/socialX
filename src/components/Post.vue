<template>
  <v-container fluid px-0 pt-0 pb-1>
    <v-card elevation="2" class="mx-auto abc open test mt-3 mx-1" light max-width="550">
      <div class="padd">
        <v-card-title class="pt-0">
          <v-layout align-center row wrap>
            <v-flex xs2 sm2>
              <router-link :to="{  name: 'profile', params: {username}}">
                <v-avatar color="black" size="52" justify-center>
                  <v-img :src="photo"></v-img>
                </v-avatar>
              </router-link>
            </v-flex>
            <v-flex xs10 sm10>
              <v-layout mt-2 mr-1 row wrap>
                <v-flex>
                  <v-layout row wrap>
                    <v-flex grow>
                      <strong class="headline">{{ username }}</strong>
                    </v-flex>
                    <v-flex class="text-right" xs1 align-self-end shrink>
                      <v-icon color="black">mdi-dots-horizontal</v-icon>
                    </v-flex>
                    <v-flex xs12>
                      <small class="overline">{{ post.posted_on | moment("from") }}</small>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <!-- <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img class="elevation-6" :src="photo"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end"><small>{{post.posted_on | moment("from") }}</small></v-row>
          </v-list-item>-->
        </v-card-title>
        <v-card-text class="pa-0 subtitle-1 pb-1">
          <truncate clamp="show more" :length="90" less="show less" type="html" :text="p"></truncate>
        </v-card-text>
        <v-dialog width="1200px">
          <template v-slot:activator="{ on }">
            <v-img
              v-on="on"
              class="white--text align-end"
              height="250px"
              :src="'data:image/jpeg;base64,'+post.photo"
            ></v-img>
          </template>
          <Postmodal :post="post" />
        </v-dialog>

        <div class="px-0 ma-0 py-1">
          <p class="font-weight-light ma-0 pa-0">
            {{this.likecount}} Likes &nbsp;
            <span>·</span>
            {{this.commentcount}} &nbsp; Comments
          </p>
        </div>
        <v-divider></v-divider>
        <v-card-actions class="pa-0">
          <v-btn class="pa-0" text fab slot="activator" color="grey darken-1">
            <v-icon @click="liketoggle" v-bind:id="this.post.id">mdi-thumb-up</v-icon>
          </v-btn>
          <!-- <div slot="activator" v-bind:id="this.post.id">
          
          </div>-->
          <!-- <template v-slot:activator="{ on }"> -->
          <v-btn
            class="pa-0 ma-0"
            v-on="on"
            @click="show = !show; commentsModal = true"
            text
            fab
            color="grey darken-1"
          >
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          <!-- </template> -->
        </v-card-actions>
        <v-form ref="form" box auto-grow v-model="valid" lazy-validation>
          <!-- <v-container> -->
          <v-layout row wrap class="ma-1 pb-2">
            <v-flex xs12>
              <v-textarea
                v-model="mycomment"
                solo
                dense
                no-resize
                full-width
                hide-details
                label="Comment"
                placeholder="Your Comment Here"
                rows="1"
                required
              >
                <template slot="append-outer">
                  <v-icon size="32" color="rgb(24,103,192)" @click="validate">mdi-comment-plus</v-icon>
                </template>
              </v-textarea>
            </v-flex>
          </v-layout>
          <!-- </v-container> -->
        </v-form>

        <!-- Dialog for Comments -->

        <v-dialog v-model="commentsModal" scrollable max-width="450px">
          <v-card>
            <v-card-title>
              Comments
              <v-spacer></v-spacer>
              <v-icon @click="commentsModal = false">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <Comment
                v-show="show"
                v-for="(com,k) in this.post.comments"
                :key="k"
                :count="commentcount"
                :pr="k"
                :comment="com"
              />
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
    <v-spacer></v-spacer>
    <v-snackbar v-model="snackbar" top :timeout="6000" vertical>
      You have to login first to like and comment
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Comment from "./Comment";
import truncate from "vue-truncate-collapsed";
import Postmodal from "./Postmodal";
import axios from "axios";
import qs from "qs";
export default {
  name: "post",
  props: ["post"],
  components: {
    truncate,
    Comment,
    Postmodal
  },
  data() {
    return {
      show: false,
      comment: null,
      valid: true,
      mycomment: null,
      likecurr: false,
      liked: {},
      likecount: 0,
      commentcount: 0,
      date: null,
      exp: "",
      photo: "",
      username: "",
      snackbar: false,
      p: "",
      name: "",
      commentsModal: false,
      on: ""
    };
  },
  mounted() {
    this.post.likes.forEach(ele => {
      if (ele == this.$session.get("user").user.username) {
        this.likecurr = true;
        document.getElementById(this.post.id).classList.add("likedcolor");
      }
    });
  },
  created() {
    // this.likecurr = this.liked[this.experience.id]
    // this.likecurr[this.experience.id] = false

    // let ref = db
    //   .firestore()
    //   .collection("experiences")
    //   .doc(this.experience.id)
    //   .get()
    //   .then(doc => {
    //     doc.data().likes.forEach(like => {
    //       if (this.$store.getters.isAuthenticated) {
    //         if (like == this.$store.getters.userdata.email) {
    //           this.likecurr = true;
    //           document
    //             .getElementById(this.experience.id)
    //             .classList.add("likedcolor");
    //         }
    //       }
    //     });
    //   });
    this.username = this.post.username;
    this.likecount = this.post.likes.length;
    this.commentcount = this.post.comments.length;
    this.p = this.post.content;
    this.photo =
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
    axios.get("/users/" + this.username).then(res => {
      this.name = res.data.data.name;
    });
  },
  methods: {
    validate() {
      if (this.mycomment) {
        this.post.comments.push({
          content: this.mycomment,
          postedBy: this.$session.get("user").user.username,
          created: Date.now()
        });
        axios.post(
          "/posts/" + this.post.id + "/comment",
          qs.stringify({
            post_id: this.post.id,
            content: this.mycomment,
            username: this.$session.get("user").user.username
          })
        );
        this.commentcount = this.post.comments.length;
        this.mycomment = "";
      }
    },
    liketoggle() {
      //   console.log(this.$session.get("user").user.username);
      document.getElementById(this.post.id).classList.toggle("likedcolor");
      this.likecurr = !this.likecurr;

      if (this.likecurr == true) {
        axios.post(
          "/posts/" + this.post.id + "/like",
          qs.stringify({
            username: this.$session.get("user").user.username,
            post_id: this.post.id
          })
        );
        this.likecount += 1;
      } else {
        axios.post(
          "/posts/" + this.post.id + "/unlike",
          qs.stringify({
            username: this.$session.get("user").user.username,
            post_id: this.post.id
          })
        );
        this.likecount -= 1;
      }
    }
  }
};
</script>

<style>
.v-input__icon--append-outer .v-icon {
  color: rgb(90, 200, 250);
}
.abc {
  border-radius: 12px;
}
.likedcolor {
  color: rgb(24, 103, 192) !important;
  /* color: rgb(76, 217, 100) !important; */
}
.test {
  border-bottom: 3.5px solid rgb(24, 103, 192) !important;
}
.flexfix {
  align-items: unset !important;
}
.padd {
  margin-left: 3%;
  margin-right: 3%;
}
@media only screen and (max-width: 40em) {
  .padd {
    margin-left: 1%;
    margin-right: 1%;
  }
}
</style>