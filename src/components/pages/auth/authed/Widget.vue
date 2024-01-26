<script>
import { RouterLink } from 'vue-router';
import UniqueVistitorsChart from "@/components/widgets/UniqueVistitorsChart.vue";
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
import NavBar from "@/components/ui/TheNavBar.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import TotalVisitors from "@/components/widgets/TotalVisitors.vue";
export default {

  data(){
    return{
      welcomeMessage: "",
      apiData: [],
      apiDataUsers: [],
      userId: this.$store.getters.user_id.userId,
      id: this.$route.params.id,
      clickTrue: true
    }
  },
  methods:{
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
    async getApiDataUsers() {
      const userId = this.userId
      console.log(userId)
      this.isLoading = true;
      try {
        const apiKey = 'Help';
        const response = await fetch(`http://localhost:8000/api/user-campaign/${userId}`, {
          method: 'GET',
          headers: {
            'API-Key': apiKey,
          },
        })
        this.apiDataUsers = await response.json();
        console.log(this.apiDataUsers)
      } catch (err){
        console.error(err);
        return 'Phase Name Not Found'; // Provide a default value in case of an error
      }

      this.isLoading = false;
    },
    async getApiData() {
      if(this.id){
        const apiKey = 'Help';
        try {
          const response = await fetch(`http://localhost:8000/api/campaign/${this.$route.params.id}`, {
            method: 'GET',
            headers: {
              'API-Key': apiKey,
            },
          });
          if (response.ok) {
            this.apiData = await response.json()
          }
        } catch (error) {
          console.error(error);
          return 'Client Name Not Found';
        }
      }else{
        const apiKey = 'Help';
        try {
          const response = await fetch(`http://localhost:8000/api/campaign`, {
            method: 'GET',
            headers: {
              'API-Key': apiKey,
            },
          });
          if (response.ok) {
            this.apiData = await response.json()
          }
        } catch (error) {
          console.error(error);
          return 'Client Name Not Found';
        }
      }
    },
  },
  components:{
    TotalVisitors,
    BaseButton,
    NavBar,
    TheRealTimeLine,
    UniqueVistitorsChart,
    RouterLink,
  },
  async beforeMount() {
    await this.getApiData()
    await this.getApiDataUsers()
  },
  async created() {
    this.welcomeMessage = await this.getClientName(this.userId)
  }
}
</script>

<template>
  <div class="navbar-router">
    <div class="row">
      <nav-bar clickDashboard :clickDashboard="clickTrue"></nav-bar>
    </div>
    <div class="max-width-router">
      <div class="dropdown text-center">
        <button v-for="item in apiData" :key="item.id" class="main-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{item.campaign_name}}
        </button>
        <ul class="dropdown-menu text-center dropdown-link">
          <li v-for="userItem in apiDataUsers" :key="userItem.id">
            <router-link :to="'/auth/campaign/' + userItem.id">{{userItem.campaign_name}}</router-link>
          </li>
        </ul>
      </div>
      <div>
        <p class="welcome-message">Hi {{this.welcomeMessage}}, Wat ga je vandaag doen</p>
        <p class="welcome-text"> Check hier de laaste inzichten</p>
      </div>
      <div class="d-flex justify-content-center">
        <div class="backgroundChart margin-dashboard mb-3 col">
          <unique-vistitors-chart/>
        </div>
        <div class="backgroundChart margin-dashboard mb-3 col">
          <total-visitors/>
        </div>
        <div class="backgroundChart margin-dashboard mb-3 col">
          <total-visitors/>
        </div>
        <div class="backgroundChart margin-dashboard mb-3 col">
          <total-visitors/>
        </div>
      </div>
      <div class="d-flex  justify-content-around">
        <div class="timelineStyle margin-dashboard">
          <the-real-time-line id :id="id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.dropdown-link{
  width: 548px;
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
.backgroundChart{
  background: #FFFFFF 0 0 no-repeat padding-box;
  box-shadow: 0 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  max-width: 258px;
  height: 193px;
}
.margin-dashboard{
  margin-left: 32px;
}
.main-dropdown{
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
.max-width-router{
  width: 100%;
}
</style>