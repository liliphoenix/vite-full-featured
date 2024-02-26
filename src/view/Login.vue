<template>
  <div>
    <Button type="primary" @click="getNumberIPFun">testAxios-Post</Button>
    <Button type="primary" @click="getWeatherFun">testAxios-Get</Button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { getNumberIP, getWeather } from 'api/index'
import * as process from 'process'
onMounted(() => {
  console.log(process.env.VUE_CLIENT_TEST_HOST)
})
const getNumberIPFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: 15588741204
  })
  console.log(res.data)
}
const getWeatherFun = async (): Promise<any> => {
  const res = await getWeather({
    areacode: 110101
  })
  console.log(res.data)
}
</script>

<style lang="sass" scoped></style>
