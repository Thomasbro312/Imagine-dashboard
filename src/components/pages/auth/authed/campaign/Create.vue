<script>
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar},
  data(){
    return{
      dropdowm1: true,
      campaign_name: '',
      client_id: null,
      start_date: null,
      end_date : null,
      formIsValid: true,
      apiData: []
    }
  },
  methods:{
    showDropdown(){
      if (this.dropdowm1 === false){
        this.dropdowm1 = true
      }else {
        this.dropdowm1 = false
      }
    },
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
  <div class="navbar-router">
    <div class="row">
      <nav-bar></nav-bar>
    </div>
    <div class="max-width-router">
      <div class="dropdown text-center">
        <div class="m-auto">
          <div class="d-flex justify-content-center">
            <div>
              <button @click="showDropdown" class=" dropdown-button-style dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>

              <div class="d-flex background-dropdown" v-if="dropdowm1">
                <form @submit.prevent="submitForm">
                  <div class="campaign-name">
                    <label class="margin-bottom-form" for="campaign_name">Campagne naam</label>
                    <input class="input-main" type="text" id="campaign_name" v-model.trim="campaign_name">
                  </div>
                  <div class="campaign-name">
                    <label class="" for="client_id">Klant</label>
                    <select class="input-main" id="client_id" v-model.trim="client_id">
                      <option disabled value="">Kies een klant</option>
                      <option v-for="item in apiData" :value="item.user_id">{{item.company_name}}</option>
                    </select>
                  </div>
                  <div class="">
                    <div id="collapse-example" class="collapse show" aria-labelledby="heading-example">
                      <div class="d-flex flex-column">
                        <label class="font-poppins" for="start_date">Start</label>
                        <input class="input-main" type="date" id="start_date" v-model.trim="start_date">
                      </div>
                      <div class="d-flex flex-column">
                        <label class="font-poppins" for="end_date">Eind</label>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-button-style{
  background: #F7F7F7 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 8px 8px 0px 0px;
  opacity: 1;
  width: 1032px;
  height: 96px;
}
.background-dropdown{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 0px 0px 8px 8px;
  opacity: 1;
  height: 504px;
  width: 1032px;
}
.max-width-router{
  width: 100%;
}
.campaign-name{
  text-align: left;
  font: normal normal 600 16px/27px Poppins;
  letter-spacing: 0px;
  color: #231F20;
  opacity: 1;
}
</style>