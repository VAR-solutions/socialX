<template>
  <v-col cols="12">
    <div
      class="chat"
      :class="{'chat-u' : message.author._id == user._id, 'chat-f': message.author._id != user._id}"
    >{{message.body}}</div>
  </v-col>
</template>

<script>
export default {
  name: "Message",
  props: ["message"],
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$session.get("user");
  }
};
</script>

<style>
.message {
  background-color: blue;
}
.chat-u {
  background: #00aabb;
  color: black;
  max-width: 80%;
  float: right;
}
.chat-f {
  background: green;
  max-width: 80%;
  float: left;
}
.chat-u:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-left-color: #00aabb;
  border-right: 0;
  margin-top: -4px;
  margin-right: -4px;
}

.chat-f:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-right-color: #dddddd;
  border-left: 0;
  margin-top: -4px;
  margin-left: -4px;
}
</style>