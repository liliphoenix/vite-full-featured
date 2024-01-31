// 🌸 messageBox导出方法
export interface useMessageType {
  info?: (content: string) => void
  warning?: (content: string) => void
  error?: (content: string) => void
  success?: (content: string) => void
}
export type useMessageFunType = () => void
