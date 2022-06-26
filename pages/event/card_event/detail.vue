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
            
                <span class="subheading pa-2">{{(typeof member == 'undefined')? '0' : Object.keys(member).length }} / {{maximun_member}}</span>
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
                <span class="subheading pa-2">{{(typeof member == 'undefined')? '0' : Object.keys(member).length   }}/ {{maximun_member}}</span>
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
                <v-card-text>
                    <span class="event-des ">Date: </span>{{date}}
                </v-card-text>
                <v-card-text class="mb-3">
                    <span class="event-des ">Time: </span>{{start_time_select}} - {{end_time_select}}
                </v-card-text>
                <v-divider class="mb-3"></v-divider>
                <v-card-text class="mb-3">
                    <span class="event-des ">Description: </span>{{description}}
                </v-card-text>
                <v-divider class="mb-3"></v-divider>
                <v-card-text>
                    <span class="event-des ">Certificate: </span>{{certificate}}
                </v-card-text>
                <v-card-text>
                    <span class="event-des ">Support: </span>{{food}} {{souvenir}} {{other}}
                </v-card-text>

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
                    <p class="d-flex align-center ma-0 mt-1 event-des ">Notification Setting</p>
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
            <div class="banner">
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
            items: ['ก่อนเริ่ม 1 นาที', 'ก่อนเริ่ม 5 นาที', 'ก่อนเริ่ม 30 นาที', 'ก่อนเริ่ม 60 นาที'],
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
            //           text: "ลงชื่อร่วมกิจกรรมแล้ว",
            //         },
            //       ])
            //     })

        // // this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/events/${this.id}/member.json`, this.$store.getters.getLine.userId )

        this.$axios.post('https://us-central1-event-bot-628b6.cloudfunctions.net/LineBot',{ 
            description : "submit register",
            to : this.$store.getters.getLine.userId, //,"U933cc0e91e577c936856fac8f5612798"
            msg : `ท่านได้ลงชื่อเข้าร่วมกิจกรรม ${this.title} แล้ว\nเวลา: ${new Date().toString()} `
        })
   
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
    .banner{
        padding: 0px 12px;
    }

</style>



