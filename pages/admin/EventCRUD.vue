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
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
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
                  <v-card-subtitle class="pa-0 pt-3  font_size_head">Event title:</v-card-subtitle>
                  <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.title"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field>
            
                  <v-card-subtitle class="pa-0 font_size_head">Organizer:</v-card-subtitle>
                  <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.organizer"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field>

                  <v-card-subtitle class="pa-0 font_size_head">Image:</v-card-subtitle>
                  <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.image"
                    outlined
                    dense
                    hide-details
                    class="pb-3"
                  ></v-text-field> 
                  <v-card-subtitle class="pa-0 font_size_head">Date:</v-card-subtitle>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
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
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="menu = false"
                      >
                      
                    </v-date-picker>
                  </v-menu>
                  <v-container class="pa-0 pt-3 pb-3">
                    <v-row>
                      <v-col class="time_style">
                        <v-card-subtitle class="pa-0 font_size_head">Start time:</v-card-subtitle>
                        <v-select
                          color="#83C4F3"
                          v-model="editedItem.start_time_select"
                          :items="start_time_select"
                          dense
                          outlined
                          hide-details
                        ></v-select>
                      </v-col>

                      <v-col class="time_style">
                        <v-card-subtitle class="pa-0 font_size_head">End time:</v-card-subtitle>
                        <v-select
                          color="#83C4F3"
                          v-model="editedItem.end_time_select"
                          :items="end_time_select"
                          dense
                          outlined
                          hide-details
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-card-subtitle class="pa-0 pt-3  font_size_head">Maximum member:</v-card-subtitle>
                    <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.maximun_member"
                    dense
                    outlined
                    type="number"
                    hide-details
                  ></v-text-field>
            </v-form>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col>
                <v-form>
                  <v-card-subtitle class="pa-0 pt-3 font_size_head">Description:</v-card-subtitle>
                  <v-textarea
                    v-model="editedItem.description"
                    color="#83C4F3"
                    outlined
                    dense
                    hide-details
                    height="100"
                    class="pb-3"
                  >
                  </v-textarea>
                    
                    <v-card-subtitle class="pa-0 pb-2 font_size_head">Certificate:</v-card-subtitle>
                    <v-radio-group
                      v-model="editedItem.certificate"
                      row
                      hide-details
                      class="pb-3"
                    >
                      <v-radio
                        color="#83C4F3"
                        label="Have certificate"
                        value='Have certificate'
                      ></v-radio>
                      <v-radio
                        color="#83C4F3"
                        label="No certificate"
                        value='No certificate'
                      ></v-radio>
                    </v-radio-group>

                    <v-card-subtitle class="pa-0 pb-2 font_size_head">Support:</v-card-subtitle>
                    
                          <v-checkbox
                            v-model="editedItem.food"
                            color="#83C4F3"
                            label="Food"
                            hide-details
                            value="Food"
                          ></v-checkbox>

                          <v-checkbox
                            v-model="editedItem.souvenir"
                            color="#83C4F3"
                            label="Souvenir"
                            hide-details
                            value="Souvenir"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="editedItem.other_box"
                            color="#83C4F3"
                            label="Other"
                            hide-details
                            value="Other"
                          ></v-checkbox>
                            <v-text-field
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
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="title-card text-primary text-center">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetail" max-width="1400px"> 
          <v-card>
            <v-card-title class="title-card text-primary text-center">Event Detail</v-card-title>
            <v-container fluid>
            <v-row>
              <v-col cols="5">
                        <div class="image">
                          <v-img v-if="editedItem.image == ''" src="https://quadmenu.com/divi/wp-content/uploads/sites/8/2013/06/placeholder-image.png" height="250px"></v-img>
                          <v-img v-else :src="editedItem.image" height="250px"></v-img>
                        </div>

                        <v-card-text class="pt-4 pb-0 font_size_normal">
                         <span class="font_size_head">Title:  </span>  {{editedItem.title}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Organizer:  </span>  {{editedItem.organizer}}
                        </v-card-text>

                        <v-card-subtitle class="pt-2 pb-2 font_size_head">
                          Description:
                        </v-card-subtitle>
                        <v-card-text class="text--primary pt-0 pb-2 font_size_normal">
                          <div>{{editedItem.description}}</div>
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Date:  </span>  {{editedItem.date}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Time:  </span>  {{editedItem.start_time_select}} - {{editedItem.end_time_select}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Certificate:  </span>  {{editedItem.certificate}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Support:  </span>  {{editedItem.food}} {{editedItem.souvenir}} {{editedItem.other}}
                        </v-card-text>

                        <v-card-text class="pt-2 pb-2 font_size_normal">
                         <span class="font_size_head">Maximun member:  </span>  {{editedItem.maximun_member}}
                        </v-card-text>
                 
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="7">
                <v-data-table
                :headers="headers2"
                :items="editedItem.members"
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
     <v-btn
      elevation="0"
      small
      
      @click="editItem(item)"
    >
      Edit
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
      Delete
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
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { format, parseISO } from 'date-fns'
  export default {
    // data: () => ({
    // }),
    data () {
      return {
      start_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
      end_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
      date: null,
      menu: false,
      certificate: null,
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogDetail: false,
      headers: [
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
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      event_data: [],
      editedIndex: -1,
      editedItem: { 

      },
      defaultItem: {

      },

      headers2: [      
        { 
          text: 'Firstname',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Gender', value: 'gender'},
        { text: 'Student ID', value: 'studentID'},
        { text: 'Year of class', value: 'yearclass'},
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phonenumber' },
      ],
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Event' : 'Edit Event'
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
        // const entries_members = Object.entries(members.data).map(([memberId, membersValue]) => ({id : memberId, ...membersValue.profile }))
        this.event_data = entries_events.map(e => {
            return {
                ...e,
                members : Object.entries(e.member || {}).map(([memberId,_]) => members.data[memberId]?.profile || {} )
            }
        })
      },

      editItem (item) {
        this.editedIndex = this.event_data.indexOf(item)
        // console.log(item)
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.event_data[this.editedIndex], this.editedItem)
          this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.event_data[this.editedIndex].id}.json`,this.editedItem)
          // console.log(this.editedItem)
        } else {
          this.event_data.push(this.editedItem)
          // this.$axios.post(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`,this.editedItem)
          this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.event_data[this.editedIndex].id}.json`,this.editedItem)
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