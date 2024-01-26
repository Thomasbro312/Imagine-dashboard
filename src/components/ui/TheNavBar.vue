<script>
import store from "@/store";
export default {
  props: {
    clickDashboard:{
      type: Boolean,
      required: false,
      default: false
    },
    clickCampaign: {
      type: Boolean,
      required: false,
      default: false
    },
    click: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data(){
    return{
      welcomeMessage: "",
      apiData: [],
      apiDataUsers: [],
      hoverDashboard: false,
      hoverCampaign: false,
      hover: false,
      userId: this.$store.getters.user_id.userId,
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
    },
    async getClientName(clientId) {
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/users/${clientId}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data[0].user_name;

        } else {
          console.error('Failed to fetch client name');
          return 'Client Name Not Found';
        }
      } catch (err) {
        console.error(err);
        return 'Client Name Not Found';
      }
    },
    async getApiDataUsers() {
      const userId = this.userId
      console.log(userId)
      this.isLoading = true;
      try {
        const apiKey = 'Help';
        const response = await fetch(`http://localhost:8000/api/user-campaign/${userId}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })
        this.apiDataUsers = await response.json();
        console.log(this.apiDataUsers)
      } catch (err){
        console.error(err);
        return 'Phase Name Not Found'; // Provide a default value in case of an error
      }

      this.isLoading = false;
    },
    async getApiData() {
      if(this.id){
        const apiKey = 'Help';
        try {
          const response = await fetch(`http://localhost:8000/api/campaign/${this.$route.params.id}`, {
            method: 'GET',
            headers: {
              'API-Key': apiKey,
            },
          });
          if (response.ok) {
            this.apiData = await response.json()
          }
        } catch (error) {
          console.error(error);
          return 'Client Name Not Found';
        }
      }else{
        const apiKey = 'Help';
        try {
          const response = await fetch(`http://localhost:8000/api/campaign`, {
            method: 'GET',
            headers: {
              'API-Key': apiKey,
            },
          });
          if (response.ok) {
            this.apiData = await response.json()
          }
        } catch (error) {
          console.error(error);
          return 'Client Name Not Found';
        }
      }
    },
  },
  computed: {
    store() {
      return store
    },
    // this checks if you're an admin
    isAdmin() {
      return store.getters.role.role === '2';
    },
    // this checks if your logged in
    isLoggedIn() {
      return store.getters.isAuthenticated;
    },
    token() {
      return this.$store.state.token;
    }
  },
  async beforeMount() {
    await this.getApiData()
    await this.getApiDataUsers()
  },
  async created() {
    this.welcomeMessage = await this.getClientName(this.userId)
  }
}
</script>

<template>
  <div class="min-height-navbar">
    <div v-if="isLoggedIn" class="bg-navbar navbar-layout">
      <footer class="fixed-bottom bg-navbar navbar-layout min-height-navbar">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-2 text-white">
          <img src="/img/logo_ungrouped_wit.svg" class="svg" alt="">
          <ul class="margin-top nav flex-column navbar-layout nav-bar-font mb-sm-auto" id="menu">
            <li  v-on:mouseover="hoverDashboard = true" v-on:mouseout="hoverDashboard = false" class="navbar-router margin-dashboard text-left text-decoration-none" :class="{'nav-bar-active': hoverDashboard, 'text-black': hoverDashboard}">
              <router-link to="/auth/index" class="text-decoration-none text-white" :class="{'nav-bar-active': hoverDashboard || clickDashboard}">
                <div class="d-flex">
                  <img v-if="!hoverDashboard && !clickDashboard" class="icons-margin" src="/img/icons/Dashboard%20icon%20wit.svg" alt="">
                  <img v-if="hoverDashboard || clickDashboard" class="icons-margin" src="/img/icons/Dashboard%20icon%20zwart.svg" alt="">
                  <span class="margin-navigation">Dashboard</span>
                </div>
              </router-link>
            </li>
            <li  v-on:mouseover="hoverCampaign = true" v-on:mouseout="hoverCampaign = false"  :class="{'nav-bar-active': hoverCampaign}" class="navbar-router margin-dashboard text-left">
              <router-link to="/auth/index" class="text-white text-decoration-none" :class="{'nav-bar-active': hoverCampaign || clickCampaign}">
                <div class="d-flex">
                  <img v-if="!hoverCampaign && !clickCampaign" class="icons-margin" src="/img/icons/Campagne%20icon%20wit.svg" alt="">
                  <img v-if="hoverCampaign || clickCampaign" class="icons-margin" src="/img/icons/Campagne%20icon%20zwart.svg" alt="">
                  <span class="margin-navigation">Campagne</span>
                </div>
              </router-link>
            </li>
            <li v-on:mouseover="hover = true" v-on:mouseout="hover = false"  class="navbar-router margin-dashboard text-left " :class="{'nav-bar-active': hover}">
              <router-link to="/auth/index" class="text-white text-decoration-none " :class="{'nav-bar-active': hover || click}">
                <div class="d-flex">
                  <img v-if="!hover && !click" class="icons-margin" src="/img/icons/Rapportage%20icon%20wit.svg" alt="">
                  <img v-if="hover || click" class="icons-margin" src="/img/icons/Rapportage%20icon%20zwart.svg" alt="">
                  <span class="margin-navigation">Rapporten</span>
                </div>
              </router-link>
            </li>
            <li v-if="isAdmin" class="navbar-router margin-dashboard text-left">
              <router-link to="/auth/admin" class="text-white text-decoration-none"><span class="margin-navigation">Admin</span></router-link>
            </li>
          </ul>
          <hr>
          <div class="dropdown margin-auto dropdown-menu-style px-3 ">
            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="" width="30" height="30" class="rounded-circle">
              <span class="d-none d-sm-inline mx-1 text-white">{{this.welcomeMessage}}</span>
            </a>
            <ul class="dropdown-menu bg-navbar-dropdown text-small shadow container-dropdown-font">
              <li><router-link class="dropdown-item" to="/auth/users"><span class="m-0 w-auto">Profile</span></router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <base-button class="dropdown-item m-0" @click="logout">Uitloggen</base-button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.bg-navbar{
  background: #222222;
}
.icons-margin{
  margin-left: 23px;
  width: auto !important;
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
  background: #FFFFFF 0 0 no-repeat padding-box;
  color: #222222 !important;
  opacity: 1;
  width: 100%;
}
.nav-bar-active img :hover{
  width: 0;
}
.navbar-layout{
  width: 14vw
}
.navbar-router{
  height: 54px;
}
.margin-top{
  margin-top: 84px;
}
.container-dropdown-font{
  margin: 0;
  font: normal normal normal 16px/18px Poppins;
  letter-spacing: 0;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.margin-dashboard{
  margin: 10px 0 10px 0;
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
.dropdown-menu-style{
  position:absolute;
  bottom:0;
  margin-bottom: 20px;
}
</style>