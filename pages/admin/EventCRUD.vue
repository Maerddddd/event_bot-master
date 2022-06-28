<template>
  <v-data-table
    :headers="headers"
    :items="event_data"
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
            dense
            outlined
          ></v-text-field>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              mdi-plus-box
            </v-icon>
          </template>
          <v-card>
            <v-card-title class="title-dialog">{{formTitle }}</v-card-title>
            <v-container>
            <v-row>
              <v-col>
                <v-form>
                  <v-card-subtitle class="pa-0 pt-3  font_size_head">ชื่อกิจกรรม:</v-card-subtitle>
                  <v-text-field
                    placeholder="กรุณาใส่ชื่อกิจกรรม"
                    color="#83C4F3"
                    v-model="editedItem.title"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field>
            
                  <v-card-subtitle class="pa-0 font_size_head">ผู้จัดกิจกรรม:</v-card-subtitle>
                  <v-text-field
                    placeholder="กรุณาใส่ผู้จัดกิจกรรม"
                    color="#83C4F3"
                    v-model="editedItem.organizer"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field>

                  <v-card-subtitle class="pa-0 font_size_head">รูปภาพ:</v-card-subtitle>
                  <v-text-field
                    placeholder="กรุณาใส่ URL ของรูปภาพ"
                    color="#83C4F3"
                    v-model="editedItem.image"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field> 
                  <v-card-subtitle class="pa-0 font_size_head">วันที่จัดกิจกรรม:</v-card-subtitle>
                  <v-menu
                    v-model="menudate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        placeholder="กรุณาเลือกวันที่จัดกิจกรรม"
                        v-model="editedItem.date"
                        append-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                        clearable
                        hide-details
                        class="pb-3"
                        @click:clear="editedItem.date = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.date"
                      :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      @change="menudate = false"
                      >
                      
                    </v-date-picker>
                  </v-menu>

                  <v-container class="pa-0 pt-3 pb-3">
                    <v-row>
                      <v-col class="time_style">
                        <v-card-subtitle class="pa-0 font_size_head">เวลาเริ่มกิจกรรม:</v-card-subtitle>
                        <v-menu
                          ref="menu"
                          v-model="time"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.start_time_select"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              placeholder="กรุณาเลือกเวลาเริ่มกิจกรรม"
                              v-model="editedItem.start_time_select"
                              readonly
                              dense
                              outlined
                              hide-details
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="time"
                            format="24hr"
                            v-model="editedItem.start_time_select"
                            full-width
                            @click:minute="$refs.menu.save(editedItem.start_time_select)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-col class="time_style">
                        <v-card-subtitle class="pa-0 font_size_head">เวลาสิ้นสุดกิจกรรม:</v-card-subtitle>
                        <v-menu
                          ref="menu2"
                          v-model="time2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.end_time_select"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              placeholder="กรุณาเลือกเวลาสิ้นสุดกิจกรรม"
                              v-model="editedItem.end_time_select"
                              readonly
                              dense
                              outlined
                              hide-details
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="time2"
                            format="24hr"
                            v-model="editedItem.end_time_select"
                            full-width
                            :min= "editedItem.start_time_select"                  
                            @click:minute="$refs.menu2.save(editedItem.end_time_select)"
                          ></v-time-picker>
                          </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-card-subtitle class="pa-0 pt-3  font_size_head">จำนวนสมาชิกสูงสุด:</v-card-subtitle>
                    <v-text-field
                    placeholder="กรุณาใส่จำนวนสมาชิกสูงสุด"
                    color="#83C4F3"
                    v-model="editedItem.maximun_member"
                    dense
                    outlined
                    type="number"
                    min="0"
                    hide-details
                  ></v-text-field>
            </v-form>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col>
                <v-form>
                  <v-card-subtitle class="pa-0 pt-3 font_size_head">รายละเอียด:</v-card-subtitle>
                  <v-textarea
                    placeholder="กรุณาใส่รายละเอียด"
                    v-model="editedItem.description"
                    color="#83C4F3"
                    outlined
                    dense
                    hide-details
                    height="100"
                    class="pb-3"
                  >
                  </v-textarea>
                    
                    <v-card-subtitle class="pa-0 pb-2 font_size_head">ใบรับรอง:</v-card-subtitle>
                    <v-radio-group
                      v-model="editedItem.certificate"
                      row
                      hide-details
                      class="pb-3"
                    >
                      <v-radio
                        color="#83C4F3"
                        label="มีใบรับรอง"
                        value='มีใบรับรอง'
                      ></v-radio>
                      <v-radio
                        color="#83C4F3"
                        label="ไม่มีใบรับรอง"
                        value='ไม่มีใบรับรอง'
                      ></v-radio>
                    </v-radio-group>

                    <v-card-subtitle class="pa-0 pb-2 font_size_head">การสนับสนุน:</v-card-subtitle>
                    
                          <v-checkbox
                            v-model="editedItem.food"
                            color="#83C4F3"
                            label="อาหาร"
                            hide-details
                            value="อาหาร"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="editedItem.souvenir"
                            color="#83C4F3"
                            label="ของที่ระลึก"
                            hide-details
                            value="ของที่ระลึก"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="editedItem.other_box"
                            color="#83C4F3"
                            label="อื่นๆ"
                            hide-details
                            value="อื่นๆ"
                          ></v-checkbox>
                            <v-text-field
                              placeholder="อื่นๆ"
                              color="#83C4F3"
                              :disabled="!editedItem.other_box"
                              v-model="editedItem.other"
                              outlined
                              dense
                              class="mt-3 pb-3"
                              hide-details
                            ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                ยกเลิก
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                บันทึก
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="title-card text-primary text-center">คุณแน่ใจแล้วใช่ไหมที่จะลบกิจกรรมนี้?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">ยกเลิก</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">ตกลง</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetail" max-width="1400px"> 
          <v-card>
            <v-card-title class="title-card text-primary text-center">รายละเอียดกิจกรรม</v-card-title>
            <v-container fluid>
            <v-row>
              <v-col cols="5">
                        <div class="image">
                          <v-img v-if="editedItem.image == ''" src="https://fairydent.ro/wp-content/uploads/2016/10/orionthemes-placeholder-image-750x750.jpg" height="250px"></v-img>
                          <v-img v-else :src="editedItem.image" height="250px"></v-img>
                        </div>

                        <v-card-text class="pt-4 pb-0 font_size_normal">
                         <span class="font_size_head">ชื่อกิจกรรม:  </span>  {{editedItem.title}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">ผู้จัดกิจกรรม:  </span>  {{editedItem.organizer}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">รายละเอียด:  </span>  {{editedItem.description}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">วันที่จัดกิจกรรม:  </span>  {{editedItem.date}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">เวลาเริ่มกิจกรรม:  </span>  {{editedItem.start_time_select}} - {{editedItem.end_time_select}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">ใบรับรอง:  </span>  {{editedItem.certificate}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">การสนับสนุน:  </span>  {{editedItem.food}} {{editedItem.souvenir}} {{editedItem.other_box}} {{editedItem.other}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">จำนวนสมาชิกสูงสุด:  </span>  {{editedItem.maximun_member}}
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
                :items="editedItem.members"
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
      รายละเอียดเพิ่มเติม
    </v-btn>
     <v-btn
      elevation="0"
      small
      
      @click="editItem(item)"
    >
      แก้ไขกิจกรรม
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
    </v-btn>
     <v-btn
      elevation="0"
      small
      @click="deleteItem(item)"
    >
      ลบกิจกรรม
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
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
    data () {
      return {
      menudate: false,
      certificate: null,
      search: '',
      search2: '',
      dialog: false,
      dialogDelete: false,
      dialogDetail: false,
      time: false,
      time2: false,
      headers: [
        {
          text: 'ชื่อกิจกรรม',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'ผู้จัดกิจกรรม', value: 'organizer' },
        { text: 'วันที่จัดกิจกรรม', value: 'date' },
        { text: 'เวลาเริ่มกิจกรรม', value: 'start_time_select'},
        { text: 'เวลาสิ้นสุดกิจกรรม', value: 'end_time_select' },
        { value: 'actions', sortable: false },
      ],
      event_data: [],
      editedIndex: -1,
      editedItem: { 
        title:"",
        organizer:"",
        date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        start_time_select:"",
        end_time_select:"",
        image:"",
        maximun_member:"100",
        description:"",
        food:"",
        souvenir:"",
        other:"",
        other_box:"",
      },
      defaultItem: {
        title:"",
        organizer:"",
        date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        start_time_select:"",
        end_time_select:"",
        image:"",
        maximun_member:"100",
        description:"",
        food:"",
        souvenir:"",
        other:"",
        other_box:"",
      },

      headers2: [      
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
      ],
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'เพิ่มกิจกรรม' : 'แก้ไขกิจกรรม'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogDetail (val) {
        val || this.closeDetail()
      },
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
        
        let events = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
        let members = await this.$axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/members.json")
        const entries_events =  Object.entries(events.data).map(([eventId, eventValue]) => ({id : eventId, ...eventValue }))
        this.event_data = entries_events.map(e => {
            return {
                ...e,
                members : Object.entries(e.member || {}).map(([memberId,_]) => members.data[memberId]?.profile || {} )
            }
        })
      },

      editItem (item) {
        this.editedIndex = this.event_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.event_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$axios.delete(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.event_data[this.editedIndex].id}.json`)
        this.$axios.delete(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/select_events/${this.event_data[this.editedIndex].id}.json`)
        this.event_data.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDetail() {
        this.dialogDetail = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.event_data[this.editedIndex], this.editedItem)
          this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.event_data[this.editedIndex].id}.json`,this.editedItem)         
        } else {
          this.event_data.push(this.editedItem)
          await this.$axios.post(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`,this.editedItem)
          this.initialize()
        }
        this.close()
      },
      moredetailItem(item){
        this.editedIndex = this.event_data.indexOf(item)
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
.title-dialog{ 
  font-size: 20px !important;
  padding: 20px 0px ;
  color:#314F64;
}
.v-form{ 
  padding: 0px 36px !important;
}
.v-subheader{ 
  padding: 0px;
}
.v-input--selection-controls{
  margin-top: 0px; 
  padding-top: 0px;
}
.time_style{
  padding: 0px 12px ;
}
.image{
  padding: 0px 17px !important;
}

</style>