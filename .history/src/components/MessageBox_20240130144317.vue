<template>
  <div :class="className()">MessageBox</div>
</template>

<script lang="ts" setup>
import className from 'classnames'
// 🌸 定义prefix防止class变量污染
const prefix = 'bobi-admin-msg-box'
</script>

<style lang="scss" scoped></style>
