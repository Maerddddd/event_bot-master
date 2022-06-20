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
        </v-container>                    
</template>

<script>
export default {
    data(){
        return{
            ...this.post
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
            liff.init({
                liffId: '1657115807-gN69lN61'
                }).then(() => {
                liff.sendMessages([
                    {
                      type: "text",
                      text: "เข้าร่วมกิจกรรมแล้ว",
                    },
                  ])
                })
        this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/select_events/${this.id}.json`,{time_stamp:new Date()})
        .then((res) => {
            this.$router.push('/event/noti')
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



