<template>
    <div>
        <canvas id='mycanvas'></canvas>
    </div>
</template>

<script>
import Rect from './Rect.js'
export default {
    data(){
        return {
            canvas:null,
            context:undefined,
            rectWidth:this.width*0.8,
            rectHeight:this.height*0.8,
            rectStart:[5,5],
            rectClass:[]
        }
    },
    props:['width','height'],
    mounted(){
        const canvas = document.querySelector('#mycanvas');
        const context = canvas.getContext('2d');
        this.context=context;
        this.canvas=canvas;
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        setTimeout(()=>{
            this.drawRect()
            this.frameAnimate()
        },1500)
        for(let i=0;i<100;i++){
            this.rectClass.push(new Rect(this.context,i*10,i*5,10,10,2,2))
        }
    },
    updated(){
            this.canvas.width=this.width;
            this.canvas.height=this.height;
            this.rectWidth=this.width*0.8;
            this.rectHeight=this.height*0.8;
            this.rectClass.forEach((d,i)=>{
            d.x=i*10;
            d.y=i*5
            d.xspeed=1;
            d.yspeed=1;
            })
            this.drawRect()
            this.frameAnimate()
    },
    methods: {
        drawRect(){
        if(this.context){
        this.context.beginPath();
        this.context.rect(this.rectStart[0],this.rectStart[1],this.rectWidth,this.rectHeight);
        this.context.stroke()
        this.context.closePath();
        }
        },
        draw(){
            this.rectClass.forEach((d)=>{d.draw()})
        },
        frameAnimate(){
            requestAnimationFrame(this.frameAnimate)
            this.context.clearRect(0, 0, this.width, this.height);
            this.rectClass.forEach((d)=>{
                d.draw();
                d.update();
            })
        }
    },
}
</script>

<style scoped>
#mycanvas{
    border:solid 1px black;
}
</style>