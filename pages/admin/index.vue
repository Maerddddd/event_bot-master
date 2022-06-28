<template>
<v-container class="size">
    <v-card>
        <div class="card-content">
          <img src="~assets/bg.png" width="400px">
          <v-form
            class="input-form"
            ref="form"
            lazy-validation
          > 
            <div class ="text-title">เข้าสู่ระบบ</div>
            <v-text-field
              v-model="username"
              label="ชื่อผู้ใช้"
            ></v-text-field>

            <v-text-field
              v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
              label="รหัสผ่าน"

            ></v-text-field>
            <v-btn
              color="primary"
              @click="Signin"
              large
            >
                เข้าสู่ระบบ
            </v-btn>
          </v-form>
          </div>
        </v-card>
    </v-container>
</template>
<script>


export default {
  data:() => ({
    username:'',
    password:'',
    show1: false,
    rules: {
          required: value => !!value || 'Required.',
        },
    
  }),
  methods: {
    Signin(){
      if (this.username == 'admin' && this.password =='admin')
      {
        this.$router.push('/admin/main')
          const Swal = require('sweetalert2')
          const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
          Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      }
      else {
        const Swal = require('sweetalert2')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
}
    },
  }
}
</script>

<style lang="scss" scoped>
  .size{
    margin: 90px auto;
    width: auto;
  }
  .text-title{
    padding-top: 130px;
    padding-bottom: 70px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }
  .input-form{
    padding: 0px 35px;
  }
  .card-content{
    display: flex;
    justify-content: flex-end;
  }
  .v-btn{
    width: 300px ;
  }
</style>