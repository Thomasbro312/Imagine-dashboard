<script>
import TheTimeLine from "@/components/widgets/TheTimeLine.vue";
import UniqueVistitorsChart from "@/components/widgets/UniqueVistitorsChart.vue";
import TheRealTimeLine from "@/components/widgets/TheRealTimeLine.vue";
export default {
  data(){
    return{
      id: this.$route.params.id
    }
  },
  components:{
    TheRealTimeLine,
    TheTimeLine, UniqueVistitorsChart
  }
}
</script>

<template>
  <div class="container row gap-5">
    <div class="sizeCalender col">
      <the-time-line :id="id"/>
    </div>
    <div class="backgroundChart col">
      <unique-vistitors-chart/>
    </div>
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