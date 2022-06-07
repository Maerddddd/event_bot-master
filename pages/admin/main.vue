<template>
  <v-app>
    <v-navigation-drawer
      app
      width="250"
      absolute
      >
      <v-sheet
        color="#83C4F3"
        class="pa-9"
        elevation="0"
      >
      <div>
        <img src="~assets/logo.png" width="175px">
        </div>
      </v-sheet>
      <v-list
            dense
            nav
            width="200"
            class="mx-auto">
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
                    <v-icon >{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        fluid
      >
      <v-row class ="headbar">
        <v-spacer></v-spacer>
        <v-text class="pr-2">Admin</v-text>
        <v-icon @click="logout">mdi-logout</v-icon>
      </v-row>
        <v-row>
          <v-col 
            cols="12"
             sm="12"
             md="12"
             align="start"
             v-if="state_tab==1"
             >
            Dashboard
          </v-col>
          <v-col 
            cols="12"
             sm="12"
             md="12"
             align="start"
             v-if="state_tab==2"
             >
            <member_crud/>
          </v-col>
          <v-col 
            cols="12"
             sm="12"
             md="12"
             align="start"
             v-if="state_tab==3"
             >
            <event_crud/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import member_crud from '~/pages/admin/Members'
import event_crud from '~/pages/admin/EventCRUD'
  export default {
    data: () => ({
      selectedItem: 0,
        nav_list: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard'},
        { title: 'Member', icon: 'mdi-account-multiple'},
        { title: 'Event', icon: 'mdi-alpha-e-box'},
        ],
        state_tab: 1,}),
    components:{ 
          member_crud,
          event_crud,
          
        },
    methods: {
      link(status){
        this.state_tab = status
      },
      check_state_tab(){

      },
      logout(){
          this.$router.push('/admin')
      }
    },
    
  }
</script>

<style lang="scss" scoped>
.headbar{
    padding-top: 20px;
    padding-right: 12px;
    padding-left: 12px;
}
.v-navigation-drawer__content{
  background-color: white !important;
}

</style>