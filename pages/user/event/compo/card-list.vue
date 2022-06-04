<template>
 <v-container class ="pt-0 pb-0">
    <v-row >
        <v-col cols="12">
            <card
                v-for = "post in posts"
                :id="post.id"
                :title="post.title"
                :organizer="post.organizer"
                :image="post.image"
                :certificate="post.certificate"
                :food_type="post.food_type"
                :member_slot="post.member_slot"
                :key="post.id"
            />
        </v-col>
    </v-row>
</v-container>
</template>
<script>
    import card from '~/pages/user/event/compo/card'
export default {
    components:{
        card,
    },
    props:{
        posts:{
            type:Array,
            require:true
        }
    },
}
    
</script>