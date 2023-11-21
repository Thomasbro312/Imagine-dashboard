<script>
export default {
  props:{
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to:{
      type: String,
      required: false,
      default: '/'
    }
  }
};
</script>

<template>
  <button class="btn btn-outline-light" v-if='!link'>
    <slot></slot>
  </button>
  <router-link  class="btn btn-outline-dark" v-else :to='to' :class='mode'>
    <slot></slot>
  </router-link>
</template>

<style scoped>

</style>