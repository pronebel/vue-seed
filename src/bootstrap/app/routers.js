import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from 'flux'


Vue.use(VueRouter)

import routerCommom from '../../modules/fundament/common/routers/router'
import routerOauth from '../../modules/seed/oauth/routers/router'
import routerSeed from '../../modules/seed/demo/routers/router'



let defRouter = [
]

let routerMap = [
  ...routerCommom,
  ...routerOauth,
  ...routerSeed,
  ...defRouter
]

//  创建一个路由器实例
//  并且配置路由规则
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routerMap
})

let indexScrollTop = 0
router.beforeEach(function (to, from, next) {



  //loading.show('加载中...')

  if (to.path !== '/') {
    indexScrollTop = document.body.scrollTop
  }
  if ((to.matched.some(record => record.meta.requiresAuth))) {
    //if (!Auth.getToken()) {
      next({
        path: '/login'
      })
    //} else {
    //  setTimeout(next, 50)
    //}
  } else {
    setTimeout(next, 50)
  }
})

router.afterEach(route => {

  //loading.close()
  if (route.path !== '/') {
    document.body.scrollTop = 0
  } else {
    Vue.nextTick(() => {
      document.body.scrollTop = indexScrollTop
    })
  }
})

sync(store, router)

export default router
