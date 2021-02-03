<!--标题栏组件-->
<template>
 <div id="text">
   {{headText}}
 </div>
</template>

<script>
export default {
  name: "headItem",
  data(){
    return {
    }
  },
  props:['headText']
}
</script>

<style scoped>
#text{
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
  padding-left: 15px;

  font-size: 16px;
  border-left:4px solid #0089e7;
  font-weight: bold;
}




</style>
