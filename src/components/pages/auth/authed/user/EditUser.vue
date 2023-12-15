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
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`,{
          method: 'GET'
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
      try {
        this.$store.dispatch('editUser',{
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
  <div class="container">
    <div class="row">
      <div class="col-6 m-auto">
        <div class="container-login">
          <div>
            <div>
              <h1 class="font-baskerville mb-3">Edit User</h1>
              <form @submit.prevent="editResource(this.$route.params.id)">
                <div class="d-flex flex-column mb-3">
                  <label for="userName" class="font-poppins">First and Last name</label>
                  <input type="text" class="input-main" id="userName" v-model="editedResource.users.user_name">
                </div>
                <div class="d-flex flex-column mb-3">
                  <label for="email" class="font-poppins">Email</label>
                  <input type="email" class="input-main" id="email" v-model="editedResource.users.email">
                </div>
                <div class="d-flex flex-column mb-3">
                  <label for="phoneNumber" class="font-poppins">Phone Number</label>
                  <input type="tel" class="input-main" id="phoneNumber" v-model="editedResource.users.phone_number">
                </div>
                <div class="d-flex flex-column mb-3">
                  <label for="companyName" class="font-poppins">Company Name</label>
                  <input type="text" class="input-main" id="companyName" v-model="editedResource.users.company_name">
                </div>
                <base-button class='btn-main text-white' type="submit">Update</base-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>