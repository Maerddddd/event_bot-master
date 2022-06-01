<template>
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
                        
                      <v-btn
                        color="primary"
                        @click="addevent"
                      >
                        Submit
                      </v-btn>
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
</template>