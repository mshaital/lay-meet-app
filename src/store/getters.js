/**
 * Created by Administrator on 2018/11/28.
 */
export const name = (state) => {
  return state.name
}

export const age = (state) => {
  return state.age
}

export const other = (state) => {
  return `My name is ${state.name}, I am ${state.age}.`
}

export const userInfo = (state) => {
  return state.userInfo
}

export const token = (state) => {
  return state.token
}
export const indexTab = (state) => {
  return state.indexTab
}
export const messageTab = (state) => {
  return state.messageTab
}
