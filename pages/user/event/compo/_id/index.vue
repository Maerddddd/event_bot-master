<template>
    <Detail :post="card_detail"/>
</template>
<script>
    import Detail from '~/pages/user/event/compo/detail'
    import axios from 'axios'
    export default {
        components:{
            Detail
        },
        asyncData(context) {
            return axios.get("https://event-bot-628b6-default-rtdb.firebaseio.com/events/"+context.params.id+".json")
            .then(res=>{
                return {
                    card_detail:{
                        ...res.data,id:context.params.id
                    }
                }
            }).catch(e=>context.error(e));
        },
}
</script>