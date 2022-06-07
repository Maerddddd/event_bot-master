<template>
<v-container>
        <v-card
        class="mx-auto"
        max-width="400"
        @click="more_detail"
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
                    {{title.slice(0,35)}}
                </v-card-title>
                <v-card-text class="text--primary">
                    {{organizer}}
                    
                </v-card-text>
            </div>
                <v-card class="icon-style" tile >
                    <v-icon :color="(certificate == 'Have certificate')? '#83C4F3' : '#EAEAEA'">
                        mdi-certificate-outline
                    </v-icon>
                    <v-icon :color="(food_type == '')? '#EAEAEA' : '#83C4F3' ">
                        mdi-food
                    </v-icon>
                </v-card>             
            </div>
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
            require:false
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

        more_detail(){
            this.$router.push('/event/card_event/'+this.id)
        
    },
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