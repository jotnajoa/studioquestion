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
        return{center:0}
    },
    computed:{
        lotteriesWithStats(){
            if(!this.lotteryStatus){
                return null
            }
            else{
                
            }
        }

    }
}
</script>
