<script>
import store from "@/store";

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
      return store.getters.role.role === '2';
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
        <router-view :key="$route.fullPath" v-slot='slotProps'>
          <component :is='slotProps.Component'></component>
        </router-view>
      </div>
</template>

<style scoped>
</style>
