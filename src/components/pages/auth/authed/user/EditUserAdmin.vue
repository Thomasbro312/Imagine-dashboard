<script>
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar},
  data() {
    return {
      editedResource: {
        users: {
          id: null,
          email: null,
          phone_number: null,
          company_name: null,
          user_name: null,
        },
      },
      apiDataUsers: [],
      apiDataPhase: []
    }
  },
  created() {
    this.fetchResource()
    this.$store.dispatch('fetchUserById')
  },
  computed: {
    apiData(){

    }
  },
  methods: {
    // This gets the specified campaign from the api and puts it inside the form fields
    async fetchResource() {
      const id = this.$store.getters.user_id.userId
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`,{
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })
        let data = await response.json()
        this.editedResource.users.user_name = data[0].user_name
        this.editedResource.users.email = data[0].email
        this.editedResource.users.phone_number = data[0].phone_number
        this.editedResource.users.company_name = data[0].company_name
      } catch (error) {
        console.error('Error fetching resource data:', error);
      }
    },
    // This pushes the changes to the api that pushes it to the database
    editResource() {
      const apiKey = 'Help';
      try {
        this.$store.dispatch('editUser',{
          headers: {
            'API-Key': apiKey,
          },
          user_name: this.editedResource.users.user_name,
          email: this.editedResource.users.email,
          phone_number: this.editedResource.users.phone_number,
          company_name: this.editedResource.users.company_name
        })
        this.$router.push('/auth/index')
      } catch (err) {
        console.error('Error editing User:', err);
      }
    },
  }
}
</script>

<template>
  <nav-bar></nav-bar>

  <div>
    <div>
      <h1 class="margin-left title">Edit User</h1>
      <form @submit.prevent="editResource(this.$route.params.id)">
        <div class="mb-3">
          <label for="userName" class="form-label">First and Last name</label>
          <input type="text" class="input-campaign" id="userName" v-model="editedResource.users.user_name">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="input-campaign" id="email" v-model="editedResource.users.email">
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input type="tel" class="input-campaign" id="phoneNumber" v-model="editedResource.users.phone_number">
        </div>
        <div class="mb-3">
          <label for="companyName" class="form-label">Company Name</label>
          <input type="text" class="input-campaign" id="companyName" v-model="editedResource.users.company_name">
        </div>
        <base-button class='margin-button btn-outline-dark' type="submit">Update</base-button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>