<script>
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar},
  data(){
    return{
      apiData: []
    }
  },
  methods:{
    async getApiData() {
      const apiKey = 'Help';
      const id = this.$store.getters.user_id.userId
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'GET',
        headers: {
          'API-Key': apiKey,
        },
      })
      this.apiData = await response.json()
    },
  },
  beforeMount() {
    this.getApiData();
  }
}
</script>

<template class="background-main">
  <div class="navbar-router">
    <div class="row">
      <nav-bar></nav-bar>
    </div>
    <div class="max-width-router backgroundChart mx-5 mt-5">
      <h4 class="mx-3">Name</h4>
      <p class="mx-3">{{ this.apiData[0].user_name }}</p>
      <h4 class="mx-3">Email</h4>
      <p class="mx-3">{{ this.apiData[0].email }}</p>
      <h4 class="mx-3">Phone Number</h4>
      <p class="mx-3">{{ this.apiData[0].phone_number }}</p>
      <h4 class="mx-3">Company Name</h4>
      <p class="mx-3">{{ this.apiData[0].company_name }}</p>
      <base-button class="footer-button mx-3" link :to="{ name: 'edit-user'}">Edit
      </base-button>
    </div>
  </div>
</template>

<style scoped>
.background-main{
  background-color: #F7F7F7;
}
.backgroundChart{
  background: #FFFFFF 0 0 no-repeat padding-box;
  box-shadow: 0 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  max-width: 258px;
  height: 360px;
}
</style>