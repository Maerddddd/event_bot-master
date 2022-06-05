<template>
  <v-data-table
    :headers="headers"
    :items="member_data"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            rounded
            dense
            outlined
          ></v-text-field>
        </v-toolbar-title>

      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
        outlined
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>

  export default {
    data: () => ({
      search: '',
      headers: [
        {
          text: 'Firstname',
          align: 'start',
          sortable: false,
          value: 'firstname',
        },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phonenumber' },
        { text: 'Date of birth', value: 'dateofbirth'},
        { sortable: false },
      ],
      member_data: [],
    }),

    computed: {
      
    },

    watch: {
    
    },

    async created () {
      await this.initialize()
    },

    methods: {
      async initialize () {
        let res = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members.json`)
        this.member_data =  Object.entries(res.data).map(([key,value]) => ({id: key , ...value }))
        
      },

    },
  }
</script>