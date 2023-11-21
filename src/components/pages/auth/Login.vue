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

<template>
  <div class="d-flex justify-content-around mb-3">
    <div class="">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="login">Email</label>
          <input class="form-control mb-3"  type="email" v-model.trim="email" id="email" placeholder="Email@email.com" />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input @keydown="capsLockEvent" class="form-control mb-3" v-model.trim="password" placeholder="Password" id="password" type="password" />
          <p v-if="capsLockOn">Caps Lock is on.</p>
        </div>
        <base-button class="btn-outline-dark">Login</base-button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>