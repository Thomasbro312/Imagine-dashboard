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
            <p class="text-forgot">Uw wachtwoord is succesvol aangepast. U kunt weer bij uw account, het overzicht en een nieuwe aanvraag uitvoeren.</p>
            <form class=" margin-top" @submit.prevent="">
              <base-button class="btn-big-text text-white container-width" link to="/">Terug naar inloggen</base-button>
            </form>
            <div class="text-center margin-top-account">
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
.btn-big-text{
  background: #222222 0 0 no-repeat padding-box;
  border-radius: 32px;
  opacity: 1;
  font: normal normal 600 20px/30px Poppins;
  padding: 18px 150px 20px 150px;
}
.margin-top{
  margin-top: 202px;
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