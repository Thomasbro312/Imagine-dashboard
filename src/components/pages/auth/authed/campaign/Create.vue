<script>
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar},
  data(){
    return{
      dropdown1: true,
      dropdownDate: false,
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
      this.dropdown1 = this.dropdown1 === false;
    },
    showDropdownDate(){
      this.dropdownDate = this.dropdownDate === false;
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
    <div class="max-width-router ">
      <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-center upper-icons text-center">
          <p class="text-center ">Campagne Aanmaken</p>
        </div>
      </div>
      <div class="dropdown text-center">
        <div class="m-auto">
          <p class="margin-left title">Campagne Aanmaken</p>
          <form class="container-dropdown" @submit.prevent="submitForm">
            <div class="container-dropdown margin-left">
              <div>
                <button @click="showDropdown" class="dropdown-toggle margin-bottom-dropdown" :class="{'dropdown-button-style-open': dropdown1, 'dropdown-button-style-closed': !dropdown1}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Details
                </button>
                <div class="" v-if="dropdown1">
                  <div class="detail-page">
                    <div class="d-flex float campaign-name margin-top">
                      <label class="margin-text margin-name">Campagne Naam</label>
                      <input class="input-campaign" type="text" id="campaign_name" v-model.trim="campaign_name">
                    </div>
                    <div class="margin-bottom float d-flex campaign-name margin-top">
                      <label class="margin-text margin-client">Klant</label>
                      <select class="input-campaign" id="client_id" v-model.trim="client_id">
                        <option disabled value="">Kies een klant</option>
                        <option v-for="item in apiData" :value="item.user_id">{{item.company_name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button @click="showDropdownDate" class="dropdown-toggle" :class="{'dropdown-button-style-open': dropdownDate, 'dropdown-button-style-closed': !dropdownDate}" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Planning
                </button>
                <div v-if="dropdownDate">
                  <div class="detail-page">
                    <div id="collapse-example" class="gap-date d-flex collapse show" aria-labelledby="heading-example">
                      <div class="campaign-name margin-top">
                        <label class="margin-text margin-date" for="start_date">Looptijd</label>
                        <input class="input-campaign" placeholder="Begindatum" type="date" id="start_date" v-model.trim="start_date">
                      </div>
                      <div class="margin-bottom d-flex justify-content-center campaign-name margin-top">
                        <input class="input-campaign" type="date" placeholder="Einddatum" id="end_date" v-model.trim="end_date">
                      </div>
                    </div>
                  </div>
                  <base-button class="btn-main text-white mt-4" type="submit">Submit</base-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-button-style-open{
  background: #F7F7F7 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 8px 8px 0px 0px;
  opacity: 1;
  width: 1032px;
  height: 96px;
  font: normal normal 600 26px/54px Baskerville;
  letter-spacing: -1.04px;
  color: #222222;
  text-transform: capitalize;
}
.dropdown-button-style-closed{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  width: 1032px;
  height: 96px;
  font: normal normal 600 26px/54px Baskerville;
  letter-spacing: -1.04px;
  color: #222222;
  text-transform: capitalize;
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
.float label{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;
}
.margin-text{
  margin-left: 32px;
}
.margin-top{
  margin-top: 40px;
}
.margin-bottom{
  margin-bottom: 40px;
}
.input-campaign{
  background: #F7F7F7 0% 0% no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
  width: 263px;
  height: 60px;
}
.gap-date{
  gap: 32px;
  margin: auto;
}
.title{
  text-align: left;
  font: normal normal 600 42px/54px Baskerville;
  letter-spacing: -1.68px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.container-dropdown{
  width: 1032px;
}
.margin-left{
  margin-left: 64px;
}
.upper-icons{
  width: 548px;
  height: 89px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #D4D4D4;
  border-radius: 0px 0px 8px 8px;
  text-align: center;
  font: normal normal 600 32px/54px Baskerville;
  letter-spacing: -1.28px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.detail-page{
  width: 1032px;
  height: 504px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 0px 0px 8px 8px;
  opacity: 1;
}
.margin-name{
  margin-right: 198px;
}
.margin-client{
  margin-right: 301px;
}
.margin-date{
  margin-right: 279px;
}
.margin-bottom-dropdown{
  margin-bottom: 32px;
}
</style>