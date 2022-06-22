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
            
                <span class="subheading pa-2">{{(typeof member == 'undefined')? '0' : Object.keys(member).length }} / {{member_slot}}</span>
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
                <span class="subheading pa-2">{{(typeof member == 'undefined')? '0' : Object.keys(member).length   }}/ {{member_slot}}</span>
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
                <v-divider></v-divider>
                <p class="event-des mt-3">Description:</p>
                <p class="event-des mb-3">{{description}}</p>
                <v-divider></v-divider>
                <p class="event-des mt-3">Certificate: {{certificate}}</p>
                <p class="event-des">Support: {{food_type}}</p>

            </div>
        </v-card>
        <v-card
        class="mx-auto"
        max-width="400"
        >
        
        <div>
            <v-container >
            <v-row >
                <v-col class="pb-0 pt-4" cols="9">
                    <p class="d-flex align-center ma-0">Notification Setting</p>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="pb-0">
                    
                    <v-switch
                    v-model="switch1"
                    inset
                    class="d-flex align-end ma-0"
                  ></v-switch>  
                </v-col>
            </v-row>
        </v-container>
         <v-banner
            v-model="switch1"
            single-line
            transition="slide-y-transition"
            >
            <v-select
                :items="items"
                :disable="!switch1"
                v-model="noti_data.time_set"
                dense
                outlined
                flat
                label="Time Set"
                class="pa-1"
            ></v-select>
        </v-banner>
        </div>
        </v-card>

        <v-btn
            end
            large
            color="primary"
            class ="w-100 mt-2 " @click="signup">
            Sign up
        </v-btn>
        </v-container>                    
</template>

<script>

export default {
    
    data(){
        return{
            ...this.post,
            member : this.post.member,
            items: ['ก่อนเริ่ม 1 นาที', 'ก่อนเริ่ม 5 นาที', 'ก่อนเริ่ม 30 นาที', 'ก่อนเริ่ม 1 ชั่วโมง'],
            switch1: false,
            userlineId : {},
            noti_data: {
                time_set:'',
                switchData: '',
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
        switch_Data(){
            if (switch1 = false){
                switchData ='Off'
            } else{
                switchData ='On'
            }
        },
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

        // this.$axios.post('https://api.line.me/v2/bot/message/push',{ 
        //     to : 'U933cc0e91e577c936856fac8f5612798',
        //     massages : [ {type : 'text', text : 'He Heee'}]
        // },{ headers : {
        //     'Access-Control-Allow-Origin': '*',
        //     'Referer' : 'https://79bc-1-10-216-187.ap.ngrok.io/',
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer BVPvhHEEmeK6IqQCufn16ZBsMiKBYbQHOeqXJdxhRt6ddy2UiC6qc2h+fhnCercOg5quXqesBNWcTvVzpCmXV3fbMFnecBpkQ9Xk/HOFDGPAlFFXztFcQ9JQjbPA07xoFVrkGbzoDkoxpl46LPV/CQdB04t89/1O/w1cDnyilFU=`
        // } })

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



