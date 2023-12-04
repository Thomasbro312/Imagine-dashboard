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

<template>
  <nav-bar></nav-bar>
  <div>
    <h4>Name</h4>
    <p>{{ this.apiData[0].user_name }}</p>
    <h4>Email</h4>
    <p>{{ this.apiData[0].email }}</p>
    <h4>Phone Number</h4>
    <p>{{ this.apiData[0].phone_number }}</p>
    <h4>Company Name</h4>
    <p>{{ this.apiData[0].company_name }}</p>
    <base-button class="card-button" link :to="{ name: 'edit-user'}">Edit
    </base-button>
  </div>
</template>

<style scoped>

</style>