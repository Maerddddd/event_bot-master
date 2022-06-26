<template>
<v-card v-bind="$attrs" v-on="$listeners" rounded="xl" class="pa-3">
  <v-list-item>
    <v-list-item-content>
      <v-layout wrap>
    <v-row>
      <v-col>
        <v-list-item-title class="my-2 text-left text-head" :class="titleClass">{{title}}</v-list-item-title>
        <span class="text-sub">{{fileCount}}</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="text-right pt-6">
        <v-icon size="36" :color="iconColor" >{{icon}}</v-icon>
      </v-col>
    </v-row>
    </v-layout>
    </v-list-item-content>
  </v-list-item>
</v-card>
</template>

<script>
export default {
  inheritAttrs:false,
  props: {
    title:{type:String,default:''},
    fileSize:{type:String,default:'0'},
    fileCount:{default:'0'},
    icon: {type:String,default: ''},
    iconColor: {type:String,default: '#83C4F3'},
    titleClass: {type:String,default: 'black--text'}
  }
}
</script>

<style lang="scss" scoped>
.text-sub{
  font-size: 18px;
  color: #314F64 !important;
  font-weight: bold !important;

}
.text-head{
  color: rgb(100, 100, 100) !important;
  font-size: 14px;
  
  
}

</style>