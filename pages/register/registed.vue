<template>
    <div>
        <v-app-bar color ="#83C4F3"
        flat
        dense
        dark>
        <v-toolbar-title>Event Bot</v-toolbar-title>
        </v-app-bar>
        <v-container class ="pt-0 pb-0">
            <v-row>
                <v-col cols= "12" class="pt-11 pb-0 text-center profile-img"> 
                        <img v-if="getLine.pictureUrl == ''" src="~assets/profile-img.png" alt="" width="120">
                        <img v-else :src="getLine.pictureUrl" alt="" width="120">
                </v-col>
                <v-col cols= "12" class = "pt-4 pb-0 text-primary text-title text-center">          
                        {{getLine.displayName}}
                </v-col>
                <v-col cols= "12">
                    <v-form class ="pl-8 pr-8">
                       <v-list two-line
                       class ="pt-0 pb-0 ">
                            <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle>ชื่อจริง</v-list-item-subtitle>
                                <v-list-item-title>{{form.firstname}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            
                            <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >นามสกุล</v-list-item-subtitle>
                                <v-list-item-title>{{form.lastname}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >เพศ</v-list-item-subtitle>
                                <v-list-item-title>{{form.gender}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                             <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >รหัสนักเรียน</v-list-item-subtitle>
                                <v-list-item-title>{{form.studentID}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                             <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >ชั้นปี</v-list-item-subtitle>
                                <v-list-item-title>{{form.yearclass}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >อีเมล</v-list-item-subtitle>
                                <v-list-item-title>{{form.email}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content class ="pt-0">
                                <v-list-item-subtitle >เบอร์โทรศัพท์</v-list-item-subtitle>
                                <v-list-item-title >{{form.phonenumber}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                        </v-list>
                        
                        <v-btn
                            large
                            color="primary"
                            class ="w-100 mt-5" @click="register">
                            ลงทะเบียน
                        </v-btn>
                        <v-btn
                            large
                            outlined
                            color="primary"
                            class ="w-100 mt-4" @click="edit">
                            แก้ไขข้อมูล
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
 export default {
        data() {
            return {
                form:{
                    firstname:this.$store.getters.getRegister.firstname,
                    lastname:this.$store.getters.getRegister.lastname, 
                    email:this.$store.getters.getRegister.email,
                    phonenumber:this.$store.getters.getRegister.phonenumber,
                    yearclass:this.$store.getters.getRegister.yearclass,
                    gender:this.$store.getters.getRegister.gender,
                    studentID:this.$store.getters.getRegister.studentID,
                },              
            }
        },
        computed: {
                getLine(){
                        return this.$store.getters.getLine;      
                        }
                    },
        methods: {
            edit() {
                this.$router.push('/register')
                },
            register(){
                    this.$axios.post('https://us-central1-event-bot-628b6.cloudfunctions.net/LineBot',{ 
                    description : "submit register",
                    to : this.$store.getters.getLine.userId,
                    msg : `ท่านได้ลงทะเบียน Event Bot แล้ว\nเวลา: ${new Date().toString()} `
                    })

                    this.$store.dispatch('setRegister', this.form)
                    this.$axios.patch(`https://event-bot-628b6-default-rtdb.firebaseio.com/members/${this.$store.getters.getLine.userId}/profile.json`, this.$store.getters.getRegister)
                    .then((res) => {
                        this.$router.push('/register/done')
                    })
                    },
                }
            }
</script>
<style lang="scss" scoped>

    .v-list-item{
        padding: 0;
    }
    .theme--light.v-list {
    background: #F6FBFF;
    
    }
    
    

</style>