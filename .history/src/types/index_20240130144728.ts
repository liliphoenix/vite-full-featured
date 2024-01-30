import type { Component, ComponentCustomProperties } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
export type routeRaw = RouteRecordRaw & {
  path: string
  components?: Component
  children?: routeRaw[]
  meta?: metaRaw
  redirect?: string
}
export interface metaRaw {
  role: 0
}
export type getTokenFun = () => string | null

// 🌸 全局变量类型 自行添加的全局变量需要在这里添加key
interface globalPropertiesAdd {
  $isRole?: boolean
  $prefix?: string
}
export type globalProperties = ComponentCustomProperties & globalPropertiesAdd
