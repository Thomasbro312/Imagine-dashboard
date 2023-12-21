<script>
import TheTimeLine from "@/components/widgets/TheTimeLine.vue";
import UniqueVistitorsChart from "@/components/widgets/UniqueVistitorsChart.vue";
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
import NavBar from "@/components/ui/TheNavBar.vue";
export default {
  data(){
    return{
      apiData: [],
      id: this.$route.params.id
    }
  },
  methods:{
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
    NavBar,
    TheRealTimeLine,
    TheTimeLine, UniqueVistitorsChart
  },
  async beforeMount() {
    await this.getApiData()
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
        <button class="main-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{this.apiData[0].campaign_name}}
        </button>
        <ul class="dropdown-menu">
          <li></li>
        </ul>
      </div>
      <div class="backgroundChart col">
        <unique-vistitors-chart/>
      </div>
      <div>
        <div class="timelineStyle ">
          <the-real-time-line id :id="id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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