import type { dataType } from '@/types/axios'
import { Request } from './request'

/* 

* @params Baseurl 
* @params timeout 延时
* @params  interceptors 传入的拦截器
* @params  useDefaultReq 是否使用默认的请求拦截器
* @params  interceptors 是否使用默认的相应拦截器
*/

const requestInt = new Request({
  baseURL: '/api',
  timeout: 3000
})
const request = (config): any => {
  return requestInt.request(config)
}

/* 
* get方法
* @params url 
* @params method 传入的参数
* @params params or query 传入的参数

*/

export const getList = (params = {}): dataType => {
  return request({
    url: '/mock/api/getList',
    method: 'get',
    params
  })
}

/* 
* post方法
* @params url 
* @params method 传入的参数
* @params params or query 传入的参数

*/

export const getNumberIP = (query = {}): dataType => {
  return request({
    url: '/teladress/teladress',
    method: 'post',
    query
  })
}
