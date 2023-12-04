<script>
import DeleteModal from "@/components/ui/DeleteModal.vue";
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar, DeleteModal},
  data() {
    return {
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
    // This gets the specified campaign from the api and puts it inside the form fields
    async fetchResource(id) {
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/campaign/${id}`,{
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
        this.$store.dispatch('editCampaign',{
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
      } catch (err){
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
  <nav-bar></nav-bar>
  <div>
    <div>
      <h1>Edit Resource</h1>
      <form @submit.prevent="editResource(this.$route.params.id)">
        <div class="mb-3">
          <label class="form-label" for="campaignName">Campaign Name</label>
          <input type="text" class="form-control" id="campaignName" v-model="editedResource.campaign.campaign_name">
        </div>
        <div class="mb-3">
          <label class="form-label" for="clientId">Client Id</label>
          <select id="client_id" class="form-control" v-model.trim="editedResource.campaign.client_id">
            <option disabled value="">Select an option</option>
            <option v-for="item in apiDataUsers" :value="item.user_id">{{ item.user_name }}, {{ item.company_name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label" for="startDate">Start Date</label>
          <input class="form-control" v-model="editedResource.campaign.start_date" id="startDate" type="date">
        </div>
        <div class="mb-3">
          <label class="form-label" for="endDate">End Date</label>
          <input class="form-control" v-model="editedResource.campaign.end_date" id="endDate" type="date">
        </div>
        <div class="mb-3">
          <label class="form-label" for="campaignPhase">Campaign Phase</label>
          <select class="form-control" v-model="editedResource.campaign.campaign_phase" id="campaignPhase">
            <option disabled value="">Select an option</option>
            <option v-for="phase in apiDataPhase" :value="phase.id">{{ phase.phase_name }}</option>
          </select>
        </div>
        <base-button class='margin-button btn-outline-dark' type="submit">Update</base-button>
        <delete-modal></delete-modal>
      </form>
    </div>
  </div>
</template>

<style scoped>
.margin-button{
  margin-right: 5px;
}
</style>