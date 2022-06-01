<template>
<v-container class="mt-3">
    <v-card 
    elevation="0"
    outlined
    class ="mt-2"
    >
        <v-row>
            <v-col>
                <v-list-item-subtitle>Title</v-list-item-subtitle>
                <v-list-item-title>{{title}}</v-list-item-title>             
            </v-col>
            <v-col>
                <v-list-item-subtitle>Organizer</v-list-item-subtitle>
                <v-list-item-title>{{organizer}}</v-list-item-title>              
            </v-col>
            <v-col>
                <v-list-item-subtitle>Date</v-list-item-subtitle>
                <v-list-item-title>Monday 25, May 2022</v-list-item-title>             
            </v-col>
            <v-col>
                <v-list-item-subtitle>Time</v-list-item-subtitle>
                <v-list-item-title>9:00 - 12:00</v-list-item-title>              
            </v-col>
            <v-col>
                <v-list-item-subtitle>Certificate</v-list-item-subtitle>
                <v-list-item-title>มีใบรับรอง</v-list-item-title>               
            </v-col>
            <v-col>
                <v-list-item-subtitle>Support</v-list-item-subtitle>
                <v-list-item-title>อาหารกลางวัน</v-list-item-title>               
            </v-col>
            <v-col>
                <v-list-item-icon>
                <v-icon>
                    mdi-pencil
                </v-icon>
                <v-icon>
                    mdi-delete
                </v-icon>
                </v-list-item-icon>              
            </v-col>
        </v-row>
    </v-card>
</v-container>
</template>
<script>
    export default {
    data(){
    return {
        loadData:{ 
            title:'',
            organizer:'',

        },
        // addevent_form:{
        //             title:'',
        //             organizer:'',
        //             date:'',
        //             start_time_select:'',
        //             end_time_select:'',
        //             description:'',
        //             num:'',
        //             },
        // selectedItem: null,
        // nav_list: [
        // { title: 'Dashboard', icon: 'mdi-view-dashboard'},
        // { title: 'Member', icon: 'mdi-account-multiple'},
        // { title: 'Event', icon: 'mdi-alpha-e-box'},
        // ],
        // state_tab: 1,
    }
    },
    components:{ 

        },

    methods: {
    //   postAll(){
    //       axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
    //         .then(res=>{
    //             console.log(res)
    //         })
    //   },
    },
    asyncData(context){
        return axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
        .then(res=>{
          // console.log(res.data);
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
    .v-card{ 
        padding: 20px;
        
    }
</style>