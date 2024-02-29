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
    <a-table :data-source="dataSource" :columns="columns" />
    <a-input-search
      v-model:value="filename"
      placeholder="input search text"
      enter-button="download"
      size="large"
      @search="downloadFile"
    />

    <!-- <a-upload name="file" action="" :custom-request="streamUploadFile">
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload (stream)
      </a-button>
    </a-upload> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import {
  uploadFileOss,
  MultipartUploadFileOss,
  resumeUploadFileOss,
  getFileOss,
  getFileListOss
} from 'utils/ossUpload'
import { getNumberIP, getWeather } from 'api/index'
const dataSource = ref([])
const filename = ref()
const columns = ref([
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url'
  }
])
onMounted(() => {
  getFileList()
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
const uploadFileMultipart = async (item): Promise<any> => {
  await MultipartUploadFileOss(item, 3, 1024 * 1024)
  await getFileList()
}
const uploadFile = async (e): Promise<any> => {
  await uploadFileOss(e)
  await getFileList()
}
const uploadFileResume = async (item): Promise<any> => {
  await resumeUploadFileOss(item)
  await getFileList()
}
const downloadFile = async (): Promise<any> => {
  console.log(filename.value)

  await getFileOss(filename.value)
}
const getFileList = async (): Promise<any> => {
  const list = await getFileListOss()
  dataSource.value = list.objects
}
// const streamUploadFile = async (item): Promise<any> => {
//   await streamUploadFileOss(item)
// }
</script>

<style lang="sass" scoped></style>
