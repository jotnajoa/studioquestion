<template>
    <div id='linegraph'>
        <svg :style="{width:width,height:height}">
            <path class='line'></path>
            <g class="axis x-axis"></g>
            <g class="axis y-axis"></g>
        </svg>
    </div>
     <div style='display:none'>{{console}}</div>
</template>

<script>
import * as d3 from 'd3'
export default {
    props:['lotteries','lottery-stats','width','height'],
    data(){
        return{
            margin:{top:this.height*0.05,
            bottom:this.height*0.05,
            left:this.width*0.05,
            right:this.width*0.05
            }
        }
    },
    computed:{
   unitNumbers(){
       if(!this.lotteries){
           return null
       }else{
            return d3.rollup(
                this.lotteries,
                values=>values.reduce((acc,crr)=>{
                    return {units:acc.units+Number(crr["Number of Units"])}
                },{units:0}),
                d=>d['Lottery Number']
            )
           }
   },
   lotteriesByNumber(){
      if(!this.lotteries){
        return null
        // return new Map()이라고 Alec은 써놨음
      }
      else{
        return Array.from(d3.rollup(
          this.lotteries,
          values => d3.mean(values.map(d=>+d['Rent'])),
          t => +t['Lottery Number']
        ))
      }
    },
    xScale(){
      let values=this.lotteriesByNumber.map(d=>d[0])
      console.log(values);
      let extent = d3.extent(values);
    //   extent=[84,440]
      console.log(extent);
      let xscale = d3.scaleLinear()
      .domain(extent)
      .range([this.margin.left,this.width-this.margin.right]);
      return xscale;
    },
    console(){
        if(this.lotteriesByNumber){

            console.log(this.lotteriesByNumber);
            console.log(this.unitNumbers)

            console.log(Array.from(this.unitNumbers).map(d=>d[1].units)   );
            return 'hi'
        }
    },
    yScale(){
      let values = this.lotteriesByNumber.map(d=>d[1])
      let extent = d3.extent(values);
      console.log(extent)
      let yscale = d3.scaleLinear()
      .domain(extent)
      .range([this.height-this.margin.bottom,this.margin.top])
      return yscale
    },
    rScale(){
        let values = this.unitNumbers
        let extent = d3.extent(values);
        let rscale = d3.scaleLinear()
        .domain(extent)
        .range([1,20])
        return rscale;
    }
    },
    methods: {
        line(){
            return d3.line()
            .x(d=>{
                return this.xScale(d[0])})
            .y(d=>this.yScale(d[1]))
        }
    },
    updated() {
        if(!this.lotteries){
            return null
        }else{
            d3.select('.line')
            .attr('d',()=>{return this.line()(this.lotteriesByNumber)})
        }
    },
}
</script>

<style scoped>
.line{
    stroke:black;
    stroke-width:2px;
    fill:none;
}
</style>