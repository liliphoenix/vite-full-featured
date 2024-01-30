<template>
  <div :class="`${prefix}-message-box`">MessageBox</div>
</template>

<script lang="ts" setup>
// import className from 'classnames'
import { getVueGlobalValue } from 'utils/index'
// 🌸 定义prefix防止class变量污染
const prefix = getVueGlobalValue()?.$prefix
</script>

<style lang="scss" scoped>
.#{prefix}-message-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
