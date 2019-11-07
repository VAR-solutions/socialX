<template>
<v-container fluid>
  <v-layout row wrap pt-0 mt-0>
    <v-flex d-flex xs12 sm12 md4 lg12 pt-0 mt-0 shrink>
      <v-layout row wrap>
        <v-flex d-flex>
          <v-card width = "100%" flat mt-1 fixed>
            <v-layout align-center justify-center>
              <v-hover>
                <v-avatar size="140" slot-scope="{ hover }">
                  <v-img
                   src="https://i.pinimg.com/originals/6e/c9/86/6ec9863ac0550bae46bd1a610255b0da.jpg"
                  >

                  </v-img>
                </v-avatar>
              </v-hover>
              <br>
            </v-layout>
            <v-layout align-center justify-center>
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
    </v-flex>

    <v-flex xs12 sm12 md8 lg9 pt-0 mt-0>
      <v-layout row wrap>
        <v-flex xs12>
            <Post v-for="(i,key) in posts" :key="key" :post="i"/>
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
    </v-navigation-drawer> -->
 
</template>

<script>
import axios from 'axios';
import Post from '../components/Post';
export default {
  name: "profile",
  data() {
    return {
        user: null,
        posts: []
    }
  },

  components: {
    Post
  },

  created(){
      this.user= this.$session.get("user").user;
      axios.get('/posts/').then(res => {
        res.data.data.posts.forEach(post => {
          this.posts.push(post);
        });
      })
  }
};

</script>

<style scoped>
  .resp{
   width: 100%;
   height: auto;
  }
</style>