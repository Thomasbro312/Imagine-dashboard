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
    isPasswordEmpty() {
      return this.password === '';
    },
    isPasswordShort(){
      return this.password.length < 6;
    },
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
            <h3 class="font-baskerville-forgot">Nieuw Wachtwoord</h3>
            <p class="text-forgot">Voordat u uw wachtwoord kunt veranderen, dient u uw account door middel van een code te verifiëren.</p>
            <form @submit.prevent="">
              <div class="d-flex flex-column margin-top-email margin-bot-form">
                <label class="font-poppins margin-bottom-form" for="">Nieuw wachtwoord*</label>
                <input class="input-main" :class="{'error-border': isPasswordShort && !isPasswordEmpty, 'not-empty': !isPasswordEmpty && !isPasswordShort}" v-model="this.password" required/>
              </div>
              <base-button class="btn-main text-white" link to="password-changed">Veranderen</base-button>
            </form>
            <div class="text-center margin-top-account">
              <span class="account-text">Ga terug naar</span><router-link class="account-link" :to="{name: 'login'}">Inloggen</router-link>
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
.vh-container{
  height: 100vh;
}
.text-forgot{
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0;
  color: #222222;
  opacity: 1;
}
</style>