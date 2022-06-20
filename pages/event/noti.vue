<template >
    
<div>
        <v-app-bar color ="#83C4F3"
        dark
        flat
        dense>
        <v-toolbar-title>Notification</v-toolbar-title>
        </v-app-bar>
        <v-container class ="pt-0 pb-0">
          <v-row>
            <v-col cols= "12">
              <v-form class ="pl-8 pr-8">
                <div class="mt-15 mb-15 text-center">
                  <img src ="~assets/logo.png" alt="" width="203">
                  <v-card class="pa-3 mt-15"
                  flat>
                  
                  <h1 class="text-title ">Notification Setting</h1>
                  <v-switch
                    v-model="noti_data.switch1"
                    inset
                    :label="`Status: ${noti_data.switch1}`"
                  ></v-switch>
                  <v-divider></v-divider>
                 <v-select
                 class="pt-3"
                  :disabled="!noti_data.switch1"
                  :items="items"
                  v-model="noti_data.time_set"
                  dense
                  outlined
                  flat
                  label="Time Set"
                ></v-select>
                  </v-card>
                  
                  <v-btn
                    large
                    color="primary"
                    class ="w-100 mt-15" @click="next">
                    Next
                </v-btn>

                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
  </div>
</template>
<script>
export default {
    data(){
    return {
      items: ['แจ้งเตือนทันที', 'ก่อนเริ่ม 5 นาที', 'ก่อนเริ่ม 30 นาที', 'ก่อนเริ่ม 1 ชั่วโมง'],
      switch1: false,
      noti_data: {
        time_set:'',
        switch1: '',
      },
    }
  },
  computed: {
      getLine(){
              return this.$store.getters.getLine;      
              }
          },
  methods: {
    next(){
      this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/noti/${this.id}.json`,this.noti_data)
      .then((res) => {
            this.$router.push('/event/done')
            const Swal = require('sweetalert2')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your account has been registered.',
                })
            })
    },
  }
}
</script>
<style lang="">
    
</style>