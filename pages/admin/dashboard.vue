<template>
  <div>
    <v-container grid-list-xs fluid>
      <v-row>
        <v-col cols="2">
          <card-box
            title="Members"
            :fileCount="Object.keys(member_data).length"
            color="white"
            icon="mdi-account-multiple"
            flat
          ></card-box>
        </v-col>
        <v-col cols="2">
          <card-box
            title="Events"
            :fileCount="Object.keys(event_data).length"
            color="white"
            flat
            icon="mdi-alpha-e-box"
          ></card-box>
        </v-col>
      </v-row>
        <!-- {{this.test_data}} -->
      <v-row>
        <v-col cols="8">
          <v-card elevation="0" class="pa-5">
            <BarChart v-if = "loaded" :data= "chart_data"/>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card elevation="0"
           class="pa-5">
            <CardData 
              v-for="(items,n) in cardData"
              :key="n"
              :data= "items"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <BC_gender v-if = "loaded" :data= "gender_data" />
    <BC_Yearclass v-if = "loaded" :data= "yearclass_data" /> -->
  </div>
</template>

<script>
import CardBox from "~/components/CardBox";
import CardData from "~/components/CardData";
import BarChart from "~/pages/admin/chart";
import BC_Yearclass from "~/pages/admin/BC_yearclass";
import BC_gender from "~/pages/admin/BC_gender";

export default {
  components: {
    CardBox,
    CardData,
    BarChart,
    BC_Yearclass,
    BC_gender,
  },
  data() {
    return {
      loaded: false,
      member_data: [],
      event_data: [],
      chart_data: null,
      cardData: [],
      gender_data: [],
      yearclass_data: [],
    };
  },
    async mounted () {
      this.loaded = false

      try {
        this.loaded = false
          let members = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
          let events = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/events.json`)
          this.member_data =  Object.entries(members.data).map(([key,value]) => ({id: key , ...value }))
          this.event_data =  Object.entries(events.data).map(([key,value]) => ({id: key , ...value }))

          this.chart_data = Object.fromEntries(this.event_data.map(e => {
          let countmember = 0
          if (e.member!= null) {
            Object.entries(e.member).forEach( element => countmember++)
          }

          this.cardData.push({title: e.title , countmember: countmember})
          return [e.title,countmember]
          }));

          const entries_events =  Object.entries(events.data).map(([eventId, eventValue]) => ({id : eventId, ...eventValue }))
          this.gender_data = Object.fromEntries(entries_events.map(e => {
            let genArray = Object.entries(e.member || {}).map(([memberId,_]) => members.data[memberId]?.profile.gender || {} )
            let maleArray = genArray.filter(element => {return element == 'Male'}).length
            let femaleArray = genArray.filter(element => {return element == 'Female'}).length
            return [
              e.title,
              [maleArray,femaleArray]
            ]          
          })
          ),
          this.yearclass_data = Object.fromEntries(entries_events.map(e => {
            let yearArray = Object.entries(e.member || {}).map(([memberId,_]) => members.data[memberId]?.profile.yearclass || {} )
            let oneArray = yearArray.filter(element => {return element == '1'}).length
            let twoArray = yearArray.filter(element => {return element == '2'}).length
            let threeArray = yearArray.filter(element => {return element == '3'}).length
            let fourArray = yearArray.filter(element => {return element == '4'}).length
            return [
              e.title,
              [oneArray,twoArray,threeArray,fourArray]
            ]          
          })
          )

          
          console.log(this.yearclass_data);

        this.loaded = true
      } catch (e) {
        console.error(e)
      }
      }
};
</script>
