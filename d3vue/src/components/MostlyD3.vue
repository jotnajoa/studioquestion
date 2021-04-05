<template>
    <div>
    <svg id='circle-chart'></svg>
    </div>
</template>

<script>
import * as d3 from 'd3'
export default {
    props:['lotteries','lottery-stats','width','height'],
    data(){
        return{center:0,
            margin:{top:this.height*0.05,
            bottom:this.height*0.05,
            left:this.width*0.05,
            right:this.width*0.05
            }
        
        }
    },
    computed:{

        lotteriesWithStats(){
            if(!this.lotteryStats){
                return null
            }
            else{
                return this.lotteryStats.map(d=>{
                    const matchingLotteries = this.lotteries.filter(e=>e["Lottery Number"]==d["LTTRY_PROJ_NO"])
                    const aggregates = matchingLotteries.reduce((acc,v)=>{
                        return {
                            numOfUnits:acc.numOfUnits+Number(v["Number of Units"]),
                            householdSize:acc.householdSize+Number(v["Eligible Household Size"]),
                            numberOfLotteries:acc.numberOfLotteries+1
                        }
                    },
                    {numOfUnits:0,householdSize:0,numberOfLotteries:0}
                    )
                    return{
                        ...d,
                        lotteries:matchingLotteries,
                        aggregates:aggregates
                    }
                })
            }
        },
        rScale(){
            let values = this.lotteriesWithStats.map(d=>d.aggregates.numOfUnits)
            console.log(values);
            let extent = d3.extent(values)
            console.log(extent);
            return d3.scaleLinear()
            .domain(extent)
            .range([5,20])
        }
    },
    mounted(){

        d3.select('#circle-chart')
        .attr('width',this.width-(this.margin.left+this.margin.right))
        .attr('height',this.height-(this.margin.top+this.margin.bottom))
        .append('g')
        .attr('class','bubbles')
        .attr('transform',`translate(${this.margin.left},${this.margin.top})`)

    },
    updated(){

        if(this.lotteriesWithStats && this.rScale){
        const bubbleData =this.lotteriesWithStats;
        const bubble = d3.select('.bubbles').selectAll('circle').data(bubbleData)
        .join('circle')
        .attr('class','bubble')

        
    bubble
      .attr('r', d => this.rScale(d.aggregates.numOfUnits))
      .transition()
      .duration(1500)
      .attr('r',d => {
          return this.rScale(d.aggregates.numOfUnits)*2
      }
      )

    function ticked(){
        bubble.attr('cx',d=>d.x).attr('cy',d=>d.y);
    }
    console.log(this.width);
    const center =[this.width/2,this.height/2];

    const simulation = d3.forceSimulation(bubbleData)
    .on('tick',ticked)
    .force('collide',d3.forceCollide().radius(d=>{
        
        return 2+this.rScale(d.aggregates.numOfUnits)
        
        
        }
        )
        )
        .force('charge', d3.forceManyBody().strength(0.01))


 simulation.force('x', d3.forceX().x(function(d) {
  return center[0]
})

)
.force('y', d3.forceY().y(function(d) {
  return center[1];
}))
    // .force('y',d3.forceY(center[1]).strength(0.001))


// simulation.force('x', d3.forceX().x(function(d) {
//   return xScale(d.value);
// }))
// .force('y', d3.forceY().y(function(d) {
//   return 0;
// }))

    simulation.restart()

    setTimeout(()=>{simulation.force('collide',d3.forceCollide().radius(d=>{
        
        return 2+this.rScale(d.aggregates.numOfUnits)*2

        }
        )
        )},1000)
    // 여기서 d.r은 어디서 나온거지? r은 bubble.attr('r')에서밖에 정의가 안되어있는데?
    }
    },
    methods: {
        tick(bubble){
           bubble.attr('cx',d=>d.x).attr('cy',d=>d.y); 
        }
    },
}
</script>

<style scoped>
.bubble{
    fill:red;
}
</style>
