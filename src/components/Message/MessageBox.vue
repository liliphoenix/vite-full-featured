<template>
  <div :class="msgClass">{{ message }}</div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import className from 'classnames'
import { getVueGlobalValue } from 'utils/index'
// 🌸 是否显示
const props = defineProps({
  message: {
    type: String,
    default: '🌸 This is Message 🌸'
  },
  type: {
    type: String,
    default: 'info'
  }
})
// const isShowMsg = ref(false)
// const msgContent = ref(props.message)
// 🌸 定义prefix防止class变量污染
const prefix = `${getVueGlobalValue()?.$prefix}-message-box`
const msgClass = className(prefix, props.message)
</script>

<style lang="scss" scoped>
.#{$prefix}-message-box {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 10px 15px;
  background-color: $info;
  border-radius: 7px;
  color: white;
  font-size: 17px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: $info;
  font-family: RussoOne-Regular;
  font-weight: 300;
}
</style>
