<template>
  <div>
    <v-layout>
      <v-flex>
        <v-avatar>
          <v-img :src="photo"></v-img>
        </v-avatar>UserName
      </v-flex>
    </v-layout>

    <v-container id="scroll-target" style="max-height: 450px" class="overflow-y-auto">
      <v-row align="center" justify="center" style="height: 1000px"></v-row>
      <Message v-for="(message,k) in messages" :key="k" :message="message" />
    </v-container>

    <v-layout>
      <v-flex sm10>
        <v-col>
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
          >
          </v-textarea>
        </v-col>
      </v-flex>

      <v-flex>
        <v-btn fab dark color="indigo" @click="send">
          <v-icon dark>mdi-send</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
export default {
  name: "messages",
  components: {
    Message
  },
  data() {
    return {
      photo:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      message: "",
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
    send() {
      console.log(this.message);
      this.messages.push({
        message: this.message,
        timestamp: "time",
        sendBy: "Ravi"
      });
    }
  }
};
</script>

<style>
</style>