<template>
<div class="pt-1">
  <v-card elevation="0">
    <v-container fluid>
    <v-row class="5">
        <v-col cols="3" class="head">
        <p>
            {{data.title}}
        </p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="9" class="subhead">
        <p class="sub pl-2">
            {{data.count}}
        </p>
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
      chartData: {
        labels: Object.keys(this.data),
        datasets: [ {
          data: Object.values(this.data),
          label: "Member",
          backgroundColor: '#83C4F3',

          }
          ]
      },
      chartOptions: {
        responsive: true
      }
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
</style>
