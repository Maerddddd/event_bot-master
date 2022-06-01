<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="eventdata"
    sort-by="calories"
    class="elevation-1"
    color="blue"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
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
              <v-container fluid>
                <!-- <v-row>
                  <v-col 
                    cols="12"
                    sm="6"
                    md="4">
                  <v-col>
                    <v-text-field
                      v-model="editedItem.title"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Caloriesd"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                  </v-col>
                </v-row> -->

                <v-form>
                  <div class="title-card text-primary text-center">{{ formTitle }}</div>

                      <v-subheader>
                        Event name:
                      </v-subheader>
                      <v-text-field
                        color="#83C4F3"
                        v-model="addevent_form.title"
                        outlined
                        dense
                      ></v-text-field>
                
                      <v-subheader>
                        Organizer:
                      </v-subheader>
                      <v-text-field
                        color="#83C4F3"
                        v-model="addevent_form.organizer"
                        outlined
                        dense
                      ></v-text-field>

                      <v-subheader>
                        Date:
                      </v-subheader>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        max-width="290"
                        >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            :value="computedDateFormattedDatefns"
                            clearable
                            color="#83C4F3"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="date = null"
                          >
                          </v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addevent_form.date"
                          @change="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                      <v-row>
                      <v-col>

                      <v-subheader>
                        Start time:
                      </v-subheader>
                      <v-select
                        color="#83C4F3"
                        v-model="addevent_form.start_time_select"
                        :items="start_time_select"
                        dense
                        outlined
                      ></v-select>
                      </v-col>
                      <v-col>

                        <v-subheader>
                        End time:
                      </v-subheader>
                      <v-select
                        color="#83C4F3"
                        v-model="addevent_form.end_time_select"
                        :items="end_time_select"
                        dense
                        outlined
                      ></v-select>
                      </v-col>
                      </v-row>
                      
                      <v-subheader>
                        Event description:
                      </v-subheader>
                      <v-textarea
                        v-model="addevent_form.description"
                        color="#83C4F3"
                        outlined
                        dense
                      >
                      </v-textarea>
                        
                        <v-subheader>
                        Certificate:
                        </v-subheader>
                        <v-radio-group
                          v-model="certificate"
                          row
                        >
                          <v-radio
                            color="#83C4F3"
                            label="Have certificate"
                            value="Have certificate"
                          ></v-radio>
                          <v-radio
                            color="#83C4F3"
                            label="No certificate"
                            value="No certificate"
                          ></v-radio>
                          
                        </v-radio-group>

                        <v-subheader>
                        Support:
                        </v-subheader>
                        <v-checkbox
                          v-model="food"
                          color="#83C4F3"
                          label="Food"
                          hide-details
                        ></v-checkbox>
                        <v-select
                        :disabled="!food"
                        v-model="addevent_form.food_type"
                        :items ="food_type"
                        color="#83C4F3"
                        outlined
                        dense
                        class="mt-3"
                        ></v-select>
                        
                        <v-subheader>
                        จำนวนคนที่เปิดรับ:
                        </v-subheader>
                        <v-select
                        color="#83C4F3"
                        v-model="addevent_form.num"
                        :items="num"
                        dense
                        outlined
                      ></v-select>
                        
                      <!-- <v-btn
                        color="primary"
                        @click="addevent"
                      >
                        Submit
                      </v-btn> -->
              </v-form>

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
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios'
import { format, parseISO } from 'date-fns'
  export default {
    data: () => ({    
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Organizer', value: 'organizer'},
        { text: 'Date', value: 'date' },
        { text: 'Start Time', value: 'start_time_select'},
        { text: 'End Time', value: 'end_time_select' },
        { text: 'Max Members', value: 'num' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      eventdata: [],
      editedIndex: -1,
      editedItem: {
        title:'',
        organizer:'',
        date:'',
        start_time_select:'',
        end_time_select:'',
        description:'',
        num:'',
        certificate:'',
        food_type:'',
        food:'',
      },
      defaultItem: {
        title:'',
        organizer:'',
        date:'',
        start_time_select:'',
        end_time_select:'',
        description:'',
        num:'',
        certificate:'',
        food_type:'',
        food:'',
      },
      addevent_form:{
        title:'',
        organizer:'',
        date:'',
        start_time_select:'',
        end_time_select:'',
        description:'',
        num:'',
        certificate:'',
        food_type:'',
        food:'',
        },
        certificate: null,
        date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
        menu2: false,
        selectedItem: 1,
        nav_list: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Member', icon: 'mdi-account-multiple' },
          { title: 'Event', icon: 'mdi-alpha-e-box' },
        ],
        food_type: ['อาหารกลางวัน','อาหารว่าง','อาหารกลางวันและอาหารว่าง'],
        checkbox: false,
        food: false,
        start_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
        end_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
        num: ['10','20','30','40','50'],
        certificate: ['Have certificate','No certificate'],

    }),

    // data(){
    //   return {
    //     addevent_form:{
    //                 title:'',
    //                 organizer:'',
    //                 date:'',
    //                 start_time_select:'',
    //                 end_time_select:'',
    //                 description:'',
    //                 num:'',
    //                 certificate:'',
    //                 food_type:'',
    //                 food:'',
    //                 },
    //     certificate: null,
    //     date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    //     menu2: false,
    //     food_type: ['อาหารกลางวัน','อาหารว่าง','อาหารกลางวันและอาหารว่าง'],
    //     checkbox: false,
    //     food: false,
    //     start_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
    //     end_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
    //     num: ['10','20','30','40','50'],
    //     certificate: ['Have certificate','No certificate'],
    //     dialog: false,
    //       dialogDelete: false,
    //       headers: [
    //         {
    //           text: 'Title',
    //           align: 'start',
    //           sortable: false,
    //           value: 'title',
    //         },
    //         { text: 'Organizer', value: 'organizer' },
    //         { text: 'Date', value: 'date' },
    //         { text: 'Time', value: 'start_time_select'},
    //         { text: 'End-Time', value: 'end_time_select' },
    //         { text: 'Max Members', value: 'num' },
    //         { text: 'Actions', value: 'actions', sortable: false },
    //       ],
    //       eventdata: [],
    //       editedIndex: -1,
    //       editedItem: {
    //         name: '',
    //         calories: 0,
    //         fat: 0,
    //         carbs: 0,
    //         protein: 0,
    //       },
    //       defaultItem: {
    //         name: '',
    //         calories: 0,
    //         fat: 0,
    //         carbs: 0,
    //         protein: 0,
    //     },
    //   }
    // },

    computed: {
      computedDateFormattedDatefns () {
        return this.addevent_form.date ? format(parseISO(this.addevent_form.date), 'EEEE, MMMM do yyyy') : ''
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Event' : 'Edit Event'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    async created () {
      await this.initialize()
    },

    methods: {
      // addevent(){
      //   // this.$emit('sendData',this.addevent_form)
      // this.$store.dispatch('setAddEvent', this.addevent_form)
      // this.$axios.post(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`, this.$store.getters.getAddEvent)
      // },

      async initialize () {
        let res = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
        this.eventdata =  Object.entries(res.data).map(([key,value]) => ({id: key , ...value }))
      },

      editItem (item) {
        this.editedIndex = this.eventdata.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.eventdata.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.eventdata.splice(this.editedIndex, 1)
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.eventdata[this.editedIndex], this.editedItem)
        } else {
          this.$store.dispatch('setAddEvent', this.addevent_form)
          this.$axios.post(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`, this.$store.getters.getAddEvent)
        }
        this.close()
      },
    },
  }
</script>

<style>

</style>