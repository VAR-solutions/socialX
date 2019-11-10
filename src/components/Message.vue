<template>
  <v-flex>
    <div class="message">{{message.message}}</div>
  </v-flex>
</template>

<script>
export default {
  name: "Message",
  props: ["message"]
};
</script>

<style>
.message {
  background-color: blue;
}
</style>