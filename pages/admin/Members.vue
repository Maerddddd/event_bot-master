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
            placeholder="คีย์เวิร์ดที่ต้องการค้นหา"
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
            outlined
            dense
          ></v-text-field>
        </v-toolbar-title>

        <v-dialog v-model="dialogDetail" max-width="1300px"> 
          <v-card>
            <v-card-title class="title-card text-primary text-center">รายละเอียดสมาชิก</v-card-title>
            <v-container fluid>
            <v-row>
              <v-col>
                        <v-card-text class="pt-0 pb-2 font_size_normal">
                          <span class="font_size_head">ชื่อ:  </span> {{editedItem.firstname}} {{editedItem.lastname}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">เพศ:  </span>  {{editedItem.gender}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                          <span class="font_size_head">รหัสนักเรียน:  </span>{{editedItem.studentID}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                          <span class="font_size_head">ชั้นปี:  </span>{{editedItem.yearclass}}
                        </v-card-text>
                        
                        <v-card-text class="pt-2 pb-2 font_size_normal">
                          <span class="font_size_head">อีเมล:  </span>{{editedItem.email}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                          <span class="font_size_head">เบอร์โทรศัพท์:  </span>{{editedItem.phonenumber}}
                        </v-card-text>

              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="7">
                <v-toolbar-title>
                  <v-text-field
                    placeholder="คีย์เวิร์ดที่ต้องการค้นหา"
                    v-model="search2"
                    append-icon="mdi-magnify"
                    label="ค้นหา"
                    single-line
                    hide-details
                    dense
                    outlined
                  ></v-text-field>
                </v-toolbar-title>
                <v-data-table
                  :headers="headers2"
                  :items="editedItem.events"
                  :search="search2"
                  sort-by="title"
                  class="elevation-0"
                >
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDetail">ตกลง</v-btn>
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
      รายละเอียดเพิ่มเติม
    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
        outlined
      >
        รีเซ็ต
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      search: '',
      search2: '',
      dialogDetail: false,
      headers: [
        {
          text: 'ชื่อ',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'นามสกุล', value: 'lastname' },
        { text: 'เพศ', value: 'gender'},
        { text: 'รหัสนักเรียน', value: 'studentID'},
        { text: 'ชั้นปี', value: 'yearclass'},
        { text: 'อีเมล', value: 'email' },
        { text: 'เบอร์โทรศัพท์', value: 'phonenumber' },
        {  value: 'actions', sortable: false },
      ],
      headers2: [
        {
          text: 'ชื่อกิจกรรม',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'ผู้จัดกิจกรมม', value: 'organizer' },
        { text: 'วันที่เริ่มกิจกรรม', value: 'date' },
        { text: 'เวลาเริ่มกิจกรรม', value: 'start_time_select'},
        { text: 'เวลาสิ้นสุดกิจกรรม', value: 'end_time_select' },
      ],
      member_data: [],
      editedIndex: -1,
      editedItem: {

      },
      defaultItem: {

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
        let members = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/members.json")

        const entries_members = Object.entries(members.data).map(([memberId, membersValue]) => ({id : memberId, ...membersValue.profile }))
        // console.log("entries_members",entries_members)
        this.member_data = entries_members.map(e => {
            return {
                ...e,
                events : Object.entries(members.data[e.id]?.select_events || {} ).map((e) => events.data[e[0]])
            }
        })

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