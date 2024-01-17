<script>

import store from "@/store";

export default {
  data() {
    return {
      email: '',
      password: '',
      capsLockOn: false
    };
  },
  computed: {
    isEmailEmpty() {
      return this.email === '';
    },
    isPasswordEmpty() {
      return this.password === '';
    },
    isPasswordShort(){
      return this.password.length < 6;
    },
    containsAt() {
      return !this.email.includes('@');
    },
    loginError() {
      // Access the loginError from the Vuex store
      return this.$store.getters.getError;
    }
  },
  methods: {
    redirect() {
      this.$router.push('/auth/index');
    },
    capsLockEvent(){
      this.capsLockOn = event.getModifierState("CapsLock");
    },
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/auth/index');
      } catch (err){
        console.log(err)
      }
    },
  },
  beforeUpdate() {
    console.log(store.getters.isAuthenticated)
    if (store.getters.isAuthenticated){
      this.$router.push('/auth/index')
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
            <img class="login-logo" src="/img/logo_ungrouped.svg" alt="Logo Imagine Creative Agency">
            <h3 class="font-baskerville">Inloggen</h3>
            <form @submit.prevent="login">
              <div class="d-flex flex-column margin-top-email">
                <label class="font-poppins margin-bottom-form" for="login">Email*</label>
                <input class="input-main" :class="{'not-empty': !isEmailEmpty, 'empty': isEmailEmpty, 'error-border': loginError || containsAt}" type="email" v-model.trim="email" id="email" required/>
              </div>
              <div class="d-flex flex-column">
                <label class="font-poppins margin-bottom-form margin-top-form" for="password">Wachtwoord*</label>
                <input @keydown="capsLockEvent" class="input-main" v-model.trim="password" :class="{'error-border': isPasswordShort && !isPasswordEmpty || loginError, 'not-empty': !isPasswordEmpty && !isPasswordShort }" id="password" type="password" required/>
                <p v-if="capsLockOn" class="checkbox-label">Caps Lock is on.</p>
                <p v-if="loginError" class="error-message checkbox-label">{{ loginError.error }}</p>
              </div>
              <div>
                <div class="d-flex align-items-center">
                  <input class="checkbox-styling" type="checkbox">
                  <label class="checkbox-label">Onthouden</label>
                  <router-link class="forgot-password" :to="{name: 'forgot-password'}">Wachtwoord vergeten?</router-link>
                </div>
              </div>
              <base-button :disabled="isEmailEmpty || isPasswordShort" class="btn-main text-white">Inloggen</base-button>
            </form>
            <div class="text-center margin-top-account">
              <span class="account-text">Nog geen Account</span><router-link class="account-link" to="/register">Registreren</router-link>
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
.not-empty{
  border: 2px solid #9DC4A3;
}
.error-border{
  border: 2px solid #ff5e5e;
}
.empty{
  border: 2px solid #D4D4D4;
}
</style>