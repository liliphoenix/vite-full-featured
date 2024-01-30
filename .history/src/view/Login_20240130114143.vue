<template>
  <div>
    login

    <MessageBox></MessageBox>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getVueGlobalValue } from '@/utils'
import MessageBox from '@/components/messageBox'
onMounted(() => {
  console.log(getVueGlobalValue()?.$isRole)
})
</script>

<style lang="scss" scoped></style>
