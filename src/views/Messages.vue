<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-list expand>
          <v-list-item v-for="(user,i) in users" :key="i">
            <v-list-item-avatar>
              <v-img :src="user.dp"></v-img>
            </v-list-item-avatar>
            <v-list-item-content @click="chaton(user)">
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-icon>
                <v-icon color="green">mdi-circle-small</v-icon>
              </v-list-item-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <Chat v-if="chat" :key="selected._id" :user="selected"></Chat>
    </v-layout>
  </v-container>
</template>

<script>
import Chat from "../components/Chat";
import axios from "axios";
import qs from "qs";

export default {
  name: "messages",
  components: {
    Chat
  },
  data() {
    return {
      photo:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      message: "",
      chat: false,
      dp: "",
      selected: {},
      username: "",
      users: [],
      messages: [
        {
          message: "test 1",
          timestamp: "time",
          sendBy: "vashist"
        },
        {
          message: "test 2",
          timestamp: "time2",
          sendBy: "ravi"
        }
      ]
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
      console.log(this.message);
      this.messages.push({
        body: this.message,
        timestamp: "time",
        sendBy: "Ravi"
      });
    },
    chaton(user) {
      this.chat = true;
      this.selected = user;
    }
  },
  created() {
    axios.get("/chat").then(res => {
      res.data.data.forEach(e => {
        var u = "";
        if (this.$session.get("user")._id == e.participants[0]) {
          u = e.participants[1];
        } else {
          u = e.participants[0];
        }
        axios.get("/users/byid/" + u).then(res => {
          let user = {};
          user = res.data.data;
          if (res.data.data.dp) {
            user.dp =
              "data:image/jpeg;base64," +
              this.arrayBufferToBase64(user.dp.data.data);
          } else {
            user.dp = this.photo;
          }
          user["cid"] = e._id;
          this.users.push(user);
        });
      });
    });
  }
};
</script>

<style>
</style>