<template>
  <v-container fluid>
    <p>{{ radios || 'null' }}</p>
    <v-radio-group
      v-model="radios"
      mandatory
    >
      <v-radio
        label="Radio 1"
        value="Yes"
      ></v-radio>
      <v-radio
        label="Radio 2"
        value="No"
      ></v-radio>
    </v-radio-group>
    <v-btn @click="test"> eiei </v-btn>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        radios: null,
      }
    },
    methods: {
        test(){
            console.log(this.radios);
        }
        
    },
  }
</script>