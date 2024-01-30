<template>
  <div>login</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getVueGlobalValue } from '@/utils'
onMounted(() => {
  console.log(getVueGlobalValue()?.$isRole)
})
</script>

<style lang="scss" scoped></style>
