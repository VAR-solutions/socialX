<template>
  <v-flex d-flex xs12 sm6 md8 :key="t">
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <v-avatar>
          <v-img :src="user.dp"></v-img>
        </v-avatar>
        {{user.name}}
      </v-flex>
      <v-flex d-flex xs12>
        <v-col cols="12">
          <v-row>
            <v-col cols="10">
              <v-textarea
                solo
                v-model="message"
                dense
                no-resize
                full-width
                hide-details
                label="Message"
                placeholder="Your Message Here"
                rows="1"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="2">
              <v-btn fab dark color="indigo" @click="send">
                <v-icon dark>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-flex>
      <v-flex d-flex xs12>
        <v-col class="messages" cols="12">
          <Message v-for="(message,k) in messages" :key="k" :message="message" />
        </v-col>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Message from "./Message";
import axios from "axios";
import qs from "qs";
export default {
  name: "chat",
  components: {
    Message
  },
  props: ["user"],
  data() {
    return {
      t: 0,
      photo:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      message: "",
      username: "",
      users: [],
      messages: []
    };
  },
  methods: {
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    send() {
      //   console.log(this.message);
      var m = {
        body: this.message,
        conversationId: this.user.cid,
        author: {
          _id: this.$session.get("user")._id
        }
      };
      axios
        .post(
          "/chat/" + this.user.cid,
          qs.stringify({
            composedMessage: this.message
          })
        )
        .then(res => {
          this.$socket.client.emit("new message", [this.user.cid, m]);
          this.message = "";
        });
    }
  },
  created() {
    axios.get("/chat/" + this.user.cid).then(res => {
      this.$socket.client.emit("enter conversation", this.user.cid);
      res.data.conversation.forEach(e => {
        this.messages.push(e);
      });
      this.$socket.$subscribe("new message", data => {
        this.messages.unshift(data);
      });
    });
  }
};
</script>

<style>
</style>