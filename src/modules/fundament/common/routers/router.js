const router = [

  {
    path: '/404',
    component: resolve => require(['../basic/404.vue'], resolve)
  },
  {
    path: '/401',
    component: resolve => require(['../basic/401.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }

]
export default router
