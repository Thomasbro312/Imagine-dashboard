<script>
import NavBar from "@/components/ui/TheNavBar.vue";
import DeleteModal from "@/components/ui/DeleteModal.vue";

export default {
  components: {DeleteModal, NavBar},
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
    // The show Dropdown methods set it to false or true. So that the dropdown shows/hides
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
  // This Mounts the api call
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
      <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-center upper-icons text-center upper-main-flex">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active upper-flex font-upper"><div class="circle-upper">1</div>Campagne</li>
              <li class="breadcrumb-item upper-flex font-upper-active"><div class="circle-upper-active">2</div>API's</li>
              <li class="breadcrumb-item upper-flex font-upper-active"><div class="circle-upper-active">3</div>Team</li>
            </ol>
          </nav>
        </div>
      </div>
      <p class="margin-left title">Campagne Aanmaken</p>
      <div class="text-center">
        <div class="m-auto">
          <form @submit.prevent="submitForm">
            <div class="margin-left">
              <div>
                <button @click="showDropdown" :class="{'dropdown-button-style-open': dropdown1, 'dropdown-button-style-closed': !dropdown1, 'margin-bottom-dropdown': !dropdown1}" type="button" aria-expanded="false">
                  <div class="dropdown-flex">
                    <div class="circle-campaign"></div>
                    <div>Details</div>
                    <svg class="ms-auto dropdown-margin" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div class="dropdown-content" :class="{'margin-bottom-dropdown': dropdown1}" v-if="dropdown1">
                  <div class="detail-page">
                    <div class="d-flex campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-name">Campagne Naam</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <input class="input-campaign" type="text" id="campaign_name" v-model.trim="campaign_name">
                    </div>
                    <hr>
                    <div class="margin-bottom d-flex campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-client">Klant</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <select class="input-campaign" id="client_id" v-model.trim="client_id">
                        <option disabled value="">Kies een klant</option>
                        <option v-for="item in apiData" :value="item.user_id">{{item.company_name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button @click="showDropdownDate" class="" :class="{'dropdown-button-style-open': dropdownDate, 'dropdown-button-style-closed': !dropdownDate}" type="button" aria-expanded="false">
                  <div class="dropdown-flex mb-10">
                    <div class="circle-campaign"></div>
                    <div>Planning</div>
                    <svg class="ms-auto dropdown-margin" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div v-if="dropdownDate" :class="{'margin-bottom-dropdown': dropdownDate}" class="dropdown-content">
                  <div class="detail-page">
                    <div id="collapse-example" class="gap-date d-flex collapse show" aria-labelledby="heading-example">
                      <div class="d-flex flex-row">
                        <div class="campaign-name margin-top margin-date">
                          <div class="margin-date">
                            <label class="margin-text margin-date" for="start_date">Looptijd</label>
                            <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row">
                          <input class="input-campaign margin-top margin-date" placeholder="Begindatum" type="date" id="start_date" v-model.trim="start_date">
                          <div class="margin-bottom d-flex justify-content-center campaign-name margin-top">
                            <input class="input-campaign" type="date" placeholder="Einddatum" id="end_date" v-model.trim="end_date">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer class="footer-buttons-area">
              <base-button class='footer-button' type="submit">Volgende</base-button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upper-main-flex{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}
.upper-flex{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
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
.margin-left{
  margin-left: 64px;
}
.margin-name{
  margin-right: 198px;
}
.dropdown-margin{
  margin-right: 32px;
}
.mb-10{
  margin-bottom: 100px;
}
.font-upper{
  font: normal normal normal 16px/20px Poppins;
  letter-spacing: 0;
  color: #231F20;
  opacity: 1;
}
.font-upper-active{
  font: normal normal normal 16px/20px Poppins;
  letter-spacing: 0;
  color: #D4D4D4;
  opacity: 1;
}
.circle-upper{
  width: 38px;
  height: 38px;
  margin-right: 8px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 2px solid #222222;
  opacity: 1;
  border-radius: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}
.circle-upper-active{
  width: 38px;
  height: 38px;
  margin-right: 8px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 2px solid #D4D4D4;
  opacity: 1;
  border-radius: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
}
</style>