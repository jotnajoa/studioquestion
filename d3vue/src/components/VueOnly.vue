<template>
    <!-- <div class='VueOnly'> -->
    <transition-group tag='section' class='VueOnly'>
      <div class='graphs' v-for="boro in lotteriesByBorough" :key="boro['value']">
        
        <div>{{boro[0]}}</div>
        
        <div class="bargraph" :style="{width: xScale(boro[1]) + 'px'}"></div>

      </div>
     </transition-group>
    <!-- </div> -->
</template>

<script>
import * as d3 from 'd3'
export default {
  data () {
    return {

    }
  },
  props:['lotteries','lotteryStats','width'],
  computed:{
    lotteriesByBorough(){
      if(!this.lotteries){
        return null
        // return new Map()이라고 Alec은 써놨음
      }
      else{
        return d3.rollup(
          this.lotteries,
          values => d3.mean(values.map(d=>+d['Rent'])),
          t => t['Boro']
        )
      }
    },
    xScale(){
      let values=this.lotteriesByBorough.values();
      let extent = d3.extent(values);
      let xscale = d3.scaleLinear()
      .domain([0,extent[1]])
      .range([0,this.width*0.8]);
      return xscale;
    }
  }
}
</script>
<style scoped>
.bargraph{
  margin-top:1%;
  height:25px;
  background-color:tomato;
}
.graphs{
  display:flex;
  align-items: center;
  gap:0 5px;
}

.v-enter-active{
  animation:fade-in 1s 
}

.v-leave-active{
  animation:fade-in 1s reverse
}

@keyframes fade-in {
  from{
    opacity:0  ;
    width:0 ;
    background-color:blue ;
  }
  to{
    opacity:1;
    width:100%;
  }
}


</style>