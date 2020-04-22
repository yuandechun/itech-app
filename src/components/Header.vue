<template>
  <el-menu router
           :default-active="$route.path"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="task">
      <template slot="title">
        <i class="el-icon-help"></i>
        <span slot="title">我的工作台</span>
      </template>
      <el-menu-item index="/task/cernter">任务中心</el-menu-item>
      <el-menu-item index="/task/created">新建任务</el-menu-item>
      <el-menu-item index="/task/timesheet">工时申报</el-menu-item>
      <el-submenu index="tool">
        <template slot="title">工具</template>
        <el-menu-item index="2-4-1">下载</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">
      <i class="el-icon-video-camera"></i>
      <span slot="title">监控中心</span>
    </el-menu-item>

    <el-submenu index="manage">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">管理中心</span>
      </template>
      <el-menu-item index="/manage/user">用户管理</el-menu-item>
      <el-menu-item index="/manage/authority">权限管理</el-menu-item>
      <el-menu-item index="/manage/realNameAuthentication">实名认证</el-menu-item>
    </el-submenu>

    <el-submenu index="5"
                class="header-menu-margin-left">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span slot="title">语言</span>
      </template>
      <el-menu-item index="5-1">中文</el-menu-item>
      <el-menu-item index="5-2">英文</el-menu-item>
    </el-submenu>

    <el-menu-item index="6">
      <i class="el-icon-bell"></i>
      <span slot="title">消息中心</span>
    </el-menu-item>

    <el-submenu index="logout">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">Admin</span>
      </template>
      <el-menu-item index=""><label @click="handleLogout()">注销登陆</label></el-menu-item>
    </el-submenu>

  </el-menu>
</template>


<script scoped>
import router from '../router'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect () {
    },

    // 注销登陆
    handleLogout () {
      router.push({ path: '/login', querry: { redirect: router.currentRoute.fullPath } })
    },
  }
}
</script>

<style scoped>
.header-menu-margin-left {
  margin-left: 38%;
}
</style>
