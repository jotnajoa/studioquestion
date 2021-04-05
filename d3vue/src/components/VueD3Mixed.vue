<template>
    <div id='linegraph'>
        <svg :style="{width:width,height:height}">
            <path class='line'></path>
            <g class="axis x-axis" :transform="`translate(0,${height-margin.bottom})`"></g>
            <g class="axis y-axis" :transform="`translate(${margin.left},0)`"></g>
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
            return Array.from(d3.rollup(
                this.lotteries,
                values=>values.reduce((acc,crr)=>{
                    return {units:acc.units+Number(crr["Number of Units"])}
                },{units:0}),
                d=>d['Lottery Number']
            ))
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
      let extent = d3.extent(values);
    //   extent=[84,440]
      let xscale = d3.scaleLinear()
      .domain(extent)
      .range([this.margin.left,this.width-this.margin.right]);
      return xscale;
    },
    console(){
        if(this.lotteriesByNumber){

            console.log(this.lotteriesByNumber);
            console.log(this.unitNumbers)

            return 'hi'
        }
    },
    yScale(){
      let values = this.lotteriesByNumber.map(d=>d[1])
      let extent = d3.extent(values);
      let yscale = d3.scaleLinear()
      .domain(extent)
      .range([this.height-this.margin.bottom,this.margin.top])
      return yscale
    },
    rScale(){
        let values = this.unitNumbers.map(t=>t[1].units)
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
            .y((d,i)=>{
            
            if(d[1]==undefined){
                return this.yScale(
                    (this.lotteriesByNumber[i-1][1]+this.lotteriesByNumber[i+1][1])/2
                    )
            }else{
            return this.yScale(d[1])
            }
            }
            )
        }
    },
    updated() {
        if(!this.lotteries){
            return null
        }else{
            d3.select('.line')
            .attr('d',()=>{return this.line()(this.lotteriesByNumber)})
        }
        const xAxis =d3.axisBottom(this.xScale)
        const yAxis =d3.axisLeft(this.yScale)
        d3.select('.x-axis').call(xAxis);
        d3.select('.y-axis').call(yAxis)

        d3.select('svg')
        .selectAll('circle')
        .data(this.unitNumbers)
        .join('circle')
        .attr('cx',d=>this.xScale(Number(d[0])))
        .attr('cy',(d,i)=>{return this.yScale(this.lotteriesByNumber[i][1])})
        .attr('r',d=>this.rScale(d[1].units))
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