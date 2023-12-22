<script>
import TheTimeLine from "@/components/widgets/TheTimeLine.vue";
import { RouterLink } from 'vue-router';
import UniqueVistitorsChart from "@/components/widgets/UniqueVistitorsChart.vue";
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
import NavBar from "@/components/ui/TheNavBar.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
export default {

  data(){
    return{
      apiData: [],
      apiDataUsers: [],
      userId: this.$store.getters.user_id.userId,
      id: this.$route.params.id
    }
  },
  methods:{
    onClickButton(id){
      this.$router.replace('/auth/campaign/' + id)
      console.log(id)
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
    BaseButton,
    NavBar,
    TheRealTimeLine,
    TheTimeLine,
    UniqueVistitorsChart,
    RouterLink, // Add this line
  },
  async beforeMount() {
    await this.getApiData()
    await this.getApiDataUsers()
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
        <button v-for="item in apiData" :key="item.id" class="main-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{item.campaign_name}}
        </button>
        <ul class="dropdown-menu text-center dropdown-link">
          <li v-for="userItem in apiDataUsers" :key="userItem.id">
            <a @click="onClickButton(userItem.id)">{{userItem.campaign_name}}</a>
          </li>
        </ul>
      </div>
      <div class="backgroundChart margin-dashboard mb-3 col">
        <unique-vistitors-chart/>
      </div>
      <div>
        <div class="timelineStyle margin-dashboard ">
          <the-real-time-line id :id="id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-link{
  width: 548px;
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
.backgroundChart{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
  max-width: 258px;
  height: 193px;
}
.timelineStyle{
  width: 500px;
}
.margin-dashboard{
  margin-left: 32px;
}
.main-dropdown{
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
.max-width-router{
  width: 100%;
}
</style>