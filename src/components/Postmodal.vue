<template>
  <v-card>
        <v-layout>
            <v-flex xs12 sm12 md8 lg8>
                <v-img :src="'data:image/jpeg;base64,'+post.photo"></v-img>
            </v-flex>
            <v-flex xs12 sm12 md4 lg4>
                ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok ok 
            </v-flex>
        </v-layout>
      </v-card>
</template>

<script>
export default {
  name: 'PostModal',
  props: ["post"]
}
</script>
