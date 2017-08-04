import Promise from 'promise'
import { codeCheck } from './code'
import expireStore from 'utils/libs/store.expire'

/**
 缓存策略
 */
export default {

  remove (key) {
    expireStore.remove(key)
  },
  set (key, data, pattern) {
    expireStore.set(key, data, pattern)
  },

  get (key) {
    if (window.debug) {
      return null
    }

    let resData = expireStore.get(key)

    if (resData) {
      var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          if (codeCheck.isSuccess(resData.errorValue)) {
            console.log(resData)
            resolve(resData)
          } else {
            reject(resData)
          }
        }, 0)
      })
      return promise
    } else {
      return null
    }
  }
}
