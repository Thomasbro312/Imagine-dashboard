<script>
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar, TheRealTimeLine},
  data() {
    return {
      isLoading: true,
      apiData: [],
      ascending: true
    }
  },

  computed: {
    sortedArray() {
      return this.apiData.slice().sort((a, b) => {
        if (this.ascending) {
          return a.campaign_phase - b.campaign_phase;
        } else {
          return b.campaign_phase - a.campaign_phase;
        }
      })
    }
  },

  methods: {
    // This gets the all the campaigns form the api
    async getApiData() {
      const apiKey = 'Help';
      try {
        const response = await fetch('http://localhost:8000/api/campaign', {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })

        this.apiData = await response.json();}

      catch (error) {
        console.error(error);
        return 'Phase Name Not Found';
      }
      this.isLoading = false;


    },
    // this checks if the api data is empty for the empty state
    isDataEmpty(data) {
      return Object.keys(data).length === 0;
    },

    // This gets the phase that corresponds to the id that is given
    async getPhaseId(campaignPhase) {
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/phase/${campaignPhase}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data[0].phase_name;

        } else {
          console.error('Failed to fetch Phase name');
          return 'Phase Name Not Found';
        }
      } catch (error) {
        console.error(error);
        return 'Phase Name Not Found';
      }
    },

    // This gets the client name that corresponds to the client id
    async getClientName(clientId) {
      const apiKey = 'Help';
      try {
        const response = await fetch(`http://localhost:8000/api/users/${clientId}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data[0].user_name;

        } else {
          console.error('Failed to fetch client name');
          return 'Client Name Not Found';
        }
      } catch (error) {
        console.error(error);
        return 'Client Name Not Found';
      }
    },
    sortAscending() {
      this.ascending = true;
    },
    sortDescending() {
      this.ascending = false;
    },
  },
  async created() {
    // Fetch campaign data
    await this.getApiData();

    // Fetch and append client names to the campaigns
    for (const item of this.apiData) {
      item.client_name = await this.getClientName(item.client_id);
      item.phase = await this.getPhaseId(item.campaign_phase)
    }
  }
}
</script>

<template>
  <div class="navbar-router">
    <div class="row">
      <nav-bar></nav-bar>
    </div>
    <div class="max-width-router">  <div>
      <div>
        <div class="timelineStyle p-3 mb-3">
          <the-real-time-line/>
        </div>
        <div>
          <base-button class="mb-3" link :to="{name: 'create-campaign'}">Create Campaign</base-button>
        </div>
        <div class="">
          <button class="btn btn-outline-secondary me-2" @click="sortAscending">Sort Ascending</button>
          <button class="btn btn-outline-secondary" @click="sortDescending">Sort Descending</button>
        </div>
      </div>
      <div v-if="isDataEmpty(apiData)" class="text-center text-secondary mt-5">
        <div v-if="!isLoading">
          <p>There are not any Campaigns</p>
          <p>Please make one :)</p>
        </div>
      </div>
      <div class="text-center">
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-if="!isDataEmpty(apiData)" class="container d-flex">
        <div class="row justify-content-center">
          <div v-for="item in sortedArray" :key="item.id" class="col-lg-auto col-md-auto col-sm-8 pt-3 gap-5">
            <div class="card card-back-drop backgroundChart">
              <div class="card-body pb-0">
                <div class="pb-3 card-title-height">
                  <h3 class="card-title w-auto">{{ item.campaign_name }}</h3>
                </div>
                <hr>
                <h5>Campaign UID</h5>
                <p>{{ item.campaign_id }}</p>
                <h5>Client</h5>
                <p>{{ item.client_name }}</p>
                <h5>Campaign start</h5>
                <p>{{ item.start_date }}</p>
                <h5>Campaign end</h5>
                <p>{{ item.end_date }}</p>
                <h5>Total campaign duration</h5>
                <p>{{ item.diff_date }} Days</p>
                <h5>Campaign Phase</h5>
                <p>{{ item.phase }}</p>
              </div>
              <hr>
              <div class="mb-3 mx-3">
                <base-button class="card-button me-2" link :to="{ name:'edit-campaign', params: {id: item.id}}">Edit
                </base-button>
                <base-button class="card-button" link :to="{ name:'campaign-summary', params: {id: item.id}}">View Details
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.dimensions-card {
  background-color: #f8f8f8;
  height: 650px;
  width: 300px;
}
.card-title-height{
  height: 80px;
}
.card-back-drop{
  border: black;
  border-radius: 25px;
}
.timelineStyle{
  background-color: #ffffff;
  border-radius: 10px;
}
.backgroundChart{
  background: #FFFFFF 0 0 no-repeat padding-box;
  box-shadow: 0 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  max-width: 258px;
}
</style>