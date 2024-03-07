<template>
  <svg :name="props.name" :prefix="props.color" width="50" height="50">
    <use :href="symbolId" :color="props.color"></use>
  </svg>
</template>
<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: 'icon'
  },
  color: {
    type: String,
    default: '#333'
  }
})
const symbolId = `#${props.prefix}-${props.name}`
</script>
<style lang=""></style>
