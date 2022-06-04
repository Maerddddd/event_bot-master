<template>
<v-container>
    <!-- <v-card
        class="mx-auto"
        max-width="400"
        @click="select"
        >
        <v-img height="200px" :src="session.img">
        </v-img>
        <div class="card-content">
            <div>
                <v-card-title class ="pb-0">
                    {{session.title}}
                </v-card-title>
                    <v-card-text class="text--primary">
                    {{session.organizer}}
                    </v-card-text>
            </div>
                <v-card
                    v-for="n in 1"
                    :key="n"
                    :class="n === 1 && 'mt-auto'"
                    class="iconeiei"
                    tile
                    >
                    <v-icon :color="(session.certificate == 'Yes')? '#83C4F3' : '#EAEAEA' ">
                        mdi-certificate-outline
                    </v-icon>
                    <v-icon :color="(session.food == 'Yes')? '#83C4F3' : '#EAEAEA' ">
                        mdi-food
                    </v-icon>
                    <v-icon :color="(session.signer > 0)? '#83C4F3' : '#EAEAEA' ">
                        mdi-account
                    </v-icon>
                    <span class="subheading">{{session.signer}}/{{session.maxsigner}}</span>
                </v-card>             
            </div>
        </v-card> -->

        <v-card
        class="mx-auto"
        max-width="400"
        @click="more_detail"
        >
        <v-img height="200px" :src="image"></v-img>
        <div class="card-content">  
            <div>
                <v-card-title class ="pb-0">
                    {{title}}
                </v-card-title>
                <v-card-text class="text--primary">
                    {{organizer}}
                    
                </v-card-text>
            </div>
                <v-card class="icon-style" tile >
                    <v-icon :color="(certificate == 'No certificate')? '#83C4F3' : '#EAEAEA'">
                        mdi-certificate-outline
                    </v-icon>
                    <v-icon :color="(food_type == 'อาหารกลางวันและอาหารว่าง','อาหารกลางวัน','อาหารว่าง')? '#83C4F3' : '#EAEAEA'">
                        mdi-food
                    </v-icon>
                    <v-icon :color="(member_slot > 0)? '#83C4F3' : '#EAEAEA'">
                        mdi-account
                    </v-icon>
                </v-card>             
            </div>
            <!-- <v-btn>
                <nuxt-link :to ="more_detail">test</nuxt-link>
            </v-btn> -->
        </v-card>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {

    props: {
        id:{
            type:String,
            require:false
        },
        title:{
            type:String,
            require:true
        },
        organizer:{
            type:String,
            require:true
        },
        image:{
            type:String,
            require:true
        },
        certificate:{
            type:String,
            require:true
        },
        food_type:{
            type:String,
            require:true
        },
        member_slot:{
            type:String,
            require:true
        },
    },

    data:()=>({
        loadData:[],

    }),
    methods: {

        // async test(){
        // console.log("eiei");
        //    await this.getData().then((result)=>{
        //         console.log(result);
        //     })
        //     console.log("zaza");
        //     // await axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
        //     // .then(res =>{
        //     //     console.log(res);
        //     // })
        // },

        // getData(){
        //     return new Promise((resolve,reject)=>{
        //         setTimeout(()=>{
        //         const data = axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events.json")
        //         .then(res =>{
        //             return res
        //         })
        //         resolve(data)
        //         },4000)
        //     })
        // },
        more_detail(){
            this.$router.push('/user/event/compo/detail/'+this.id)
        
    },
    // computed:{
    //         more_detail(){
    //             return '/user/event/compo/detail/'+this.id
    //         // this.$router.push('/user/event/compo/detail?id=' + this.session.id)
    //         // this.$router.push('/user/event/compo/detail/'+this.id)
    //     },
    // }
        
  }
}

</script>
<style lang="scss" scoped>
    .updatedColor{
        color:#83C4F3;
    }
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
    .icon-style{
        border-radius: 10px;
        margin-top: auto;
        padding: 0px;
        box-shadow: none !important;
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
</style>