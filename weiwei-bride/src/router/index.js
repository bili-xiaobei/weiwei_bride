import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home,
  redirect: '/index',
  children: [{
    path: '/index',
    component: () => import( /* webpackChunkName:'index' */ '../views/Index.vue')
  }]
}, {
  path: '/banner_goods/:id',
  component: () => import( /* webpackChunkName: 'banner_goods' */ '../views/BannerGood.vue')
}] 

const router = new VueRouter({
  routes
})

export default router