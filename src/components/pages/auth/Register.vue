<script>
export default {
  data(){
    return{
      email: '',
      name : '',
      password: '',
      phoneNumber: '',
      companyName: '',
      formIsValid: true,
      capsLockOn: false
    }
  },
  computed: {
    isEmailEmpty() {
      return this.email === '';
    },
    isNameEmpty() {
      return this.name === '';
    },
    isCompanyEmpty() {
      return this.companyName === '';
    },
    isPhoneNumberEmpty() {
      return this.phoneNumber === '';
    },
    isPasswordEmpty() {
      return this.password === '';
    },
    isPasswordShort(){
      return this.password.length < 6;
    },
    containsAt() {
      return !this.email.includes('@');
    }
  },
  methods:{
    capsLockEvent(){
      this.capsLockOn = event.getModifierState("CapsLock");
    },
    // This calls the register method from the auth/action.js
    async submitForm(){
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6 || this.phoneNumber === ''){
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch('register', {
          email: this.email,
          name: this.name,
          password: this.password,
          phoneNumber: this.phoneNumber,
          companyName: this.companyName
        })

        this.$router.replace('/')
      }catch (err){
        console.log(err)
      }
    }

  }
}
</script>

<template>
  <div class="vh-container position-relative d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-6 m-auto">
          <div class="container-login">
            <img class="login-logo" src="../../../../public/img/logo_ungrouped.svg" alt="Logo Imagine Creative Agency">
            <h3 class="font-baskerville">Register form</h3>
            <form @submit.prevent="submitForm">
              <div class="d-flex flex-column margin-top-email">
                <label class="font-poppins margin-bottom-form" for="email">Email*</label>
                <input class="input-main" type="email" id="email" :class="{'not-empty': !isEmailEmpty, 'empty': isEmailEmpty, 'error-border': containsAt}" v-model.trim="email">
              </div>
              <div class="d-flex flex-column margin-top-form">
                <label class="font-poppins margin-bottom-form" for="name">Name*</label>
                <input class="input-main" type="text" id="name"  :class="{'not-empty': !isEmailEmpty, 'empty': isNameEmpty}" v-model.trim="name">
              </div>
              <div class="d-flex flex-column margin-top-form">
                <label class="font-poppins margin-bottom-form" for="password">Password*</label>
                <input  @keydown="capsLockEvent" class="input-main" type="password" :class="{'error-border': isPasswordShort && !isPasswordEmpty, 'not-empty': !isPasswordEmpty && !isPasswordShort }" id="password" v-model.trim="password">
                <p v-if="capsLockOn">Caps Lock is on.</p>
              </div>
              <div class="d-flex flex-column margin-top-form">
                <label class="font-poppins margin-bottom-form" for="phoneNumber">Phone Number*</label>
                <input class="input-main" type="tel" id="phoneNumber"  :class="{'not-empty': !isEmailEmpty, 'empty': isPhoneNumberEmpty}" v-model.trim="phoneNumber">
              </div>
              <div class="d-flex flex-column margin-top-form">
                <label class="font-poppins margin-bottom-form" for="companyName">Company Name*</label>
                <input class="input-main" type="text" id="companyName" :class="{'not-empty': !isEmailEmpty, 'empty': isCompanyEmpty}" v-model.trim="companyName">
              </div>
              <div class="d-flex align-items-center">
                <input class="checkbox-styling" type="checkbox">
                <label class="checkbox-label">Onthouden</label>
              </div>
              <base-button class="btn-main text-white">Submit</base-button>
            </form>
            <div class="text-center margin-top-account">
              <span class="account-text">Al een account?</span><router-link class="account-link" :to="{name:'login'}">Inloggen</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="vh-container2">
    <div class="col-6 bg-login">

    </div>
  </div>
</template>

<style scoped>
.margin-bottom-form{
  margin-bottom: 8px;
}
.margin-top-form{
  margin-top: 39px;
}
.margin-top-email{
  margin-top: 33px;
}
.container-login{
  width: 510px;
}
.margin-top-account{
  margin-top: 35px;
}
.vh-container{
  height: 150vh;
}
.vh-container2{
  height: 150vh;
}
</style>