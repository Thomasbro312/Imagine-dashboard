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
  methods:{
    capsLockEvent(){
      if (event.getModifierState("CapsLock")) {
        this.capsLockOn = true;
      } else {
        this.capsLockOn = false;
      }
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
  <div class="container d-inline-flex justify-content-around">
    <div>
      <h3>Register form</h3>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">Email</label>
          <input class="form-control" type="email" id="email" v-model.trim="email">
        </div>
        <div class="mb-3">
          <label class="form-label" for="name">Name</label>
          <input class="form-control" type="text" id="name" v-model.trim="name">
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input  @keydown="capsLockEvent" class="form-control" type="password" id="password" v-model.trim="password">
          <p v-if="capsLockOn">Caps Lock is on.</p>
        </div>
        <div class="mb-3">
          <label class="form-label" for="phoneNumber">Phone Number</label>
          <input class="form-control" type="tel" id="phoneNumber" v-model.trim="phoneNumber">
        </div>
        <div class="mb-3">
          <label class="form-label" for="companyName">Company Name</label>
          <input class="form-control" type="text" id="companyName" v-model.trim="companyName">
        </div>
        <base-button class="btn-outline-dark">Submit</base-button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>