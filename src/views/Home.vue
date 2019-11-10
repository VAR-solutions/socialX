<template>
  <div class="home">
    <v-parallax dark height="500" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">SocialX</h1>
          <h4 class="subheading">New Gen Social Media Platform</h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-card elevation="0" dark color="#303030">
      <h4
        class="headline font-weight-thin my-5"
      >SocialX is a new gen social media platform for the youth by the youth. SocialX facilitate the development of online social networks by connecting a user's profile with those of other individuals. Don't think just dive right into the world of social media with SocialX.</h4>
    </v-card>
    <v-parallax
      dark
      height="400"
      src="https://images.pexels.com/photos/3183151/pexels-photo-3183151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-bold mb-4">Team</h1>
          <h4 class="subheading">Meet Our Awesome Team !</h4>
        </v-col>
      </v-row>
    </v-parallax>

    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg3 my-2>
        <v-layout justify-center align-center>
          <v-avatar size="200">
            <img src="https://avatars0.githubusercontent.com/u/31544686?s=460&v=4" />
          </v-avatar>
        </v-layout>
        <p style="text-align:center">Vishal Gaur</p>
      </v-flex>

      <v-flex xs12 sm12 md6 lg3 my-2>
        <v-layout justify-center align-center>
          <v-avatar size="200">
            <img
              src="https://avatars2.githubusercontent.com/u/31547868?s=400&u=86a26b871a72843ef708153488e4b0b16d3a444e&v=4"
            />
          </v-avatar>
        </v-layout>
        <p style="text-align:center">Ananya Tewari</p>
      </v-flex>

      <v-flex xs12 sm12 md6 lg3 my-2>
        <v-layout justify-center align-center>
          <v-avatar size="200">
            <img src="https://avatars3.githubusercontent.com/u/42266057?s=400&v=4" />
          </v-avatar>
        </v-layout>
        <p style="text-align:center">Ravi Varshney</p>
      </v-flex>

      <v-flex xs12 sm12 md6 lg3 my-2>
        <v-layout justify-center align-center>
          <v-avatar size="200">
            <img src="https://avatars2.githubusercontent.com/u/31536581?s=460&v=4" />
          </v-avatar>
        </v-layout>
        <p style="text-align:center">Vasisht Hegde</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
