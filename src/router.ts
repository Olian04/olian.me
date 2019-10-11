import Vue from 'vue'
import Router from 'vue-router'
import ListView from './views/ListView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListView
    },
    {
      path: '/detail',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (detail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "detail" */ './views/DetailView.vue')
    }
  ]
})
