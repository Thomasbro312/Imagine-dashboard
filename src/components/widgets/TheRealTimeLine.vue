<script>
import '@mobiscroll/vue/dist/css/mobiscroll.min.css'
import {ref} from 'vue'
import {getJson, localeEn, localeNl, MbscEventcalendar, setOptions} from '@mobiscroll/vue'

setOptions({
  locale: localeEn,
  theme: 'material',
  themeVariant: 'light'
})

export default {
  props:{
    id:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {MbscEventcalendar},
  data(){
    return{
      isLoading: true,
      test:[],
      apiData: [],
      myEvents:ref([]),
      myView: {
        timeline: { type: 'year' }
      },
      myResources:ref([
        {
          id: 2,
          name: 'Campaign Duration',
          color: '#88e200'
        },
      ])
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
          this.myEvents = [{
            start: isoStartDate,
            end: isoEndDate,
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
          this.myEvents.push({
            start: isoStartDate,
            end: isoEndDate,
            title: item.campaign_name,
            allDay:true,
            resource: 2
          });
        }
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

<template>
  <div>
    <MbscEventcalendar v-if="!isLoading"
        class="timelineStyle"
        :view="myView"
        :data="myEvents"
        :resources="myResources"
    />
  </div>
</template>

<style>

</style>
