<template>
  <v-data-table
    :headers="headers"
    :items="member_data"
    :search="search"
    class="elevation-0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            outlined
            dense
          ></v-text-field>
        </v-toolbar-title>

        <v-dialog v-model="dialogDetail" max-width="1300px"> 
          <v-card>
            <v-card-title class="title-card text-primary text-center">Member Detail</v-card-title>
            <v-container fluid>
            <v-row>
              <v-col>
                        <!-- <div class="image">
                          <v-img v-if="editedItem.image == ''" src="https://quadmenu.com/divi/wp-content/uploads/sites/8/2013/06/placeholder-image.png" height="250px"></v-img>
                          <v-img v-else :src="editedItem.image" height="250px"></v-img>
                        </div> -->
                        <v-card-subtitle class="pt-5 pb-0 font_size_head">
                          First name:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-1 pb-0 font_size_normal">
                          <div>{{editedItem.firstname}}</div>
                        </v-card-text>

                        <v-card-subtitle class="pt-3 pb-0 font_size_head">
                          Last name:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-1 pb-0 font_size_normal">
                          <div>{{editedItem.lastname}}</div>
                        </v-card-text>

                        <v-card-subtitle class="pt-3 pb-0 font_size_head">
                          Email:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-1 pb-0 font_size_normal">
                          <div>{{editedItem.email}}</div>
                        </v-card-text>

                        <v-card-subtitle class="pt-3 pb-0 font_size_head">
                          PhoneNumber:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-1 pb-0 font_size_normal">
                          <div class="font_size">{{editedItem.phonenumber}}</div>
                        </v-card-text>

                        <v-card-subtitle class="pt-3 pb-0 font_size_head">
                          Date of birth:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-1 pb-0 font_size_normal">
                          <div class="font_size">{{editedItem.dateofbirth}}</div>
                        </v-card-text>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                <v-data-table
                :headers="headers2"
                :items="editedItem.events"
                :search="search"
                sort-by="title"
                class="elevation-0">
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDetail">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
    <v-btn
      elevation="0"
      small
      @click="moredetailItem(item)"
    >
      More Details
    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
        outlined
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      search: '',
      dialogDetail: false,
      headers: [
        {
          text: 'Firstname',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phonenumber' },
        { text: 'Date of birth', value: 'dateofbirth'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers2: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Organizer', value: 'organizer' },
        { text: 'Date', value: 'date' },
        { text: 'Start Time', value: 'start_time_select'},
        { text: 'End Time', value: 'end_time_select' },
      ],
      member_data: [],
      editedIndex: -1,
      editedItem: {
        firtname:'',
        lastname:'',
        date:'',
        email:'',
        phonenumber:'',

      },
      defaultItem: {
        firtname:'',
        lastname:'',
        date:'',
        email:'',
        phonenumber:'',

      },
    }),

    computed: {

    },

    watch: {
      dialogDetail (val) {
        val || this.closeDetail()
      },
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
        // let res = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
        // this.member_data =  Object.entries(res.data).map(([key,value]) => ({id: key , ...value }))

        let events = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
        let select_events = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/select_events.json")
        let members = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/members.json")
        // const entries_select_event = Object.entries(select_events.data).map(([userId, userValue]) => ({id : userId, ...userValue }))
        // const entries_events =  Object.entries(events.data).map(([eventId, eventValue]) => ({id : eventId, ...eventValue }))
        const entries_members = Object.entries(members.data).map(([memberId, membersValue]) => ({id : memberId, ...membersValue.profile }))
        
        this.member_data = entries_members.map(e => {
            return {
                ...e,
                events : Object.entries(select_events.data[e.id]).map(([eventId,value]) => events.data[eventId])
            }
        })
        // console.log(this.member_data);
      },

       closeDetail() {
        this.dialogDetail = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      moredetailItem(item){
        this.editedIndex = this.member_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDetail = true
      },
    },
  }
</script>

<style lang="scss" scoped>
.font_size_normal{ 
  font-size: 16px !important;
}
.font_size_head{ 
  font-size: 14px !important;
  color: rgba(0, 0, 0, 0.6);
}
.image{
  padding: 0px 17px !important;
}
</style>