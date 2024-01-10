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
    showDropdownLinks() {
      this.dropdownLinks = this.dropdownLinks === false;
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
      <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-center upper-icons text-center">
          <p class="text-center">Api Toevoegen</p>
        </div>
      </div>
      <p class="margin-left title">Api's</p>
      <div class="d-flex justify-content-center dropdown text-center ">
        <div class="m-auto">
          <form class="container-dropdown" @submit.prevent="">
            <div class="container-dropdown margin-left">
              <button @click="showDropdownLinks"
                      :class="{'dropdown-button-style-open': dropdownLinks, 'dropdown-button-style-closed': !dropdownLinks, 'margin-bottom-dropdown': !dropdownLinks}"
                      type="button" aria-expanded="false">
                <div class="dropdown-flex">
                  <div class="circle-campaign"></div>
                  <div>Koppelingen</div>
                  <svg class="dropdown-margin ms-auto" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                </div>
              </button>
              <div v-if="dropdownLinks">
                <div class="detail-page">
                  <div id="collapse-example" class="flex-column d-flex collapse show"
                       aria-labelledby="heading-example">
                    <div class="d-flex flex-row">
                      <div class="campaign-name margin-top margin-date">
                        <div class="margin-date">
                          <label class="margin-text" for="startDate">Looptijd</label>
                          <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row">
                        <input class="input-campaign margin-top margin-date"
                               type="date">
                        <div class="d-flex campaign-name margin-top">
                          <input class="input-campaign"
                                 type="date">
                        </div>
                      </div>
                    </div>
                    <hr>
                  </div>
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
.max-width-router{
  width: 100%;
}
.campaign-name{
  text-align: left;
  font: normal normal 600 16px/27px Poppins;
  letter-spacing: 0;
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
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #D4D4D4;
  border-radius: 0 0 8px 8px;
  text-align: center;
  font: normal normal 600 32px/54px Baskerville;
  letter-spacing: -1.28px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.margin-name{
  margin-right: 198px;
}
.circle-campaign{
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 2px solid #222222;
  border-radius: 100%;
  opacity: 1;
  margin: 32px 0 32px 32px;
  width: 32px;
  height: 32px;
}
.dropdown-flex{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  gap: 16px;
}
.dropdown-margin{
  margin-right: 32px;
}
</style>