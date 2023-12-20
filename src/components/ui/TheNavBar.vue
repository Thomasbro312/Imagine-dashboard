<script>
import store from "@/store";
export default {
  data(){
    return{
      idProfile: store.getters.userId,
      dynamicHeight: window.innerHeight
    }
  },
  mounted() {
    // Add an event listener for the resize event to update the dynamicHeight
    window.addEventListener('resize', this.updateDynamicHeight);
    this.updateDynamicHeight(); // Initial call to set the correct height
  },
  methods: {
    //this logs you out
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    updateDynamicHeight() {
      // Update dynamicHeight whenever the window is resized
      this.dynamicHeight = window.innerHeight;
    },
    beforeDestroy() {
      // Remove the event listener when the component is destroyed
      window.removeEventListener('resize', this.updateDynamicHeight);
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
  <div class="min-height-navbar">
    <div v-if="isLoggedIn" class="bg-navbar navbar-layout">
      <div class="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white">
        <img src="../../../public/img/logo_ungrouped_wit.svg" width="150" class="svg" alt="">
        <ul class="margin-top nav flex-column navbar-layout nav-bar-font mb-sm-auto" id="menu">
          <li class="navbar-router margin-dashboard text-left text-white text-decoration-none">
            <router-link to="/auth/index" class="text-decoration-none text-white"><span class="margin-navigation">Dashboard</span></router-link>
          </li>
          <li class="navbar-router margin-dashboard text-left">
            <router-link to="/auth/admin" class="text-white text-decoration-none"><i class=""></i><span class="margin-navigation">Admin</span></router-link>
          </li>
          <li class="navbar-router margin-dashboard text-left">
            <router-link to="/auth/index" class="text-white text-decoration-none"><span class="margin-navigation">Campagne</span></router-link>
          </li>
          <li class="navbar-router margin-dashboard text-left">
            <router-link to="/auth/index" class="text-white text-decoration-none"><span class="margin-navigation">Rapporten</span></router-link>
          </li>
        </ul>
        <hr>
        <div class="dropdown pb-4">
          <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="30" height="30" class="rounded-circle">
            <span class="d-none d-sm-inline mx-1">PlaceHolder</span>
          </a>
          <ul class="dropdown-menu bg-navbar-dropdown text-small shadow">
            <li><a class="dropdown-item text-white" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><base-button class="dropdown-item container-dropdown-font" @click="logout" href="#">Uitloggen</base-button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.bg-navbar{
  background: #222222;
}
.background-main{
  background-color: #F7F7F7;
}
.svg{
  margin-top: 40px;
  align-self: center;
}
.bg-navbar{
  background: #222222;
}
.bg-navbar-dropdown{
  background: #FFFFFF;
}
.nav-bar-font{
  text-align: left;
  font: normal normal 600 24px/54px Baskerville;
  letter-spacing: -0.96px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.nav-bar-active{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  color: white;
  opacity: 1;
}
.navbar-layout{
  width: 280px
}
.navbar-router{
  height: 54px;
}
.margin-top{
  margin-top: 84px;
}
.container-dropdown-font{
  margin: 0;
  font: normal normal normal 16px/79px Poppins;
  letter-spacing: 0px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.margin-dashboard{
  margin: 10px 0 10px 0px;
}
.margin-navigation{
  margin-left: 18px;
}
.min-height-navbar{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.min-height-navbar > * {
  flex-grow: 1;
}
</style>