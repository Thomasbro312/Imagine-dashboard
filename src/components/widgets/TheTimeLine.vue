<template>
  <Calendar :attributes="attributes" />
</template>

<script>
import 'v-calendar/style.css';
import {Calendar} from "v-calendar";
import {ref} from "vue";

export default {
  components: {Calendar},
  props:['id'],
  data(){
    return{
      test:[],
      apiData: [],
      attributes: ref([
        {
          dot: true,
          dates: [
              new Date()
          ],
        }])
    }
  },
  methods:{
    async getApiData() {
      try {
        const response = await fetch(`http://localhost:8000/api/campaign/${this.$route.params.id}`, {
          method: 'GET'
        });
        if (response.ok) {
          this.apiData = await response.json()
        }
      } catch (error) {
        console.error(error);
        return 'Client Name Not Found';
      }
    },
    loopCalendar() {
      for (const item of this.apiData) {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        this.attributes.push({highlight: 'purple',  popover: {
            label: 'The campaign is from ' + item.start_date + ' to ' + item.end_date} , dates: [[start, end]]});
      }
    }
  },
  async beforeMount() {
    await this.getApiData()
    await this.loopCalendar()
  }
}
</script>
