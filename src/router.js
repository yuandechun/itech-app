import Vue from 'vue'
import Router from 'vue-router'

//home
import home from '@/router/home'
//用户相关页面
import user from '@/router/user'
//error信息相关页面
import error from '@/router/error'


//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   routes: [
//     ...home,
//     ...user,
//     ...error
//   ]
// })


const router = new Router({
  mode: 'history',
  routes: [
    ...home,
    ...user,
    ...error
  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    let token = sessionStorage.getItem('Authorization');
    if (token === null || token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;

