<template>
  <v-app>
    <nuxt></nuxt>
    <Dialog/>
  </v-app>
</template>

<script>
import Dialog from '~/components/Dialog'

export default {
  components: {
    Dialog
}
}
</script>

<style lang="scss" >

    .v-application{
        width: 100%;
        font-family:'Roboto', sans-serif;
        background-color:#F6FBFF !important;
    }
    .v-application .primary{
        background-color:#83C4F3 !important;
        // border-color:#83C4F3 !important;
    }
    .v-toolbar__title{
        color: white;
        text-align: center;
        width: 100%;
        font-size:  16px;
        font-weight: medium;
    }
    .text-primary{
        color:#314F64;
    }
    .text-title{
        font-size: 16px;
        font-weight: bold;
  }
    .w-100{
        width: 100%;
    }
    .v-btn{
        font-weight:300;
    }
    .v-list-item__subtitle{
        font-size: 12px;
    }
    .v-form{
        padding:0 20px;
    }
    .text-content{
    font-size: 14px;
    }
    // .v-card-title{
    //     font-size: 16px;
    //     color:#314F64;
    // }
    // .v-card-subtitle{
    //     font-size: 10px;
    //     color:#454545;
    // }
    .profile-img{
        img{
            border-radius: 50%;
        }
    }
    .v-card{ 
        padding: 0px !important;
    }
    .swal2-title{
        font-family:'Roboto', sans-serif !important;
        color: #314F64 !important;
        font-size: 20px !important;
    }
    .swal2-html-container{
        font-family:'Roboto', sans-serif !important;
        font-size: 16px !important;
    }
    .swal2-confirm.swal2-styled{
        font-family:'Roboto', sans-serif !important;
        background-color: #83C4F3 !important;
    }
.theme--light.v-banner.v-sheet:not(.v-sheet--outlined):not(.v-sheet--shaped) .v-banner__wrapper {
    border-bottom: 0;
}
.v-banner__wrapper {
    padding: 0px !important;
}

</style>

