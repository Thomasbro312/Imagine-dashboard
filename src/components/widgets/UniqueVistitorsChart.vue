<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors)

export default {
  components: { Bar },

  data() {
    return {
      pageLogs: [],
      monthlyPageCounts: {},
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: false,
      },
      chartInstance: null,
    }
  },
  mounted() {
    const apiKey = 'Help';

    fetch(`http://localhost:8000/api/domainlog/${this.$route.params.id}`, {
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
          console.log(this.monthlyPageCounts);
          this.renderChart();
        })
        .catch(error => {
        });
  },
  methods: {
    calculateMonthlyPageCounts() {
      //this calculates the amount of monthly page visits
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

      // Check if chartInstance is available
      if (this.chartInstance) {
        // Update the chart using the chartInstance directly
        this.chartInstance.render(this.chartData, this.chartOptions);
      } else {
        // Create the chart and save the reference to the chartInstance
        new Bar(this, {
          propsData: {
            options: this.chartOptions,
            chartData: this.chartData,
          },
        });
        this.$refs.chart = this.chartInstance;
        this.chartInstance.$mount();
      }
    },
  }
}
</script>

<template>
  <div>
    <Bar ref="chart" :width="250" :height="193" :options="chartOptions" :data="chartData" />
  </div>
</template>

<style scoped>
</style>
