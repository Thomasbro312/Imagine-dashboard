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
  <div class="container">
    <div class="row">
      <div class="col-6 m-auto">
        <div class="container-login">
          <form @submit.prevent="submitForm">
            <div class="d-flex flex-column">
              <label class="font-poppins margin-bottom-form" for="campaign_name">The campaign's name</label>
              <input class="input-main" type="text" id="campaign_name" v-model.trim="campaign_name">
            </div>
            <div class="d-flex flex-column">
              <label class="font-poppins" for="client_id">The client their id.</label>
              <select class="input-main" id="client_id" v-model.trim="client_id">
                <option disabled value="">Please select one</option>
                <option v-for="item in apiData" :value="item.user_id">{{item.company_name}}</option>
              </select>
            </div>
            <div class="card">
              <h5 class="card-header">
                <a data-toggle="collapse" href="#collapse-example" aria-expanded="true" aria-controls="collapse-example" id="heading-example" class="d-block">
                  <i class="fa fa-chevron-down pull-right"></i>
                  Collapsible Group Item #1
                </a>
              </h5>
              <div id="collapse-example" class="collapse show" aria-labelledby="heading-example">
                <div class="d-flex flex-column">
                  <label class="font-poppins" for="start_date">Start Date</label>
                  <input class="input-main" type="date" id="start_date" v-model.trim="start_date">
                </div>
                <div class="d-flex flex-column">
                  <label class="font-poppins" for="end_date">End Date</label>
                  <input class="input-main" type="date" id="end_date" v-model.trim="end_date">
                </div>
              </div>
            </div>
            <base-button class="btn-main text-white mt-4" type="submit">Submit</base-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>