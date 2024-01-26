<script>
import TheChart from "@/components/widgets/UniqueVistitorsChart.vue";
import NavBar from "@/components/ui/TheNavBar.vue";

export default {
  components: {NavBar, TheChart},
  data() {
    return {
      apiData: [],
      id: this.$store.getters.user_id.userId,
      welcomeMessage: '',
      isLoading: false,
      ascending: true
    }
  },
  computed: {
    //this sorts the array
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
  methods:{
    // This gets the all the campaigns form the api
    async getApiData() {
      const id = this.id
      console.log(id)
      this.isLoading = true;
      try {
        const apiKey = 'Help';
        const response = await fetch(`http://localhost:8000/api/user-campaign/${id}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })
        this.apiData = await response.json();
      } catch (err){
        console.error(err);
        return 'Phase Name Not Found'; // Provide a default value in case of an error
      }

      this.isLoading = false;
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
          return data[0].phase_name; // Assuming the API response contains the client name

        } else {
          console.error('Failed to fetch Phase name');
          return 'Phase Name Not Found'; // Provide a default value in case of failure
        }
      } catch (err) {
        console.error(err);
        return 'Phase Name Not Found'; // Provide a default value in case of an error
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
      } catch (err) {
        console.error(err);
        return 'Client Name Not Found';
      }
    },
    // this checks if the api data is empty for the empty state
    isDataEmpty(data) {
      return Object.keys(data).length === 0;
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

    //This sets the name for the welcome message
    this.welcomeMessage = await this.getClientName(this.id)

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
    <div class="max-width-router ms-2">
      <div>
        <button class="footer-button me-2" @click="sortAscending">Sort Ascending</button>
        <button class="footer-button" @click="sortDescending">Sort Descending</button>
      </div>
      <div>
        <p class="welcome-message text-center">Hi {{this.welcomeMessage}}, Wat ga je vandaag doen</p>
        <p class="welcome-text text-center"> Check hier de laaste inzichten</p>
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
      <div v-if="!isDataEmpty(apiData)" class="container d-flex justify-content-center">
        <div class="row">
          <div v-for="item in sortedArray" :key="item.id" class="col-lg-auto col-md-auto col-sm-8 pt-3">
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
                <hr>
              </div>
              <div class="mb-3 mx-3">
                <base-button class="footer-button-index" link :to="{ name:'campaign-summary', params: {id: item.id}}">View Details
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backgroundChart{
  background: #FFFFFF 0 0 no-repeat padding-box;
  box-shadow: 0 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  max-width: 258px;
}
.card-title-height{
  height: 80px;
}
.card-back-drop{
  border: black;
  border-radius: 25px;
}
.max-width-router{
  width: 100%;
}
.footer-button-index{
  background: #FFFFFF 0 0 no-repeat padding-box;
  border: 1px solid #707070;
  border-radius: 23px;
  opacity: 1;
  font: normal normal normal 16px/27px Poppins;
  letter-spacing: 0;
  color: #222222;
  padding: 5px 16px;
  margin-top: 12px;
}
.welcome-text{
  text-align: left;
  font: normal normal normal 20px/27px Poppins;
  letter-spacing: 0;
  margin-left: 32px;
  margin-bottom: 40px;
  color: #231F20;
  opacity: 1;
}
.welcome-message{
  text-align: left;
  font: normal normal 600 42px/54px Baskerville;
  letter-spacing: -1.68px;
  margin-left: 32px;
  margin-top: 56px;
  color: #222222;
  opacity: 1;
}

</style>