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
},

// -------------------------
{
  path: '/register',
  name: 'Register',
  // route level code-splitting
  // this generates a separate chunk (register.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
},{
  path: '/activity',
  name: 'Activity',
  // route level code-splitting
  // this generates a separate chunk (activity.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "activity" */ '../views/Activity.vue')
},{
  path:'/login',
  component: () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
},{
  path:'/payment',
  component: () => import(/* webpackChunkName: 'login' */ '../views/Payment.vue')
},
// -----------------------



] 

const router = new VueRouter({
  routes
})

export default router