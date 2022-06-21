<template>
    <v-container> 
    <v-card
        class="mx-auto"
        max-width="400"
        >
        <v-img v-if="image == ''" src="https://quadmenu.com/divi/wp-content/uploads/sites/8/2013/06/placeholder-image.png" height="200px" class="pa-3">
            <v-row
            align="center"
            justify="end"
            class="pa-2"
            >
            <v-sheet
                rounded="xl"
            >
                <span class="subheading pa-2">0 / {{member_slot}}</span>
            </v-sheet>
            </v-row>
        </v-img>
        <v-img v-else :src="image" height="200px" class="pa-3">
            <v-row
            align="center"
            justify="end"
            class="pa-2"
            >
            <v-sheet
                rounded="xl"
            >
                <span class="subheading pa-2">0 / {{member_slot}}</span>
            </v-sheet>
            </v-row>    
        </v-img>
        <div class="card-content">
            <div>
                <v-card-title class ="pb-0">
                    {{title}}
                </v-card-title>
                    <v-card-text class="text--primary">
                    {{organizer}}
                    </v-card-text>
            </div>
            </div>
            <v-divider></v-divider>
            <div class="card-content2">
                <p class="event-des ">Date: {{date}}</p>
                <p class="event-des mb-3">Time: {{start_time_select}} - {{end_time_select}}</p>
                <p class="event-des">Description:</p>
                <p class="event-des mb-3">{{description}}</p>
                <p class="event-des">Certificate: {{certificate}}</p>
                <p class="event-des">Support: {{food_type}}</p>

            </div>
        </v-card>
        <v-btn
            end
            large
            color="primary"
            class ="w-100 mt-2 " @click="signup">
            Sign up
        </v-btn>
        <v-dialog
      v-model="dialog"
      persistent
      max-width="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        end
        large
        outlined
        class ="w-100 mt-2 "
        color="primary"
        v-bind="attrs"
        v-on="on"
        >
          Notification Setting
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Notification Setting
        </v-card-title>
        <v-container>
            <v-row>
                <v-col>
                    <v-switch
                    v-model="noti_data.switch1"
                    inset
                    :label="`Status: ${noti_data.switch1}`"
                  ></v-switch>
                  <v-divider></v-divider>
                 <v-select
                 class="pt-3"
                  :disabled="!noti_data.switch1"
                  :items="items"
                  v-model="noti_data.time_set"
                  dense
                  outlined
                  flat
                  label="Time Set"
                ></v-select>
                </v-col>
            </v-row>
        </v-container>
        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-container>                    
</template>

<script>
export default {
    
    data(){
        return{
            ...this.post,
            dialog: false,
            items: ['ก่อนเริ่ม 1 นาที', 'ก่อนเริ่ม 5 นาที', 'ก่อนเริ่ม 30 นาที', 'ก่อนเริ่ม 1 ชั่วโมง'],
            switch1: false,
            userlineId : {},
            noti_data: {
                time_set:'',
                switch1: '',
            },
        }
    },
    props:{
        post:{
            type:Object,
            require:false
        }
    },
    methods: {
        
        signup(){
            // liff.init({
            //     liffId: '1657115807-gN69lN61'
            //     }).then(() => {
            //     liff.sendMessages([
            //         {
            //           type: "text",
            //           text: "เข้าร่วมกิจกรรมแล้ว",
            //         },
            //       ])
            //     })
        // this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.id}/member.json`, this.$store.getters.getLine.userId )

        this.userlineId[this.$store.getters.getLine.userId] = 0 
        this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.id}/member.json`, this.userlineId )
        
        this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/select_events/${this.id}.json`,{time_stamp:new Date()})
        this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/select_events/${this.id}/noti.json`,this.noti_data)
        .then((res) => {
            this.$router.push('/event/done')
            const Swal = require('sweetalert2')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your account has been registered.',
                })
            // const functions = require('firebase-functions');
            // const request = require('request-promise');
            // const functions = 'firebase-functions';
            // const request = 'request-promise';
            // const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
            // const LINE_HEADER = {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=`
            //             };

            // exports.LineBotPush = functions.https.onRequest((req, res) => {
            // return request({
            // method: `GET`,
            // uri: `https://api.openweathermap.org/data/2.5/weather?units=metric&type=accurate&zip=10330,th&appid=98f0b338100fb455c54433f0bc54057c`,
            // json: true
            // }).then((response) => {
            // const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
            // return push(res, message);
            // }).catch((error) => {
            // return res.status(500).send(error);
            // });
            // });

            // const push = (res, msg) => {
            // return request({
            // method: `POST`,
            // uri: `${LINE_MESSAGING_API}/push`,
            // headers: LINE_HEADER,
            // body: JSON.stringify({
            //     to: `${this.$store.getters.getLine.userId}`,
            //     // U933cc0e91e577c936856fac8f5612798
            //     messages: [
            //     {
            //         type: `text`,
            //         text: msg
            //     }
            //     ]
            // })
            // }).then(() => {
            // return res.status(200).send(`Done`);
            // }).catch((error) => {
            // return Promise.reject(error);
            // });
            // }


            })
        },
    },
}
</script>

<style lang="scss" scoped>
    .v-card__title{
        font-size: 16px;
        color:#314F64;
    }
    .v-card__text{
        font-size: 14px;
        color:#454545;
    }
    .subheading{
        font-size: 14px;
    }
    .card-content{
        display: flex;
        justify-content: space-between;
        padding: 15px ; 
    }
    .v-card__title,.v-card__text{
        padding: 0px;
    }
    .iconeiei{
        padding: 0px;
        box-shadow: none !important;
    }
    .mx-auto{
        border-radius:10px;
    }
    .view-detail{
        font-size: 13px;
        color:#314F64;
        border-radius: 8px;
        padding: 10px;
        background-color: white;
        font-weight: bold;
        display: inline;
        position: absolute;
        bottom: 11px;
        right: 11px;

    }
    .v-card+.v-card{
        margin-top: 10px;
    }
    .card-content2{
        padding: 15px;
        padding-bottom: 15px !important;
        
    }
    .event-des{
        font-size: 14px !important;
        color:#314F64;
        margin: 0px;
    }

</style>



