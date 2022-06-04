<template>
  <div>
        <v-app-bar color ="#83C4F3"
        flat
        dense>
        <v-toolbar-title>Select Event</v-toolbar-title>
        </v-app-bar>

        <card_list :posts="loadData"/>

</div>
</template>
<script>
import card_list from '~/pages/user/event/compo/card-list'
import axios from 'axios'
export default {
    components: {
      card_list,
    },
  data() {
    return {
      loadData:[]
    }
  },
  methods: {

  },
  asyncData(context){
    return axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
    .then(res=>{
      const data=[];
      for(const key in res.data){
        data.push({...res.data[key],id:key})
      }
      return {
        loadData:data
      }
    });
  },
}
</script>
<style lang="scss" scoped>
    
</style>tn