import Login from '@/views/Login'
import Register from '@/views/Register'


//register and login page router
export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登陆页面'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册页面'
    }
  },
]