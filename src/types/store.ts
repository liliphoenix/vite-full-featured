interface listObject {
  url: string
  name: string
}

export interface mainState {
  count: number
  name: string
  client: any
  list: listObject[]
}
