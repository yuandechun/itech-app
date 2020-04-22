import Home from '@/views/Home'
import UserManage from '@/views/UserManage'
import TaskCreated from '@/views/TaskCreated'
import TaskCenterManage from '@/views/TaskCenterManage'
import RealNameAuthentication from '@/views/RealName'

//home page, router rules
export default [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/manage/user',
    name: 'userManage',
    component: UserManage,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/manage/realNameAuthentication',
    name: 'realNameAuthentication',
    component: RealNameAuthentication,
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/task/cernter',
    name: 'taskCenterManage',
    component: TaskCenterManage,
    meta: {
      title: '任务中心'
    }
  },
  {
    path: '/task/created',
    name: 'taskCreated',
    component: TaskCreated,
    meta: {
      title: '新建任务'
    }
  },
]