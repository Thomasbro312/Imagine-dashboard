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
    },
    login() {
      try {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
        this.$router.replace('/auth/index');
      } catch (err){
        console.log(err)
        this.error= err.message || 'Failed to login'
      }
    },
  }
}

</script>

<template>
  <div class="vh-container position-relative d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="container-login">
            <img class="login-logo" src="https://media.discordapp.net/attachments/1071487102723833896/1089906927674347530/togif.gif" alt="">
            <h3 class="font_baskerville">Inloggen</h3>
            <form class="" @submit.prevent="login">
              <div class="d-flex flex-column margin-top-email">
                <label class="font_poppins margin-bottom-form" for="login">Email*</label>
                <input class="input-main" :class="{'not-empty': !isEmailEmpty, 'empty': isEmailEmpty, 'error-border': containsAt}"  type="email" v-model.trim="email" id="email" required/>
              </div>
              <div class="d-flex flex-column">
                <label class="font_poppins margin-bottom-form margin-top-form" for="password">Wachtwoord*</label>
                <input @keydown="capsLockEvent" class="input-main" v-model.trim="password" :class="{'error-border': isPasswordShort && isPasswordEmpty, 'not-empty': !isPasswordEmpty && !isPasswordShort }" id="password" type="password" required/>
                <p v-if="capsLockOn">Caps Lock is on.</p>
              </div>
              <div>
                <div class="d-flex align-items-center">
                  <input class="checkbox-styling" type="checkbox">
                  <label for="" class="checkbox-label">Onthouden</label>
                  <a class="forgot-password" href="">Wachtwoord vergeten?</a>
                </div>
              </div>
              <base-button :disabled="isEmailEmpty || isPasswordShort" class="btn-main text-white">Inloggen</base-button>
            </form>
            <div class="text-center margin-top-account">
              <span class="account-text">Nog geen Account</span><a class="account-link" href="">Registreren</a>
            </div>
          </div>
        </div>
        <div class="col-6 bg-login">
        </div>
      </div>
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
  height: 100vh;
}
.login-logo{
  height: 100px;
  position: absolute;
  margin-top: -150px
}
</style>