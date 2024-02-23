import type { useMessageFunType } from 'types/components'
import { getCurrentInstance } from 'vue'
import MessageBox from './MessageBox.vue'
// import { con } from 'vue'
export const useMessageFun: useMessageFunType = () => {
  console.log(new MessageBox())
  console.log(getCurrentInstance())
  // info: (content: string) => {
  //   msgContent.value = content
  //   isShowMsg.value = true
  // },
  // success: (content: string) => {
  //   msgContent.value = content
  //   isShowMsg.value = true
  // },
  // error: (content: string) => {
  //   msgContent.value = content
  //   isShowMsg.value = true
  // },
  // warning: (content: string) => {
  //   msgContent.value = content
  //   isShowMsg.value = true
  // }
}
