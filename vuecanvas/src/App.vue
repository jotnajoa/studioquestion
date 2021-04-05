<template>
<vue-canvas
:width='width'
:height='height'
:style="{width:'100%',height:'100%'}"
>

</vue-canvas>
</template>


<script>
import vueCanvas from './components/vueCanvas.vue'

export default {
  name: 'App',
  components: {
    vueCanvas
  },
  data(){
    return {
      width:window.innerWidth*0.9,
      height:window.innerHeight*0.9
    }
  },
  mounted(){
    window.addEventListener('resize',this.resizewidth)
  },
  unmounted(){
    window.removeEventListener('resize',this.resizewidth)
  },

methods: {
  resizewidth(){
    this.width=window.innerWidth*0.9;
    this.height=window.innerWidth*0.9
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
}
</style>
