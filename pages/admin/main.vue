<template>
  <v-app>
    <v-navigation-drawer
      app
      width="250"
      permanent
      floating
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
        <p v-if="state_tab==1" class="main-title ma-auto">แดชบอร์ด</p>
        <p v-if="state_tab==2" class="main-title ma-auto">สมาชิก</p>
        <p v-if="state_tab==3" class="main-title ma-auto">กิจกรรม</p>
        <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         elevation="0"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          แอดมิน
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in profile"
          :key="index"
        >
          <v-list-item-title>
            <v-btn @click ="Logout">{{ item.title }} <v-icon>{{ item.icon }}</v-icon></v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</v-row>

        <v-row>
          <v-col 
            cols="12"
             sm="12"
             md="12"
             align="start"
             v-if="state_tab==1"
             >
            <dashboard/>
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
import dashboard from '~/pages/admin/dashboard'
  export default {
    data: () => ({
      dialogLogout: false,
      selectedItem: 0,
        nav_list: [
        { title: 'แดชบอร์ด', icon: 'mdi-view-dashboard'},
        { title: 'สมาชิก', icon: 'mdi-account-multiple'},
        { title: 'กิจกรรม', icon: 'mdi-alpha-e-box'},
        ],
        profile: [
        { title: 'ออกจากระบบ' ,icon:'mdi-logout'},
      ],
        state_tab: 1,}),
    components:{ 
          member_crud,
          event_crud,
          dashboard,
        },
    methods: {
      link(status){
        this.state_tab = status
      },
      check_state_tab(){

      },
      Logout(){
          this.$router.push('/admin')
      }
    },
    
  }
</script>

<style lang="scss" scoped>
.headbar{
    padding-top: 20px;
    padding-right: 24px;
    padding-left: 24px;
}
.v-navigation-drawer__content{
  background-color: white !important;
}
.main-title{
  font-size: 24px !important;
  font-weight: 500 !important;
  color: #314F64;
}
</style>