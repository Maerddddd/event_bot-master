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
                :food="post.food"
                :other="post.other"
                :souvenir="post.souvenir"
                :maximun_member="post.maximun_member"
                :countMember="('member' in post)? Object.keys(post.member).length : 0"
                :key="post.id"
                
            />
        </v-col>
    </v-row>
</v-container>
</template>
<script>
    import card from '~/pages/event/card_event/card'
export default {
    components:{
        card,
    },
    props:{
        posts:{
            type:Array,
            require:true
        },
    },
}
    
</script>