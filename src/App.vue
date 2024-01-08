<script setup lang="ts">
// import { onMounted, ref } from "vue";
import { Graph } from "@antv/x6";
import { Button } from 'ant-design-vue';
import  Home  from "./view/Home.vue"
  //定义画布
// 
</script>

<template>
  <!-- <Button @click="zoomIn">zoom++</Button>
  <div class="container" ref="container"></div> -->
  <div id="App">
    <Home></Home>
  </div>
</template>

<style scoped>
#App{
  width: 100%;
  /* min-height: 1000px;s */
  height: auto;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
