<template >
  <div class="container">
    <a-layout > 
      <a-layout-header >Header</a-layout-header>
      <a-layout>
        <a-layout-content class="content-box">
            <Content></Content>
        </a-layout-content>
        <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import Content from '../components/Content.vue';

</script>
<style  scoped>
    .container{
        height: 100%;
        width: 100%;
    }
    .content-box{
        height: 800px;
    }
</style>