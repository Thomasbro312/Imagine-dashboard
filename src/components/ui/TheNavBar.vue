<script>
import store from "@/store";
export default {
  data(){
    return{
      idProfile: store.getters.userId,
    }
  },
  methods: {
    //this logs you out
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  computed: {
    isAdmin() {
      return store.getters.role.role === '2'; // Replace 'admin' with the correct role
    },
    // this checks if your logged in
    isLoggedIn() {
      return store.getters.isAuthenticated;
    },
    token() {
      return this.$store.state.token;
    }
  }
}
</script>

<template>
  <div class="mb-3">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <div class="row">
          <div class="navbar-brand">
            <router-link v-if="!isLoggedIn" class="navbar-brand" :to="{name: 'home'}">Imagine Dashboard</router-link>
            <router-link v-if="isLoggedIn" class="navbar-brand" :to="{name: 'auth-index'}">Imagine Dashboard</router-link>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" v-if="isLoggedIn && isAdmin" link :to="{name: 'auth-admin-index'}">Admin</router-link>
            </li>
            <li class="nav-item"><router-link class="nav-link" v-if="isLoggedIn" :to="{name: 'profile'}">Profile</router-link></li>
            <li class="nav-item"><router-link v-if="!isLoggedIn" class="nav-link" link to="/login">Login</router-link></li>
            <li class="nav-item"><router-link v-if="!isLoggedIn" class="nav-link" link to="/register">Register</router-link></li>
          </ul>
          <div>
            <base-button v-if="isLoggedIn" @click="logout">Logout</base-button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>