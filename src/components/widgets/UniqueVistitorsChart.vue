<script>
import { Bar } from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)


export default {
  components: { Bar },

  data() {
    return {
      pageLogs: [], // Assuming your API returns an array of page visit logs
      monthlyPageCounts: {},
      chartData: {
        labels: [ ],
        datasets: [ ]
      },
      chartOptions: {
        responsive: false,
      }
    }
  },
  mounted() {
    const apiKey = 'Help';

    // Fetch the page logs from the API using the fetch API
    fetch(`http://localhost:8000/api/domainlog/${this.$route.params.id}`,{
      headers: {
        'API-Key': apiKey,
      },
    })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          this.pageLogs = data;
          this.calculateMonthlyPageCounts();
          console.log(this.monthlyPageCounts)
          this.renderChart();
        })
        .catch(error => {
          console.error("Error fetching page logs:", error);
        });
  },
  methods: {
    calculateMonthlyPageCounts() {
      // Group logs by month
      const logsByMonth = this.pageLogs.reduce((acc, log) => {
        const month = new Date(log.datetimestamp).toLocaleString('en-US', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
          acc[month] = new Set();
        }
        acc[month].add(log.page_name);
        return acc;
      }, {});

      // Count unique pages for each month
      this.monthlyPageCounts = Object.entries(logsByMonth).reduce((acc, [month, pages]) => {
        acc[month] = pages.size;
        return acc;
      }, {});
    },

    renderChart() {
      // Update the chart data with the calculated monthly page counts
      this.chartData = {
        labels: Object.keys(this.monthlyPageCounts),
        datasets: [{
          label: 'Unique Page Visits',
          data: Object.values(this.monthlyPageCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      };

      // Update the chart using vue-chartjs
      this.renderChart(this.chartData);
    },
  }
}
</script>

<template>
  <Bar id="my-chart-id" :width="240" :height="272"
       :options="chartOptions"
       :data="chartData" />
</template>

<style scoped>

</style>