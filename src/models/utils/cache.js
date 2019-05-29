/**
 * Created by tmh on 2018/2/7.
 */
const Storage = localStorage
export default {
  get: function (key) {
    if (Storage !== undefined && Storage !== null) {
      let a = Storage.getItem(key)
      let d = JSON.parse(a)
      return d
    }
  },
  set: function (key, value) {
    if (Storage !== undefined && Storage !== null) {
      let val = JSON.stringify(value)
      Storage.setItem(key, val)
    }
  },
  remove: function (key) {
    if (Storage !== undefined && Storage !== null) {
      Storage.removeItem(key)
    }
  },
  clear: function () {
    Storage.clear()
  }
}
