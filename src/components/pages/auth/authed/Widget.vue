<script>
import TheTimeLine from "@/components/widgets/TheTimeLine.vue";
import UniqueVistitorsChart from "@/components/widgets/UniqueVistitorsChart.vue";
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
import NavBar from "@/components/ui/TheNavBar.vue";
export default {
  data(){
    return{
      id: this.$route.params.id
    }
  },
  components:{
    NavBar,
    TheRealTimeLine,
    TheTimeLine, UniqueVistitorsChart
  }
}
</script>

<template>
  <nav-bar></nav-bar>
  <div class="backgroundChart col">
      <unique-vistitors-chart/>
    </div>
  <div class="m-3">
    <div class="timelineStyle p-3">
      <the-real-time-line id :id="id"/>
    </div>
  </div>
</template>

<style scoped>
.backgroundChart{
  background-color: white;
  max-width: 260px;
  height: 272px;
  border-radius: 10px;
  border: #d9d9d9 solid 1px;
}
.sizeCalender{
  max-width: 250px;
  height: 272px;
}
.timelineStyle{
  background-color: #ffffff;
  border-radius: 10px;


}
</style>