<template>
        <v-card elevation="0"
        class="card_style">
            <v-row >
                <v-col cols ="5">
                    <v-img width="auto" src="https://p-u.popcdn.net/blogs/covers/000/000/118/cover/EVP_Cover094.png?1544690270"></v-img>
                </v-col>
                <v-col cols ="7">
                    <v-form>
               <div class="title-card text-primary text-center">Event Detail</div>
                <v-subheader>
                    Event name:
                  </v-subheader>
                  <v-text
                    color="#314F64"
                  >ลองเทส</v-text>
            
                  <v-subheader>
                    Organizer:
                  </v-subheader>
                  <v-text
                    color="#83C4F3"
                  >ลองเทส</v-text>

                  <v-subheader>
                    Date:
                  </v-subheader>
                  <v-text
                    color="#314F64"
                  >25/04/2565</v-text>

                  <v-subheader>
                    Time:
                  </v-subheader>
                  <v-text
                    color="#314F64"
                  >9:00 - 12.00</v-text>
                  
                  <v-subheader>
                    Event description:
                  </v-subheader>
                  <v-text
                    color="#314F64"
                  >ลองเทส ลองเทส ลองเทส</v-text>
                 
                    
                    <v-subheader>
                    Certificate:
                    </v-subheader>
                    <v-text
                    color="#314F64"
                  >มีใบรับรอง</v-text>
                    


                    <v-subheader>
                    Support:
                    </v-subheader>
                    <v-text
                    color="#314F64"
                  >มีอาหารว่าง</v-text>
                   
                    
                    <v-subheader>
                    จำนวนคนที่เปิดรับ:
                    </v-subheader>
                    <v-text
                    color="#314F64"
                  >30</v-text>
                   
            </v-form>
                </v-col>
            </v-row>
            <v-row>
              <v-col><v-data-table
    :headers="headers"
    :items="member_data"
    :search="search"
    sort-by="calories"
    class="elevation-1"
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
          max-width="600px"
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
            <v-form>
               <div class="title-card text-primary text-center">{{ formTitle }}</div>
                <v-subheader>
                    Event name:
                  </v-subheader>
                  <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.title"
                    outlined
                    dense
                  ></v-text-field>
            
                  <v-subheader>
                    Organizer:
                  </v-subheader>
                  <v-text-field
                    color="#83C4F3"
                    v-model="editedItem.organizer"
                    outlined
                    dense
                  ></v-text-field>

                  <v-subheader>
                    Date:
                  </v-subheader>
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
                  <v-row>
                  <v-col>

                        <v-subheader>
                          Start time:
                        </v-subheader>
                        <v-select
                          color="#83C4F3"
                          v-model="editedItem.start_time_select"
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
                          v-model="editedItem.end_time_select"
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
                          v-model="editedItem.description"
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
                            value="Yes"
                            color="#83C4F3"
                            label="Food"
                            hide-details
                          ></v-checkbox>
                          <v-select
                          :disabled="!food"
                          v-model="editedItem.food_type"
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
                          v-model="editedItem.num"
                          :items="num"
                          dense
                          outlined
                        ></v-select>
                  </v-form>

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
                  <v-card-title class="title-card text-primary text-center">Are you sure you want to delete this item?</v-card-title>
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
          <v-btn
            elevation="0"
            small
            
          >
            More Details
          </v-btn>
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
        </v-col>
            </v-row>
        </v-card>
</template>

<script>
export default {
    data: () => ({
        certificate: null,
        food_type: ['อาหารกลางวัน','อาหารว่าง','อาหารกลางวันและอาหารว่าง'],
        checkbox: false,
        food: false,
        start_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
        end_time_select: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],
        num: ['10','20','30','40','50'],
        certificate: ['Have certificate','No certificate'],
        date: null,
        menu: false,

      search: '',
      dialog: false,
      dialogDelete: false,
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
      member_data: [],
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
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      async initialize () {
        let res = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
        this.member_data =  Object.entries(res.data).map(([key,value]) => ({id: key , ...value }))
        
      },

      editItem (item) {
        this.editedIndex = this.member_data.indexOf(item)
        // console.log(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.member_data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$axios.delete(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.member_data[this.editedIndex].id}.json`)
        this.member_data.splice(this.editedIndex, 1)
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
          Object.assign(this.member_data[this.editedIndex], this.editedItem)
          this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.member_data[this.editedIndex].id}.json`,this.editedItem)
          console.log(this.editedItem)
        } else {
          this.member_data.push(this.editedItem)
          this.$axios.post(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`,this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style lang="scss" scoped>
.card_style{ 
    border-radius: 10px;
}
</style>