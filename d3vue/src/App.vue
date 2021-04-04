<template>
  <div>
    <h2>Vue vs d3</h2>


      <div class="section" :style="{width:`${width}px`,height:`${height*0.8}px`}">
        <vue-only 
        :lotteries="filteredLotteries"
        :lottery-stats="lotteryStats"
        :width="width"
        >
        <!-- lotteries data와 lotteryStats라는 data를 전달한다 -->
        </vue-only>
      </div>
      <div class="filters">
        <el-checkbox-group v-model="filters">
          <el-checkbox label="1"></el-checkbox>
          <el-checkbox label="2"></el-checkbox>
          <el-checkbox label="3"></el-checkbox>
          <el-checkbox label="4"></el-checkbox>
        </el-checkbox-group>
      </div>
    <div class="section">
      <vue-d3-mixed
        :lotteries="filteredLotteries"
        :lottery-stats="lotteryStats"
        :width="width"
        :height="height">

      </vue-d3-mixed>

    </div>
  </div>
</template>
<script>
import VueOnly from './components/VueOnly.vue'
import VueD3Mixed from './components/VueD3Mixed.vue'
import MostlyD3 from './components/MostlyD3.vue'
import Modal from './components/Modal.vue'
import * as d3 from 'd3'
export default {
  name: 'App',
  data () {
    return {
      lotteries: null,
      lotteryStats: null,
      scrollTop: 0,
      filters: ['1','2','3','4'],
      width:window.innerWidth*0.9,
      height:window.innerHeight*0.9
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueOnly, VueD3Mixed, MostlyD3, Modal
  },
  computed:{
    filteredLotteries(){
      if(!this.lotteries){
        return null
      }
      else{
        let targetLottery= this.lotteries.filter(d=>this.filters.includes(d.Boro));
        // filters가 lotteries의 Boro를 갖고있으면 그것이 targetLottery가된다.
        return targetLottery
      }
    }
    // computedWidth(){
    //   return this.width;
    // }
  },
  // eslint-disable-next-line space-before-blocks
 mounted(){
    Promise.all([
      d3.csv('housing_lotteries.csv'),
      d3.csv('lottery_income_household.csv')
    ])
      .then(data => {
        this.lotteries = data[0];
        this.lotteryStats = data[1];
      }).then(()=>{
        console.log('lotteries is like : ',this.lotteries);
        console.log('lotteryStats is like: ',this.lotteryStats);
      })
    this.adjustWindow()
    window.addEventListener('resize',this.adjustWindow)
  },
   unmounted() {
    window.removeEventListener("resize", this.adjustWindow)
  },
  methods: {
    adjustWindow(){
      this.width=window.innerWidth*0.8
       this.height=window.innerHeight*0.9
    }
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}
.section {
  height: 500px;
  border-bottom: 1px solid #888888;
  margin:auto;
}
  
</style>
