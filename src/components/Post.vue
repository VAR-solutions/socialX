<template>
  <v-container fluid px-0 pt-0 pb-1>
    <v-card elevation="2" class="mx-auto abc open test mt-3 mx-1" light max-width="550">
      <div class="padd">
        <v-card-title class="pt-0">
          <v-layout align-center row wrap>
            <v-flex xs2 sm2>
              <router-link :to="{  name: 'profile', params: {username}}">
                <v-avatar size="52" justify-center>
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
                      <v-menu bottom left>
                        <template v-slot:activator="{ on }">
                          <v-btn dark icon v-on="on">
                            <v-icon v-if="post.mypost" color="black">mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item @click="deletePostModal(post)">
                            <v-list-item-title>Delete Post</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-dialog v-model="deleteModal" max-width="290">
                        <v-card>
                          <v-card-title class="headline">Delete Post?</v-card-title>

                          <v-card-text>Do you want to delete this post permanently? The post won't be recovered.</v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="green darken-1" text @click="deleteModal = false">Cancel</v-btn>

                            <v-btn color="red darken-1" text @click="deletePost(post)">Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12>
                      <small class="overline">{{ post.posted_on | moment("from") }}</small>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text class="pa-0 subtitle-1 pb-1">
          <truncate clamp="show more" :length="90" less="show less" type="html" :text="p"></truncate>
        </v-card-text>
        <v-dialog :overlay-opacity="1" width="1200px">
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
          <v-btn
            class="pa-0 ma-0"
            v-on="on"
            @click="show = !show; commentsModal = true"
            text
            :disabled="commentcount == 0"
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
      <v-btn dark text @click="snackbar = false">Close</v-btn>
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
      deleteModal: false,
      on: ""
    };
  },
  mounted() {
    this.post.likes.forEach(ele => {
      if (ele == this.$store.state.user.username) {
        this.likecurr = true;
        document.getElementById(this.post.id).classList.add("likedcolor");
      }
    });
  },
  created() {
    this.username = this.post.username;
    this.likecount = this.post.likes.length;
    this.commentcount = this.post.comments.length;
    this.p = this.post.content;
    this.photo =
      "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
    axios.get("/users/" + this.username).then(res => {
      this.name = res.data.data.name;
      if (res.data.data.dp) {
        this.photo =
          "data:image/jpeg;base64," +
          this.arrayBufferToBase64(res.data.data.dp.data.data);
      }
    });
  },
  methods: {
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    validate() {
      if (this.mycomment) {
        this.post.comments.push({
          content: this.mycomment,
          postedBy: this.$store.state.user.username,
          created: Date.now()
        });
        axios.post(
          "/posts/" + this.post.id + "/comment",
          qs.stringify({
            post_id: this.post.id,
            content: this.mycomment,
            username: this.$store.state.user.username
          })
        );
        this.commentcount = this.post.comments.length;
        this.mycomment = "";
      }
    },
    liketoggle() {
      document.getElementById(this.post.id).classList.toggle("likedcolor");
      this.likecurr = !this.likecurr;

      if (this.likecurr == true) {
        axios.post(
          "/posts/" + this.post.id + "/like",
          qs.stringify({
            username: this.$store.state.user.username,
            post_id: this.post.id
          })
        );
        this.likecount += 1;
      } else {
        axios.post(
          "/posts/" + this.post.id + "/unlike",
          qs.stringify({
            username: this.$store.state.user.username,
            post_id: this.post.id
          })
        );
        this.likecount -= 1;
      }
    },

    deletePostModal(post) {
      this.deleteModal = true;
    },

    deletePost(post) {
      this.deleteModal = false;
      axios.delete("/posts/" + post.id + "/delete").then(res => {
        location.reload();
      });
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