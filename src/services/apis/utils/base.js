import Vue from 'vue'
import Promise from 'promise'
import Cache from './cache'
import { METHOD, ContentType, GET_SYSTEM_INFO } from './config'


import {join as urlJoin} from 'nb-js/libs/url/join'


import { codeCheck } from './code'

let getApiUrl = (apiUrl, url) => {
  if (!apiUrl) {
    apiUrl = TAIP.domainPath
  }
  return urlJoin(apiUrl,TAIP.envPath,url);
}

/**
 * 获取header
 * @param userData
 * @returns {{}}
 */
export let getHeader = (userData) => {
  let headerConfig = {}
  if (userData) {
    if (userData.user && userData.user.id) {
      headerConfig['X-User-Id'] = userData.user.id
    }
    if (userData.token) {
      headerConfig['X-Token'] = userData.token
    }
  }
  return headerConfig
}

export let blocker = () => {
  Vue.http.interceptors.push({
    request: function (request) {
      return request
    },
    response: function (response) {
      return response
    }
  })
}

/**
 * 请求的队列
 * @type {{checkInQueue: ((p1:*)), remove: ((key))}}
 */
window.ajaxQueue = {

  checkInQueue: (key) => {
    window.ajaxQueueData = window.ajaxQueueData || {}
    let queue = window.ajaxQueueData
    if (!queue[key]) {  // not in
      queue[key] = 1
      return null
    } else {
      return new Promise(function (resolve, reject) {

      })
    }
  },
  remove (key) {
    window.ajaxQueueData = window.ajaxQueueData || {}
    delete window.ajaxQueueData[key]
  }
}

/**
 * http的封装
 * @param opts:{
 *
 *  cache:{       //cache不传则不开启
 *    exp:1,      //0 不开启
 *    read:-1,    //-1不开启
 *  }
 * }
 * @param parseFunc
 * @returns {*}
 */
export let createApi = (opts) => {

  let cachepattern = opts.cache

  let cacheKey = opts.cacheKey

  // 强制更新
  if (opts.update) {
    Cache.remove(cacheKey)
  }

  // 有缓存则返回缓存
  let cacheData = Cache.get(cacheKey)
  if (cacheData) {
    return cacheData
  }

  // 没有缓存则从服务器获取

  let checkQueue = window.ajaxQueue.checkInQueue(cacheKey)
  if (checkQueue) {
    return checkQueue
  }

  var headerConfig = {}
  // headerData['Content-Type']= 'multipart/form-data';//'application/octet-stream';
  if (opts.isStream) {
    headerConfig['Content-Type'] = undefined // 'application/octet-stream';
  } else {
    headerConfig['Content-Type'] = ContentType.RESTFUL
  }

  if (opts.headers) {
    for (let key in opts.headers) {
      headerConfig[key] = opts.headers[key]
    }
  }

  let options = {
    method: opts.method || 'GET',
    url: opts.url,
    params: opts.params || {},
    body: opts.data || {},
    headers: headerConfig,
    cache: false,
    timeout: 100000
    // withCredentials:true
  }


  let msgId = opts.data && opts.data['ControlInfo'] ? opts.data['ControlInfo']['msgId'] : null

  let loadingBar = opts.progress === undefined ? true : !!opts.progress
  let silent = opts.silent === undefined ? false : !!opts.silent

  if (loadingBar) {
    //AjaxLoading.show('加载中...')
  }

  var promise = new Promise(function (resolve, reject) {
    Vue.http(options).then(function (response) {
      let resp = response.data

      if (codeCheck.isSuccess(resp.errorValue)) {
        cachepattern && Cache.set(cacheKey, resp, cachepattern)
        window.ajaxQueue.remove(cacheKey)
        resolve(resp)
      } else {
        window.ajaxQueue.remove(cacheKey)


        if (codeCheck.isNoLogin(resp.errorValue)) {
          auth.clear()
          window.location.href = '#/login'
        } else {

          reject({response, msgId})
        }
      }

      if (loadingBar) {
        AjaxLoading.close()
      }
    }, function (response) {
      window.ajaxQueue.remove(cacheKey)

      let status = response.status;
      let bodyData = response.body || {}




      if (loadingBar) {
        AjaxLoading.close()
      }


      if(silent){
        reject({response, msgId})
        return;
      }


      if (status == '504') {
        //MessageBox.alert('网络连接超时')
      } else if (status == '401') {
        if(bodyData.errorValue=='2130'){
          //MessageBox.alert('没有查询权限')
          location.href='#/401'
        }else{
          auth.clear()
          //MessageBox.alert('请重新从微信菜单登录')
        }
      } else if (status == '500') {
        //MessageBox.alert('服务器报错,请联系系统管理员')
        reject({response, msgId})
      } else {
        reject({response, msgId})
      }
    })
  })

  return promise
}

/**
 * 获取缓存的KEY
 * @param url
 * @param data
 * @returns {*}
 */
let getCacheKey = (url, data) => {
  return url + JSON.stringify(data)
}

/**
 * 含有url参数的post方法
 * @param url
 * @param data
 * @param opts
 * @param urlParam
 * @returns {*}
 */
export let postWithUrlParam = (url, data = {}, opts = {}, urlParam) => {
  let requestUrl = getApiUrl(opts.apiUrl, url)
  console.log(requestUrl)
  let cacheKey = getCacheKey(url, data)
  opts.url = requestUrl
  opts.params = {
    token: auth.getToken(),
    ...urlParam
  }
  let systemData = GET_SYSTEM_INFO()
  opts.cacheKey = cacheKey
  opts.method = METHOD.POST
  opts.data = {
    ...data,
    ...systemData
  }
  return createApi(opts)
}
/**
 * http的GET请求
 * @param url
 * @param data
 * @param opts
 * @returns {*}
 */
export let get = (url, data = {}, opts = {}) => {

  let requestUrl = getApiUrl(opts.apiUrl, url)
  console.log(requestUrl)
  let cacheKey = getCacheKey(url, data)
  opts.url = requestUrl
  opts.cacheKey = cacheKey
  opts.method = METHOD.GET
  opts.params = {
    ...data,
    token: auth.getToken()
  }
  return createApi(opts)
}

/**
 * http的POST请求
 * @param url
 * @param data
 * @param opts
 * @returns {*}
 */
export let post = (url, data = {}, opts = {}) => {
  let requestUrl = getApiUrl(opts.apiUrl, url)
  console.log(requestUrl)
  let cacheKey = getCacheKey(url, data)
  opts.url = requestUrl
  opts.params = {
    token: auth.getToken()
  }
  opts.cacheKey = cacheKey
  opts.method = METHOD.POST
  let systemData = GET_SYSTEM_INFO()
  opts.data = {
    ...data,
    ...systemData
  }
  return createApi(opts)
}
