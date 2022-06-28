<template>
    <div>
        <v-app-bar color ="#83C4F3"
        flat
        dense
        dark>
        <v-toolbar-title>Edit Profile</v-toolbar-title>
        </v-app-bar>
        <v-container class ="pt-0 pb-0">
            <v-row>
                <v-col cols= "12" class="pt-11 pb-0 text-center profile-img"> 
                        <!-- <img src ="~assets/profile-img.png" alt="" width="120" height="120"> -->
                        <img v-if="getLine.pictureUrl == ''" src="~assets/profile-img.png" alt="" width="120">
                        <img v-else :src="getLine.pictureUrl" alt="" width="120">

                </v-col>
                <v-col cols= "12" class = "pt-4 pb-0 text-primary text-title text-center">          
                        {{getLine.displayName}}
                </v-col>
                <v-col cols= "12">
                    <v-form class ="pl-8 pr-8">
                        <v-text-field
                            class = "pt-2 pb-2" 
                            v-model="form.firstname"
                            dense
                            label="First Name"
                        >{{form.firstname}}</v-text-field>
                        <v-text-field
                            class = "pt-2 pb-2"
                            v-model="form.lastname"
                            dense
                            label="Last Name"
                        ></v-text-field>

                        <v-radio-group
                            v-model="form.gender"
                            row
                            class="ma-0"
                            >
                            <v-radio
                                color="#83C4F3"
                                label="Male"
                                value='Male'
                            ></v-radio>
                            <v-radio
                                color="#83C4F3"
                                label="Female"
                                value='Female'
                            ></v-radio>
                        </v-radio-group>

                        <v-text-field
                            class = "pt-2 pb-2"
                            v-model="form.studentID"
                            dense
                            label="Student ID"
                            
                        ></v-text-field>

                        <v-select
                            class = "pt-2 pb-2"
                            :items="yearclass_se"
                            v-model="form.yearclass"
                            label="Year Class"
                            dense
                        ></v-select>

                        <v-text-field
                            class = "pt-2 pb-2"
                            v-model="form.email"
                            dense
                            :rules="emailRules"
                            label="Email"
                            
                        ></v-text-field>
                        <v-text-field
                            class = "pt-2 pb-2"
                            v-model="form.phonenumber"
                            dense
                            :rules="phoneRules"
                            @keypress="onlyNumber($event, 10)"
                            label="Phone Number"
                        ></v-text-field>

                        <v-btn
                            large
                            color="primary"
                            class ="w-100 mt-5" @click="submit">
                            ยืนยัน
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const REGEX_PHONE = /^[0]([0-9]{9})*$/
    const REGEX_NUMBER = /^[0-9]*$/
    export default {
        mounted(){
            },  

        data() {
            return {
                form:{},
                yearclass_se:['1','2','3','4'],
                emailValidated: false,
                phoneValidated: false,
                modal: false,
                emailRules: [ value => this.emailValidator(value)],
                phoneRules: [ value => this.phoneValidator(value)],
                member_data: [],

            }
        },
        computed: {
                getLine(){
                        return this.$store.getters.getLine;      
                        }
                    },

        async created () {
            await this.initialize()
        },
        methods: {
            async initialize () {
            const res = await this.$axios.get(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`)
            this.form = res.data
            },
            submit(){

                    this.$axios.post('https://us-central1-event-bot-628b6.cloudfunctions.net/LineBot',{ 
                    description : "submit register",
                    to : this.$store.getters.getLine.userId, //,"U933cc0e91e577c936856fac8f5612798"
                    msg : `ท่านได้แก้ไขข้อมูลการลงทะเบียนแล้ว\nเวลา: ${new Date().toString()} `
                    })
                    if(this.validate()){
                    this.$store.dispatch('setRegister', this.form)
                    this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`, this.$store.getters.getRegister)
                    .then((res) => {
                        this.$router.push('/register/done')
                    })
                    }
            },
             phoneValidator(value){    
                this.phoneValidated = false  
                if(value == ''){
                    return 'Required'
                }
                if(REGEX_PHONE.test(value) && value.length == 10){ 
                    this.phoneValidated = true
                    return true
                }
                return "Please input Phone number"
                },
            onlyNumber(event, max){  
                if(event.target.value.length == 0){
                    if(event.key != 0){
                    return event.preventDefault()
                    }
                }else{
                    if(!REGEX_NUMBER.test(event.key) || event.target.value.length == max){
                    return event.preventDefault()
                    }
                }      
                }, 
            emailValidator(value){
                this.emailValidated = false
                if(value == ''){
                    return 'Required'
                }
                if(REGEX_EMAIL.test(value)){
                    this.emailValidated = true
                    return true
                }
                return "Email is Invalid"
            },
            validate(){
                let validated = true
                const errors  = []
                const validatorField = [
                    'firstname',
                    'lastname',
                    'email',
                    'phonenumber',
                    'yearclass',
                    'gender',
                    'studentID',

                ]
                validatorField.forEach((field) => {
                    if(this.form[field] == ''){
                        validated = false
                        errors.push(`Please enter your ${field}.`)
                    }
                })
                if(!this.emailValidated){
                    validated = false
                    errors.push(`Email must be valid`)
                }
                if(!this.phoneValidated){
                    validated = false
                    errors.push(`Phone number must be valid`)
                }
                if (!validated){
                    this.dialog = true
                    this.$store.dispatch('setDialog', {
                        isShow: true,
                        title:'Form Error',
                        message: errors.map((error) => error+'<br/>').join('')

                    })
                }
                return validated
                 },
                // next(){
                //     if(this.validate()){
                //         this.$store.dispatch('setRegister', this.form)
                //         this.$router.push('/register/done')
                // }
                // }
        }
    }
</script>
<style lang="scss" scoped>

</style>