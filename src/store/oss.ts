import { defineStore } from 'pinia'
import type { mainState } from 'types/store'
import { initOssApi } from 'api/index'
import { downloadFile } from 'utils/index'
const OSS = require('ali-oss')

export const useOssStore = defineStore('oss', {
  state: (): mainState => {
    return {
      count: 0,
      name: 'vite-full-featured',
      client: null,
      list: [
        {
          name: 'default',
          url: 'xxx'
        }
      ]
    }
  },
  actions: {
    // 🌸 初始化oss
    initOss: async function (): Promise<any> {
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
        this.client = oss
      } catch (error) {
        console.log(error)
      }
    },
    /*
     *    🌸 普通上传
     *    @params item 文件对象
     */
    uploadFileOss: async function (item): Promise<any> {
      try {
        if (!this.client) {
          this.client = this.initOss()
        }
        const res = await this.client.put(
          `normal/${item.target.files[0].name}`,
          item.target.files[0]
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    /*
     *    🌸 分片上传
     *    @params item 文件对象
     *    @params parallel 分片个数
     *    @params partSize 分片大小
     */
    MultipartUploadFileOss: async function (
      item,
      parallel = 3,
      partSize = 1024 * 1024
    ): Promise<any> {
      if (!this.client) {
        this.client = this.initOss()
      }
      try {
        console.log(item)
        const res = await this.client.multipartUpload(
          `multipart/${item.file.name}`,
          item.file,
          {
            parallel,
            partSize,
            progress: (p) => {
              item.onProgress({ percent: Math.floor(p * 100) })
            }
          }
        )
        console.log(res)
        if (res.res.status === 200) {
          item.onSuccess()
        }
      } catch (error) {
        console.log(error)
      }
    },
    /*
     *    🌸 断点续传
     *    @params item 文件对象
     *    @params parallel 分片个数
     *    @params partSize 分片大小
     */
    resumeUploadFileOss: async function (item): Promise<any> {
      if (!this.client) {
        this.client = this.initOss()
      }
      for (let i = 0; i < 5; i++) {
        try {
          let checkpoint
          const localStorageCpt = localStorage.getItem('cpt')

          if (localStorageCpt) {
            checkpoint = JSON.parse(localStorageCpt)
          }
          const result = await this.client.multipartUpload(
            'resume/' + item.file.name,
            item.file,
            {
              checkpoint,
              async progress(p, cpt) {
                item.onProgress({ percent: Math.floor(p * 100) })
                checkpoint = JSON.stringify(cpt)
                localStorage.setItem('cpt', JSON.stringify(cpt))
              }
            }
          )
          console.log(result)
          if (result.res.status === 200) {
            item.onSuccess()
          }
          break // 跳出当前循环。
        } catch (error) {
          console.log(error)
        }
      }
    },
    /*
     *    🌸 获取文件列表
     *    @params item 文件对象
     *    @params parallel 分片个数
     *    @params partSize 分片大小
     */
    getFileListOss: async function (): Promise<any> {
      try {
        if (!this.client) {
          console.log(123)
          await this.initOss()
        }
        console.log(this.client)

        const result = await this.client.list()
        console.log(result)
        this.list = result.objects
        return result
      } catch (e) {
        console.log(e)
      }
    },

    /*
     *    🌸 文件下载
     *    @params item 文件对象
     *    @params parallel 分片个数
     *    @params partSize 分片大小
     */
    getFileOss: async function (filename): Promise<any> {
      try {
        if (!this.client) {
          this.client = this.initOss()
        }
        const list = await this.getFileListOss()
        console.log(list)

        const response = {
          'content-disposition': `attachment; filename=${encodeURIComponent(
            filename
          )}`
        }

        const result = await this.client.signatureUrl(filename, { response })
        downloadFile(result, '1.jpg')
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
