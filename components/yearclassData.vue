<template>
<div class="pt-1">
  <v-card elevation="0" rounded="xl" class="pa-2 mt-1 mb-1" outlined>
    <v-container fluid>
    <v-row >
        <v-col>
        <span class="text-sub">ชื่อ: </span> <span class="text-head">{{data.title}}</span>
        <br>
        <span class="text-sub">ชั้นปี 1: </span> <span>{{data.oneArray}}</span>
        <br>
        <span class="text-sub">ชั้นปี 2: </span> <span>{{data.twoArray}}</span>
        <br>
        <span class="text-sub">ชั้นปี 3: </span> <span>{{data.threeArray}}</span>
        <br>
        <span class="text-sub">ชั้นปี 4: </span> <span>{{data.fourArray}}</span>
        </v-col>
    </v-row>
    </v-container>
</v-card>
</div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.head{
    background-color: #F6FBFF;
}
.subhead{
    background-color: #eaf4fd;
}
.text-sub{
  font-size: 14px !important;
  color: #222222 !important;
}
.text-head{
  font-size: 16px !important;
  color: #314F64 !important;
  font-weight: 500 !important;
}
</style>
