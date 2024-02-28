<template>
  <div>
    <Button type="primary" @click="getNumberIPFun">testAxios-Post</Button>
    <Button type="primary" @click="getWeatherFun">testAxios-Get</Button>
    <a-upload
      name="file"
      action=""
      :custom-request="uploadFile"
      @change="uploadFile"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
  </div>
</template>

<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import { uploadFileOss } from 'utils/index'
import { getNumberIP, getWeather } from 'api/index'
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
const uploadFile = async (item): Promise<any> => {
  await uploadFileOss(item)
}
</script>

<style lang="sass" scoped></style>
