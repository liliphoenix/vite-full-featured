// 🌸 oss文件上传
import { initOssApi } from 'api/index'
import { downloadFile } from './index'
const OSS = require('ali-oss')

let client
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
    return client
  } catch (error) {
    console.log(error)
  }
}
/*
 *    🌸 普通上传
 *    @params item 文件对象
 */
export const uploadFileOss = async (item): Promise<any> => {
  try {
    const client = await initOss()
    const res = await client.put(
      `normal/${item.target.files[0].name}`,
      item.target.files[0]
    )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
/*
 *    🌸 分片上传
 *    @params item 文件对象
 *    @params parallel 分片个数
 *    @params partSize 分片大小
 */
export const MultipartUploadFileOss = async (
  item,
  parallel = 3,
  partSize = 1024 * 1024
): Promise<any> => {
  const client = await initOss()
  try {
    console.log(item)
    const res = await client.multipartUpload(
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
}
/*
 *    🌸 断点续传
 *    @params item 文件对象
 *    @params parallel 分片个数
 *    @params partSize 分片大小
 */

export const resumeUploadFileOss = async (item): Promise<any> => {
  const client = await initOss()

  for (let i = 0; i < 5; i++) {
    try {
      let checkpoint
      const localStorageCpt = localStorage.getItem('cpt')

      if (localStorageCpt) {
        checkpoint = JSON.parse(localStorageCpt)
      }
      const result = await client.multipartUpload(
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
}
// /*
//  *    🌸 流式上传
//  *    @params item 文件对象
//  */
// export const streamUploadFileOss = async (item): Promise<any> => {
//   const client = await initOss()
//   try {
//     console.log(item)
//     const stream = fs.createReadStream(item.file)
//     const res = await client.multipartUpload(
//       'stream/' + item.file.name,
//       stream,
//       {
//         progress: (p) => {
//           item.onProgress({ percent: Math.floor(p * 100) })
//         }
//       }
//     )
//     console.log(res)
//   } catch (error) {
//     console.log(error)
//   }
// }
/*
 *    🌸 获取文件列表
 *    @params item 文件对象
 *    @params parallel 分片个数
 *    @params partSize 分片大小
 */
export const getFileListOss = async (): Promise<any> => {
  try {
    const client = await initOss()
    const result = await client.list()
    console.log(result)

    return result
  } catch (e) {
    console.log(e)
  }
}

/*
 *    🌸 文件下载
 *    @params item 文件对象
 *    @params parallel 分片个数
 *    @params partSize 分片大小
 */
export const getFileOss = async (filename): Promise<any> => {
  try {
    const client = await initOss()
    const list = await getFileListOss()
    console.log(list)

    const response = {
      'content-disposition': `attachment; filename=${encodeURIComponent(
        filename
      )}`
    }

    const result = await client.signatureUrl(filename, { response })
    downloadFile(result, '1.jpg')
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}
