import type { getTokenFun, globalProperties } from '@/types'
import { getCurrentInstance } from 'vue'
import { initOssApi } from 'api/index'
const OSS = require('ali-oss')
// 🌸 获取token方法
export const getToken: getTokenFun = () => {
  const token = localStorage.getItem('token')
  return token
}

/**
 *  🌸 获取vue全局变量
 */
export const getVueGlobalValue: () => globalProperties | null = () => {
  const globalProperties = getCurrentInstance()
  if (globalProperties !== null) {
    return globalProperties.appContext.config.globalProperties
  } else {
    return null
  }
}
let client
// 🌸 oss文件上传
export const initOss = async (): Promise<any> => {
  try {
    const res: any = await initOssApi()

    const oss = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: res.credentials.AccessKeyId,
      accessKeySecret: res.credentials.AccessKeySecret,
      stsToken: res.credentials.SecurityToken,
      bucket: 'full-featured-test',
      refreshSTSTokenInterval: 300000,
      endpoint: 'oss-cn-beijing.aliyuncs.com'
    })

    client = oss
    console.log(oss)
    return client
  } catch (error) {
    console.log(error)
  }
}
export const uploadFileOss = async (item): Promise<any> => {
  const client = await initOss()
  try {
    const res = await client.multipartUpload(
      `image/${item.file.name}`,
      item.file.originFileObj,
      {}
    )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
