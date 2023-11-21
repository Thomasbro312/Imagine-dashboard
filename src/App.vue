<script>

</script>

<template>
  <nav-bar class="navbar-height"></nav-bar>
  <div class="container">
    <router-view v-slot='slotProps'>
      <component :is='slotProps.Component'></component>
    </router-view>
  </div>
</template>

<style scoped>
.navbar-height{
  height: 100%;
}
</style>
