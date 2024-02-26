<template>
  <div>
    <Button type="primary" @click="getListFun">testAxios-Get</Button>
    <MessageBox></MessageBox>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import MessageBox from '@/components/Message/MessageBox.vue'
import { useMessageFun } from 'com/Message/index'
import { getNumberIP } from 'api/index'
onMounted(() => {
  useMessageFun()
})
const getListFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: 15588741204
  })
  console.log(res.data)
}
</script>

<style lang="sass" scoped></style>
