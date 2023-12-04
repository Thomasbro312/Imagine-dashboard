<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
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
    }
  },
  methods: {
    capsLockEvent(){
      this.capsLockOn = event.getModifierState("CapsLock");
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
            <img class="login-logo" src="../../../../../public/img/logo_ungrouped.svg" alt="Logo Imagine Creative Agency">
            <h3 class="font-baskerville-forgot">Verificatiecode</h3>
            <p class="text-forgot">We hebben een 6-cijferige code verstuurd naar placeholder@email.com Vul deze hieronder in. Niet gevonden? Kijk uw spamfolder na of verstuur een nieuwe code door hier te drukken.</p>
            <form @submit.prevent="">
              <div class="d-flex flex-column margin-top-email margin-bot-form">
                <label class="font-poppins margin-bottom-form" for="login">Code*</label>
                <input class="input-main" :class="{'not-empty': !isEmailEmpty, 'empty': isEmailEmpty,}" type="email" v-model.trim="email" id="email" required/>
              </div>
              <base-button class="btn-main text-white" link to="new-password">Verder</base-button>
            </form>
            <div class="text-center margin-top-account">
              <span class="account-text">Ander emailadres</span><router-link class="account-link" :to="{name: 'forgot-password'}">opgeven</router-link>
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
.margin-bot-form{
  margin-bottom: 60px;
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
.text-forgot{
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0;
  color: #222222;
  opacity: 1;
}
</style>