<template>
  <div>
    <div>
      {{ store.count }}
      {{ store.name }}
    </div>
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
    <img src="assets/images/pit1.png" alt="" />
    <img src="assets/images/pit1copy.png" alt="" />
    <img src="assets/images/jpg1.jpeg" alt="" />
    <img src="assets/images/jpg2.jpg" alt="" />

    <ViteSvg></ViteSvg>
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
import { getNumberIP, getWeather } from 'api/index'
import { useOssStore } from 'store/oss'
import ViteSvg from 'assets/images/vite.svg'
const store = useOssStore()
const dataSource = ref([
  {
    name: 'xx',
    url: 'xxx'
  }
])
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
onMounted(async () => {
  await store.getFileListOss()
  dataSource.value = store.list
  console.log(import.meta.env.VITE_ENV)
})
// 🌸 post 测试
const getNumberIPFun = async (): Promise<any> => {
  const res = await getNumberIP({
    mobile: 15588741204
  })
  console.log(res.data)
}
// 🌸 get测试
const getWeatherFun = async (): Promise<any> => {
  const res = await getWeather({
    areacode: 110101
  })
  console.log(res.data)
}
// 🌸 分片上传
const uploadFileMultipart = async (item): Promise<any> => {
  await store.MultipartUploadFileOss(item, 3, 1024 * 1024)
  await getFileList()
}
// 🌸 普通上传

const uploadFile = async (e): Promise<any> => {
  await store.uploadFileOss(e)
  await getFileList()
}

// 🌸 断点续传
const uploadFileResume = async (item): Promise<any> => {
  await store.resumeUploadFileOss(item)
  await getFileList()
}
// 🌸 文件下载
const downloadFile = async (): Promise<any> => {
  await store.getFileOss(filename.value)
}
// 🌸 获取文件列表
const getFileList = async (): Promise<any> => {
  const list = await store.getFileListOss()
  dataSource.value = list.objects
}

// const streamUploadFile = async (item): Promise<any> => {
//   await streamUploadFileOss(item)
// }
</script>

<style lang="sass" scoped></style>
