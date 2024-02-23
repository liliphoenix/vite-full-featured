<template>
  <div>
    login
    <MessageBox></MessageBox>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import MessageBox from '@/components/Message/MessageBox.vue'
import { useMessageFun } from 'com/Message/index'
onMounted(() => {
  useMessageFun()
})
</script>

<style lang="sass" scoped></style>
