<script>
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar},
  data(){
    return{
      campaign_name: '',
      client_id: null,
      start_date: null,
      end_date : null,
      formIsValid: true,
      apiData: []
    }
  },
  methods:{
    // this creates a new campaign
    async submitForm(){
      this.formIsValid = true;
      if (this.campaign_name === '' || this.client_id === '' || this.start_date === '' || this.end_date === ''){
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch('campaignCreate', {
          campaign_name: this.campaign_name,
          client_id: this.client_id,
          start_date: this.start_date,
          end_date: this.end_date
        })
        this.$router.replace('/auth/admin')
      }catch (err){
        console.log(err)
      }
    },
    //this gets the user and company data for selecting client's
    async userInfo(){
      const apiKey = 'Help';

      const response = await fetch('http://localhost:8000/api/users',{
        method: 'GET',
        headers: {
          'API-Key': apiKey,
        },
      })
      this.apiData = await response.json();
    },
  },
  beforeMount() {
    this.userInfo();
  }
}
</script>

<template>
  <nav-bar></nav-bar>
  <div>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label" for="campaign_name">The campaign's name</label>
        <input class="form-control" type="text" id="campaign_name" v-model.trim="campaign_name">
      </div>
      <div class="mb-3">
        <label class="form-label" for="client_id">The client their id.</label>
        <select class="form-control" id="client_id" v-model.trim="client_id">
          <option disabled value="">Please select one</option>
          <option v-for="item in apiData" :value="item.user_id">{{item.company_name}}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label" for="start_date">Start Date</label>
        <input class="form-control" type="date" id="start_date" v-model.trim="start_date">
      </div>
      <div class="mb-3">
        <label class="form-label" for="end_date">End Date</label>
        <input class="form-control" type="date" id="end_date" v-model.trim="end_date">
      </div>
      <base-button type="submit">Submit</base-button>
    </form>
  </div>
</template>

<style scoped>

</style>