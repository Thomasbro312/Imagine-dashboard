<script>

</script>

<template>
<!--  <nav-bar class="navbar-height"></nav-bar>-->
  <div class="container">
    <router-view v-slot='slotProps'>
      <component :is='slotProps.Component'></component>
    </router-view>
  </div>
</template>

<style scoped>

</style>
