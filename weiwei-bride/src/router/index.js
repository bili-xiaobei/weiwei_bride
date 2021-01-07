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
  component: () => import(/* webpackChunkName: "activity" */ '../views/Activity.vue')
},{
  path:'/login',
  component: () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
},{
  path:'/payment',
  component: () => import(/* webpackChunkName: 'login' */ '../views/Payment.vue')
},{
  path:'/strategy',
  component: () => import(/* webpackChunkName: 'strategy' */ '../views/Strategy.vue')
},{
  path:'/payment',
  component: () => import(/* webpackChunkName: 'payment' */ '../views/Payment.vue')
},{
  path:'/goods',
  component: () => import(/* webpackChunkName: 'goods' */ '../views/Goods.vue')
},{
  path:'/address',
  component: () => import(/* webpackChunkName: 'goods' */ '../views/Address.vue')
},
// -----------------------



] 

const router = new VueRouter({
  mode: 'history', // 解决 请求地址自动的添加 # 的问题  --  vue 路由默认是 hash，改成 history 模式
  routes
})

// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {

//     if(to.path == '/index' || to.path == '/strategy' || to.path ==  '/payment') return next();
//     // 获取 token 
//     let token = window.sessionStorage.getItem('token');
    
//     if(!token) return next('/login');
//     next();

// })





export default router