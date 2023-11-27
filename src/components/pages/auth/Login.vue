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
  methods: {
    capsLockEvent(){
      if (event.getModifierState("CapsLock")) {
        this.capsLockOn = true;
      } else {
        this.capsLockOn = false;
      }
  },

//this calls the action for logging in the auth/action.js
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

<template class="layout">
  <div class="">
    <div class="">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <div class="d-flex flex-column">
          <label class="font margin-bottom-form" for="login">Email*</label>
          <input class=input-main  type="email" v-model.trim="email" id="email"/>
        </div>
        <div class="d-flex flex-column">
          <label class="font margin-bottom-form margin-top-form" for="password">Password*</label>
          <input @keydown="capsLockEvent" class="input-main" v-model.trim="password"  id="password" type="password" />
          <p v-if="capsLockOn">Caps Lock is on.</p>
        </div>
        <base-button class="btn-main">Inloggen</base-button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btn-main{
  background: #222222 0% 0% no-repeat padding-box;
  border-radius: 32px;
  opacity: 1;
  padding: 18px 220px 18px 220px;
}
.input-main{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  height: 70px;
  width: 510px;
}
.font{
  text-align: left;
  font-family: Poppins,serif;
  letter-spacing: 0px;
  color: #222222;
  opacity: 1;
}
.margin-bottom-form{
  margin-bottom: 8px;
}
.margin-top-form{
  margin-top: 39px;
}


</style>