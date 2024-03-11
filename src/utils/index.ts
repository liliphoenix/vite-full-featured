import type { getTokenFun, globalProperties } from '@/types'
import { getCurrentInstance } from 'vue'
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
/**
 * 🌸 文件
 * @params url 文件下载地址
 * @params filename 文件名称
 */
export const downloadFile = (url, filename): void => {
  const element = document.createElement('a')
  element.setAttribute('href', url)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  element.click()
  console.log('下载成功')
}
// const jsDom = require("js-dom");
// const axios = require("axios");
/**
 * 获取url参数
 */
export const getUrlParam = (name): any => {
  const match = location.hash.match(/#[^?]+(\?.+)/)
  const url = (window.location.search || (match && match[1])) ?? ''
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = url.substr(url.indexOf('?') + 1).match(reg)
  return r != null ? r[2] : ''
}

// 13位时间戳格式转化为 yyyy/m/dd h:m Am
export const getDateTime = (timeStamp): string => {
  const date = new Date(timeStamp)

  const y = date.getFullYear()
  let minute: number | string = date.getMinutes()
  let m: number | string = date.getMonth() + 1
  let d: number | string = date.getDate()
  let h: number | string = date.getHours()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  minute = minute < 10 ? '0' + minute : minute
  const unit = h < 12 ? 'AM' : 'PM'
  h = h < 12 ? h : h - 12
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ' ' + unit
}
// id（hh.mm  dd/mm/yy）   eg:15.03  30/11/2021
// my (hh.mm  dd/mm/yy)    eg:15.03  30/11/2021
// ph（mm/dd/yy h:mm unit）  eg:11/30/2021  3:03pm
// za (hh:mm dd/mm/yyyy)   eg:15:03  30/11/2021
export const getDateTime1 = (timeStamp, country): string => {
  const date = new Date(timeStamp)
  const y = date.getFullYear()
  let minute: number | string = date.getMinutes()
  let m: number | string = date.getMonth() + 1
  let d: number | string = date.getDate()
  let h: number | string = date.getHours()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  const h2 = h < 12 ? h : h - 12
  minute = minute < 10 ? '0' + minute : minute
  const unit = h < 12 ? 'am' : 'pm'
  h = h < 10 ? '0' + h : h
  if (country === 'ph') {
    return `${m}/${d}/${y} ${h2}:${minute}${unit}`
  } else if (country === 'za') {
    return `${h}:${minute} ${d}/${m}/${y}`
  } else if (country === 'eg') {
    return `${d}/${m}/${y} ${h}:${minute}`
  } else {
    return `${h}.${minute} ${d}/${m}/${y}`
  }
}
// 🌸 动态外部js文件
export const dynamicLoadJs = (url, attrObj, insertEl): any => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    for (const key in attrObj) {
      script[key] = attrObj[key]
    }
    script.onload = () => {
      resolve('success')
    }
    script.onerror = () => {
      reject(new Error('error'))
    }
    script.src = url
    if (insertEl) {
      insertEl.appendChild(script)
    } else {
      document.body.appendChild(script)
    }
  })
}
// 🌸 获取uuid
export const getUUID = (): string => {
  return +new Date() + Math.random().toString(16).replace('.', '')
}

/**
 * 🌸 防抖函数
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export const debounce = (func, wait, immediate): any => {
  let timeout, args, context, timestamp, result

  const later = (): void => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 节流函数 每隔time执行一次函数
export const throttle = (fun, time = 100): any => {
  let base = 0
  return function (...args) {
    const now: number = +new Date()
    if (now - base > time) {
      base = now
      fun.apply(this, args)
    }
  }
}

/**
 * 动态添加css文件
 */
export const loadStyles = (url): void => {
  const link: HTMLLinkElement = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  document.getElementsByTagName('head')[0].appendChild(link)
}

export const getRandom = (min, max): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 🌸 代码延迟执行器
export const sleep = (time): any => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 🌸 毫秒值转换为hms
 * seconds:毫秒值 必填
 * type:modify 根据毫秒值自行匹配hms/dhm
 */
export const formatTimeMap = (seconds, type = 'modify'): any => {
  if (seconds < 0) return
  if (seconds > 3600 * 24 && type !== 'hms') {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor((seconds % 86400) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return { d, h, m }
  } else {
    // 🌸 超过24小时也要展示时分秒
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds / 60) % 60)
    const s = Math.floor(seconds % 60)
    return { h, m, s }
  }
}
export const stInterval = (fn, t): any => {
  let timer: any
  function interval(): void {
    fn()
    timer = setTimeout(interval, t)
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

// 替换字符串或数组中的内容
export const replaceString = (strs, target, value): any => {
  if (!strs || !target || !value) return
  if (Array.isArray(strs)) {
    return strs.map((item) => item.replace(new RegExp(target, 'g'), value))
  } else if (typeof strs === 'string') {
    return strs.replace(new RegExp(target, 'g'), value)
  }
}

// 根据链接动态设置页面背景
export const setDomBgColorByUrl = ({
  el = '',
  defaultBgColor = '',
  defaultBgStart = '',
  defaultBgEnd = ''
}): void => {
  const urlParams = new URLSearchParams(window.location.search)
  const bgColor = urlParams.get('bgColor')
  const bgStart = urlParams.get('bgStart')
  const bgEnd = urlParams.get('bgEnd')

  // console.log("bgColor", bgColor);
  // console.log("bgStart", bgStart);
  // console.log("bgEnd", bgEnd);

  let domEl
  if (el) {
    if (typeof el === 'string') {
      domEl = document.querySelector(el)
    } else {
      domEl = el
    }
  } else {
    domEl = document.querySelector('body')
  }

  // console.log("domEl", domEl);

  if (!domEl) return

  if (bgColor) {
    // console.log("111");
    domEl.style.backgroundColor = decodeURIComponent(bgColor)
  } else if (bgStart && bgEnd) {
    // console.log("222");
    domEl.style.background = `linear-gradient(${decodeURIComponent(bgStart)}, ${decodeURIComponent(bgEnd)})`
  }

  const isSetFromUrlParams = bgColor ?? (bgStart && bgEnd)
  // console.log("isSetFromUrlParams", isSetFromUrlParams);
  if (!isSetFromUrlParams) {
    // console.log(defaultBgColor);
    defaultBgColor && (domEl.style.backgroundColor = defaultBgColor)
    defaultBgStart &&
      defaultBgEnd &&
      (domEl.style.background = `linear-gradient(${defaultBgStart}, ${defaultBgEnd})`)
  }
}
