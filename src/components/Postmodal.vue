<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex fill xs12 sm12 md7 lg8 style="max-height: 530px">
      <v-img height="530px" :src="'data:image/jpeg;base64,'+ this.post.photo"></v-img>
    </v-flex>

    <v-flex xs12 sm12 md5 lg4 id="scroll-target" style="max-height: 530px" class="overflow-y-auto">
      <v-card elevation="0" color="#212121">
        <v-card-title>Comments</v-card-title>
        <v-card-text style="height:100%">
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
    </v-flex>
  </v-layout>
</template>

<script>
import Comment from "./Comment";
import axios from "axios";
export default {
  name: "Postmodal",
  props: ["post"],
  components: {
    Comment
  },
  data() {
    return {
      show: true,
      comment: null,
      mycomment: null,
      commentcount: 0,
      pr: ""
    };
  },

  created() {
    this.commentcount = this.post.comments.length;
  }
};
</script>

<style >
.scroll {
  overflow-y: auto;
}
</style>
