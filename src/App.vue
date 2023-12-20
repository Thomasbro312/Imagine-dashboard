<script>
import store from "@/store";
import login from "@/components/pages/auth/Login.vue";

export default {
  methods: {
    //this logs you out
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  computed:{
    isLoggedIn() {
      this.$router.push('/auth/index')
      return store.getters.isAuthenticated;
    },
    isAdmin() {
      return store.getters.role.role === '2'; // Replace 'admin' with the correct role
    },
  },
  mounted() {
    console.log(store.getters.isAuthenticated)
    if (store.getters.isAuthenticated){
      this.$router.push('/auth/index')
    }
  }
}
</script>

<template>
      <div>
        <router-view v-slot='slotProps'>
          <component :is='slotProps.Component'></component>
        </router-view>
      </div>
</template>

<style scoped>
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
.max-width{
  max-width: 100%;
  margin: 0 auto; /* Center the content horizontally */
  box-sizing: border-box; /* Include padding and border in the total width */
}
.max-width-router{
  max-width: 80%;
}
</style>
