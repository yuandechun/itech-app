import Home from '@/views/Home'
import UserManage from '@/views/UserManage'
import TaskCreated from '@/views/task/TaskCreated'
import TaskCenterManage from '@/views/task/TaskCenterManage'
import TaskDetail from '@/views/task/TaskDetail'
import RealNameAuthentication from '@/views/RealName'
import VerifyIDCard from '@/views/idcard/VerifyIDCard'




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
    path: '/task',
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
  {
    path: '/task/detail',
    name: 'taskDetail',
    component: TaskDetail,
    meta: {
      title: '任务详细信息'
    }
  },
  {
    path: '/verify/idCard',
    name: 'verifyIDCard',
    component: VerifyIDCard,
    meta: {
      title: '验证身份证'
    }
  },
]