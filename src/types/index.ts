import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
export interface routeRaw extends RouteRecordRaw {
  path: string
  components?: Component
  children?: routeRaw[]
  meta?: metaRaw
  redirect?: string
}
export interface metaRaw {
  role: 0
}
