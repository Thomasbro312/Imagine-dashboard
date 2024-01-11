<script>
export default {
  data() {
    return {
      pageLogs: [],
      totalPageCounts: null,
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
          this.calculateAllPageCounts();
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
    calculateAllPageCounts(){
      this.totalPageCounts = Object.values(this.monthlyPageCounts).reduce((sum, count) => sum + count, 0);
    }
  }
}
</script>

<template>
  <div>
    <p class="title-style">Total Leads</p>
    <p class="count-style">{{ this.totalPageCounts }}</p>
    <p class="bottom-text-style">Bekijk Meer</p>
  </div>
</template>

<style scoped>
.count-style{
  text-align: left;
  font: normal normal 600 60px/77px Baskerville;
  letter-spacing: -1.2px;
  color: #222222;
  margin-left: 16px;
  text-transform: capitalize;
  opacity: 1;
}
.title-style{
  text-align: left;
  font: normal normal 600 18px/27px Poppins;
  letter-spacing: 0;
  color: #222222;
  opacity: 1;
  margin: 16px 0 11px 16px;
}
.bottom-text-style{
  text-align: left;
  font: normal normal normal 15px/23px Poppins;
  letter-spacing: 0;
  color: #222222;
  opacity: 1;
  margin: 35px 0 0 16px;
}
</style>
