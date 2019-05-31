/**
 * Created by tmh on 2018/2/7.
 */
const Storage = localStorage
export default {
  hasStory () {
    return Storage !== undefined && Storage !== null
  },
  get (key) {
    if (!this.hasStory) return
    let a = Storage.getItem(key)
    let d = JSON.parse(a)
    return d
  },
  set (key, value) {
    if (!this.hasStory) return

    let val = JSON.stringify(value)
    Storage.setItem(key, val)
  },
  remove (key) {
    if (!this.hasStory) return
    Storage.removeItem(key)
  },
  clear () {
    if (!this.hasStory) return
    Storage.clear()
  }
}
