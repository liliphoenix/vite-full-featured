<template>
  <div :class="className()">MessageBox</div>
</template>

<script lang="ts" setup>
import className from 'classnames'
import { getVueGlobalValue } from 'utils/index'
// 🌸 定义prefix防止class变量污染
const { $prefix } = getVueGlobalValue

console.log($prefix)
</script>

<style lang="scss" scoped></style>
