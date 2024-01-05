<script>
import DeleteModal from "@/components/ui/DeleteModal.vue";
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar, DeleteModal},
  data() {
    return {
      dropdown1: true,
      dropdownDate: false,
      editedResource: {
        campaign: {
          id: null,
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
    showDropdown() {
      this.dropdown1 = this.dropdown1 === false;
    },
    showDropdownDate() {
      this.dropdownDate = this.dropdownDate === false;
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
          <p class="text-center">Campagne Aanpassen</p>
        </div>
      </div>
      <div class="dropdown m-auto text-center">
        <div class="">
          <p class="margin-left title">Campagne Aanpassen</p>
          <form class="container-dropdown" @submit.prevent="editResource(this.$route.params.id)">
            <div class="container-dropdown margin-left">
              <div>
                <button @click="showDropdown" class="dropdown-toggle"
                        :class="{'dropdown-button-style-open': dropdown1, 'dropdown-button-style-closed': !dropdown1, 'margin-bottom-dropdown': !dropdown1}"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Details
                </button>
                <div :class="{'margin-bottom-dropdown': dropdown1}" v-if="dropdown1">
                  <div class="detail-page">
                    <div class="d-flex float campaign-name margin-top">
                      <div>
                        <label class="margin-text margin-name" for="campaignName">Campagne Naam</label>
                        <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                      </div>
                      <input type="text" class="input-campaign" id="campaignName"
                             v-model="editedResource.campaign.campaign_name">
                    </div>
                    <hr>
                    <div class="margin-bottom float d-flex campaign-name margin-top">
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
                <button @click="showDropdownDate" class="dropdown-toggle"
                        :class="{'dropdown-button-style-open': dropdownDate, 'dropdown-button-style-closed': !dropdownDate}"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Planning
                </button>
                <div v-if="dropdownDate">
                  <div class="detail-page">
                    <div id="collapse-example" class="flex-column gap-date d-flex collapse show"
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
                          <div class="d-flex margin-bottom campaign-name margin-top">
                            <input class="input-campaign" v-model="editedResource.campaign.end_date" id="endDate"
                                   type="date">
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="d-flex campaign-name flex-row">
                        <div>
                          <label class="margin-text phase-margin" for="campaignPhase">Campagne Fase</label>
                          <p class="description-text margin-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin augue tortor ultrices.</p>
                        </div>
                        <select class="input-campaign" v-model="editedResource.campaign.campaign_phase"
                                id="campaignPhase">
                          <option disabled value="">Selecteer een Optie</option>
                          <option v-for="phase in apiDataPhase" :value="phase.id">{{ phase.phase_name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <base-button class='btn-main text-white mt-4' type="submit">Update</base-button>
                  <delete-modal></delete-modal>
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
.dropdown-button-style-open {
  background: #F7F7F7 0 0 no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 8px 8px 0 0;
  opacity: 1;
  width: 1032px;
  height: 96px;
  font: normal normal 600 26px/54px Baskerville;
  letter-spacing: -1.04px;
  color: #222222;
  text-transform: capitalize;
}
.dropdown-button-style-closed {
  background: #FFFFFF 0 0 no-repeat padding-box;
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
.max-width-router {
  width: 100%;
}
.campaign-name {
  text-align: left;
  font: normal normal 600 16px/27px Poppins;
  letter-spacing: 0;
  color: #231F20;
  opacity: 1;
}
.float label {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  align-content: stretch;
}
.margin-text {
  margin-left: 32px;
}
.margin-top {
  margin-top: 40px;
}
.margin-bottom {
  margin-bottom: 40px;
}
.input-campaign {
  background: #F7F7F7 0 0 no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 8px;
  opacity: 1;
  width: 263px;
  height: 60px;
}
.gap-date {
  gap: 32px;
  margin: auto;
}
.title {
  text-align: left;
  font: normal normal 600 42px/54px Baskerville;
  letter-spacing: -1.68px;
  color: #222222;
  text-transform: capitalize;
  opacity: 1;
}
.container-dropdown {
  width: 1032px;
}
.margin-left {
  margin-left: 64px;
}
.upper-icons {
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
.detail-page {
  width: 1032px;
  height: 504px;
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 2px solid #D4D4D4;
  border-radius: 0 0 8px 8px;
  opacity: 1;
}
.margin-name {
  margin-right: 198px;
}
.margin-client {
  margin-right: 301px;
}
.margin-date {
  margin-right: 32px;
}
.margin-bottom-dropdown {
  margin-bottom: 32px;
}
.phase-margin{
  margin-right: 217px;
}
.description-text{
  text-align: left;
  font: normal normal normal 14px/27px Poppins;
  letter-spacing: 0;
  color: #231F20;
  opacity: 1;
  width: 291px;
}
</style>