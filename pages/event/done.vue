<template>
  <div>
        <v-app-bar color ="#83C4F3"
        dark
        flat
        dense>
        <v-toolbar-title>Event Bot</v-toolbar-title>
        </v-app-bar>
        <v-container class ="pt-0 pb-0">
          <v-row>
            <v-col cols= "12">
              <v-form class ="pl-8 pr-8">
                <div class="mt-15 mb-15 text-center">
                  <img src ="~assets/logo.png" alt="" width="203">
                  <h1 class="text-title mt-15">เข้าร่วมกิจกรรมเรียบร้อย</h1>
                  <p class="text-content mt-4">
                   ขอบคุณที่เลือกกิจกรรมของเรา <br/>ติดตามข่าวสารเพิ่มเติมได้ที่ Event Bot.
                  </p>
                  <v-btn
                    large
                    color="primary"
                    class ="w-100 mt-15" @click="selectevent">
                    เลือกกิจกรรมเพิ่มเติม!
                </v-btn>
                <v-btn
                    large
                    outlined
                    color="primary"
                    class ="w-100 mt-4" @click="close">
                    ปิดหน้าต่าง
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
      
    }
  },
  computed: {

          },
  methods: {
    selectevent(){
      this.$router.push('/event/')
    },
    close(){
      liff.closeWindow();
    }
  }
}
</script>
<style lang="scss" scoped>

</style>