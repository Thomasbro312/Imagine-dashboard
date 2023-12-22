<script>
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
      // Add a reference to the chart instance
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
          // Use this.chartInstance to reference the chart instance
        })
        .catch(error => {
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
    }
}
</script>

<template>
  <p>{{ this.monthlyPageCounts }}</p>
</template>

<style scoped>
</style>
