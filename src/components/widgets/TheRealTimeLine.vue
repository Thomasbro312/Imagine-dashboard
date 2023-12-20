<template>
  <div id="app">
    <calendar-view
        :show-date="showDate"
        :items="items"
        class="style theme-default holiday-us-traditional holiday-us-official">
      <template #header="{ headerProps }">
        <calendar-view-header
            :header-props="headerProps"
            @input="setShowDate" />
      </template>
    </calendar-view>
  </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar" // published version

import "../../../node_modules/vue-simple-calendar/dist/style.css"
// The next two lines are optional themes
import "../../../node_modules/vue-simple-calendar/dist/css/default.css"
import "../../../node_modules/vue-simple-calendar/dist/css/holidays-us.css"

export default {
  name: 'app',
  props:{
    id:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function() {
    return {
      showDate: new Date(),
      items:[],
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
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
    loopCalendar() {
      if(this.id){
        for (const item of this.apiData) {
          const start = new Date(item.start_date)
          const isoStartDate = start.toISOString()
          const end = new Date(item.end_date)
          const isoEndDate = end.toISOString()
          // const start = item.start_date;
          // const formattedStart = start.replace(/\s/, 'T');
          // const end = item.end_date;
          // const formattedEnd = end.replace(/\s/, 'T');
          this.items = [{
            id: 'e1',
            startDate: isoStartDate,
            endDate: isoEndDate,
            allDay:true,
            title: item.campaign_name,
            resource: 2
          }];
        }
        this.isLoading = false;
      }
      else{
        for (const item of this.apiData) {
          const start = new Date(item.start_date)
          const isoStartDate = start.toISOString()
          const end = new Date(item.end_date)
          const isoEndDate = end.toISOString()
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          this.items.push({
            id: "e1",
            startDate: isoStartDate,
            endDate: isoEndDate,
            title: item.campaign_name,
            allDay:true,
            style: 'background-color:' + color + ';',
            resource: 2
          });
        }
        console.log(this.items)
        this.isLoading = false;
      }
    }
  },
  async mounted() {
    await this.getApiData()
    await this.loopCalendar()
  }
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  width: 50vw;
}
.style{
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 6px #00000029;
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  opacity: 1;
}
</style>