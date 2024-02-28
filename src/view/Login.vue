<template>
  <div>
    <Button type="primary" @click="getNumberIPFun">testAxios-Post</Button>
    <Button type="primary" @click="getWeatherFun">testAxios-Get</Button>
    <!-- <a-upload name="file" action="" :custom-request="uploadFile"> -->
    <input type="file" name="Click to Upload (normal)" @change="uploadFile" />
    <a-upload name="file" action="" :custom-request="uploadFileMultipart">
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload (multipart)
      </a-button>
    </a-upload>
    <a-upload name="file" action="" :custom-request="uploadFileResume">
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload (resume)
      </a-button>
    </a-upload>
    <!-- <a-upload name="file" action="" :custom-request="streamUploadFile">
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload (stream)
      </a-button>
    </a-upload> -->
  </div>
</template>

<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import {
  uploadFileOss,
  MultipartUploadFileOss,
  resumeUploadFileOss
} from 'utils/ossUpload'
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
const uploadFileMultipart = async (item): Promise<any> => {
  await MultipartUploadFileOss(item, 3, 1024 * 1024)
}
const uploadFile = async (e): Promise<any> => {
  await uploadFileOss(e)
}
const uploadFileResume = async (item): Promise<any> => {
  await resumeUploadFileOss(item)
}
// const streamUploadFile = async (item): Promise<any> => {
//   await streamUploadFileOss(item)
// }
</script>

<style lang="sass" scoped></style>
