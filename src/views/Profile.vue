<template>
<v-card width="30%">
    <v-list-item>
          <v-avatar class="mx-auto" size="150">
            <img src="https://i.pinimg.com/originals/6e/c9/86/6ec9863ac0550bae46bd1a610255b0da.jpg"/>
          </v-avatar>
        </v-list-item>
        <v-list-item >
          

          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
</v-card>
   
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
export default {
  name: "profile",
  data() {
    return {
        user: null
    }
  },

  created(){
      this.user= this.$session.get("user").user;
      
      
  }
};


</script>