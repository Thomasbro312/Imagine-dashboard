<script>
import DeleteModal from "@/components/ui/DeleteModal.vue";
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar, DeleteModal},
  data() {
    return {
      dropdown1: true,
      dropdownDate: false,
      dropdownLinks: false,
      dropdownAccess: false,
      editedResource: {
        campaign: {
          id: null,
          campaign_id: null,
          campaign_name: null,
          client_id: null,
          start_date: null,
          end_date: null,
          campaign_phase: null,
        },
      },
      apiDataUsers: [],
      apiDataPhase: []
    }
  },
  beforeMount() {
    this.userInfo();
    this.phaseInfo();
  },
  created() {
    this.fetchResource(this.$route.params.id)
  },
  methods: {
    // The show Dropdown methods set it to false or true. So that the dropdown shows/hides
    showDropdown() {
      this.dropdown1 = this.dropdown1 === false;
    },
    showDropdownDate() {
      this.dropdownDate = this.dropdownDate === false;
    },
    showDropdownLinks() {
      this.dropdownLinks = this.dropdownLinks === false;
    },
    showDropdownAccess() {
      this.dropdownAccess = this.dropdownAccess === false;
    },
    // This gets the specified campaign from the api and puts it inside the form fields
    async fetchResource(id) {
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/campaign/${id}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })
        let data = await response.json()
        this.editedResource.campaign.campaign_name = data[0].campaign_name
        this.editedResource.campaign.campaign_id = data[0].campaign_id
        this.editedResource.campaign.client_id = data[0].client_id
        this.editedResource.campaign.start_date = data[0].start_date
        this.editedResource.campaign.end_date = data[0].end_date
        this.editedResource.campaign.campaign_phase = data[0].campaign_phase
      } catch (error) {
        console.error('Error fetching resource data:', error);
      }
    },
    // This pushes the changes to the api that pushes it to the database
    editResource() {
      const apiKey = 'Help';
      try {
        this.$store.dispatch('editCampaign', {
          headers: {
            'API-Key': apiKey,
          },
          id: this.$route.params.id,
          campaign_name: this.editedResource.campaign.campaign_name,
          client_id: this.editedResource.campaign.client_id,
          start_date: this.editedResource.campaign.start_date,
          end_date: this.editedResource.campaign.end_date,
          campaign_phase: this.editedResource.campaign.campaign_phase
        })
        this.$router.replace('/auth/admin');
      } catch (err) {
        this.error = err.message || 'Failed to edit'
      }
    },
    //this gets the user and company data for selecting client's
    async userInfo() {
      const apiKey = 'Help';
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          'API-Key': apiKey,
        },
      })
      this.apiDataUsers = await response.json();
    },
    // this gets the phases to the corresponding id's
    async phaseInfo() {
      const apiKey = 'Help';
      const response = await fetch('http://localhost:8000/api/phase', {
        method: 'GET',
        headers: {
          'API-Key': apiKey,
        },
      })
      this.apiDataPhase = await response.json();
    },
  },
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
      </div>
      <p class="margin-left title">Campagne Aanpassen</p>
      <div class="dropdown m-auto text-center d-flex justify-content-center">
        <div class="">
          <form class="" @submit.prevent="editResource(this.$route.params.id)">
            <div class="margin-left">
              <div class="">
                <button @click="showDropdown"
                        :class="{'dropdown-button-style-open': dropdown1, 'dropdown-button-style-closed': !dropdown1, 'margin-bottom-dropdown': !dropdown1}"
                        type="button" aria-expanded="false">
                  <div class="dropdown-flex">
                    <div class="circle-campaign"></div>
                    <div>Details</div>
                    <svg class="dropdown-margin ms-auto" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div class="dropdown-content" :class="{'margin-bottom-dropdown': dropdown1}" v-if="dropdown1">
                  <div class="detail-page">
                    <div class="d-flex campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-name" for="campaignName">Campagne Naam</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <input type="text" class="input-campaign" id="campaignName"
                             v-model="editedResource.campaign.campaign_name">
                    </div>
                    <hr>
                    <div class="d-flex campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-name" for="campaignName">Campagne ID</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <input type="text" class="input-campaign" disabled id="campaignName"
                             v-model="editedResource.campaign.campaign_id">
                    </div>
                    <hr>
                    <div class="margin-bottom d-flex campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-client" for="clientId">Klant</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <select id="client_id" class="input-campaign" v-model.trim="editedResource.campaign.client_id">
                        <option disabled value="">Select an option</option>
                        <option v-for="item in apiDataUsers" :value="item.user_id">{{ item.user_name }},
                          {{ item.company_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <button @click="showDropdownDate"
                        :class="{'dropdown-button-style-open': dropdownDate, 'dropdown-button-style-closed': !dropdownDate, 'margin-bottom-dropdown': !dropdownDate}"
                        type="button" aria-expanded="false">
                  <div class="dropdown-flex">
                    <div class="circle-campaign"></div>
                    <div>Planning</div>
                    <svg class="dropdown-margin ms-auto" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div v-if="dropdownDate" :class="{'margin-bottom-dropdown': dropdownDate}" class="dropdown-content">
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
                          <input class="input-campaign margin-top margin-date" v-model="editedResource.campaign.start_date" id="startDate"
                                 type="date">
                          <div class="d-flex campaign-name margin-top">
                            <input class="input-campaign" v-model="editedResource.campaign.end_date" id="endDate"
                                   type="date">
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="d-flex campaign-name margin-phase flex-row">
                        <div class="margin-date">
                          <label class="margin-text phase-margin" for="campaignPhase">Campagne Fase</label>
                          <p class="description-text margin-text margin-date">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                        </div>
                        <select class="input-campaign" v-model="editedResource.campaign.campaign_phase"
                                id="campaignPhase">
                          <option disabled value="">Selecteer een Optie</option>
                          <option v-for="phase in apiDataPhase" :value="phase.id">{{ phase.phase_name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button @click="showDropdownLinks"
                        :class="{'dropdown-button-style-open': dropdownLinks, 'dropdown-button-style-closed': !dropdownLinks, 'margin-bottom-dropdown': !dropdownLinks}"
                        type="button" aria-expanded="false">
                  <div class="dropdown-flex">
                    <div class="circle-campaign"></div>
                    <div>Koppelingen</div>
                    <svg class="dropdown-margin ms-auto" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div v-if="dropdownLinks" :class="{'margin-bottom-dropdown': dropdownLinks}" class="dropdown-content">
                  <div class="detail-page">
                    <div id="collapse-example" class="flex-column d-flex collapse show"
                         aria-labelledby="heading-example">
                      <div class="d-flex flex-row">
                        <div class="campaign-name margin-top margin-date">
                          <div class="margin-date">
                            <label class="margin-text" for="startDate">API's Koppelen</label>
                            <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                            <button class="margin-text link-button">Nieuwe toevoegen</button>
                          </div>
                        </div>
                        <div class="d-flex flex-row">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button @click="showDropdownAccess"
                        :class="{'dropdown-button-style-open': dropdownAccess, 'dropdown-button-style-closed': !dropdownAccess}"
                        type="button" aria-expanded="false">
                  <div class="dropdown-flex mb-10">
                    <div class="circle-campaign"></div>
                    <div>Toegang</div>
                    <svg class="dropdown-margin ms-auto" height="25" viewBox="0 0 1792 1792" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                  </div>
                </button>
                <div v-if="dropdownAccess" :class="{'margin-bottom-dropdown': dropdownAccess}" class="dropdown-content">
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
            </div>
            <footer class="footer-buttons-area">
              <delete-modal></delete-modal>
              <base-button class='footer-button' type="submit">Volgende</base-button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.margin-text {
  margin-left: 32px;
}
.margin-top {
  margin-top: 40px;
}
.margin-bottom {
  margin-bottom: 40px;
}
.margin-left {
  margin-left: 64px;
}
.margin-name{
  margin-right: 198px;
}
.margin-bottom-dropdown {
  margin-bottom: 32px;
}
.margin-phase{
  margin: 32px 0 32px 0;
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
.footer-button-flex{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: stretch;
}
</style>