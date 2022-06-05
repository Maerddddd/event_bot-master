<template>
  <div>
    <v-app-bar
      color="#83C4F3"
      elevation="0"
    >
      <img src="~assets/logo.png" width="150px">
      <v-spacer></v-spacer>
      <v-text>Admin</v-text>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row>
      <v-col cols="2"
            sm="2"
            md="2" 
            class="nav">
        <v-navigation-drawer
          permanent
          >
            <v-list 
            dense
            class="list-style"
            nav
            >
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
                >
                <v-list-item
                v-for="(item,index) in nav_list"
                :key="item.title"
                @click="link(index+1)"
                
                >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="9"
            sm="9"
            md="9"
        v-if="state_tab==1"> 
          123
      </v-col>
      <v-col cols="10"
            sm="10"
            md="10"
            align="start"
            class="content_style"
            v-if="state_tab==2">
            
          <member_crud/>
      </v-col>
      <v-col cols="10"
             sm="10"
             md="10"
             align="start"
             class="content_style"
        v-if="state_tab==3">
        <event_crud/>
      </v-col>
     
      </v-row>
    </div>
</template>
<script>
  import member_crud from '~/pages/admin/Members'
  import event_crud from '~/pages/admin/EventCRUD'
  import axios from 'axios'
  export default {
    data(){
      return {
        selectedItem: null,
        nav_list: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard'},
        { title: 'Member', icon: 'mdi-account-multiple'},
        { title: 'Event', icon: 'mdi-alpha-e-box'},
        ],
        state_tab: 1,
        
        
    }
    },
    components:{ 
          member_crud,
          event_crud,
        },

    methods: {
      link(status){
        this.state_tab = status
      }, 
    },
  }
</script>

<style lang="scss" scoped>
  .list-style{
  height: 100vh;
  
}
.v-navigation-drawer__border{
  width: 0px;
}
.v-navigation-drawer__content{
  background-color: #F6FBFF !important;
}

.v-input--selection-controls{
  margin-top: 0px;
}
.nav{
  padding-bottom: 0px;
  padding-right: 0px;
  
}
.content_style{ 
  
  padding-right: 10px;
}

</style>