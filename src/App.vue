<template>
  <div id="app" @click="turnLogin">
    <main-tabbar></main-tabbar>
    <router-view/>
  </div>
</template>
<script>
import mainTabbar from "@/components/mainTabbar/mainTabbar";
export default {
  name: 'App',
  components: {
    mainTabbar
  },
  methods:{
    turnLogin(){
      if (localStorage.getItem('token')===null){
        // console.log(this.$Store.get('token'))
        this.$router.push('/')
      }
    }
  },
  mounted() {
    this.getConfigJson()
  }
}
</script>

<style>
  @import "assets/css/normalize.css";
  html,body{
    height:100%;margin:0;padding:0
  }
  body{
    background: #f2f2f2;
    background-size: 100% 100%;
    background-attachment: fixed;
  }
  #app{
    height: 100%;
  }


</style>
