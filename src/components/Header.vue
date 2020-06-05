<template>
  <el-menu router
           :default-active="$route.path"
           class="el-menu-style"
           mode="horizontal">
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="task">
      <template slot="title">
        <i class="el-icon-help"></i>
        <span slot="title">我的工作台</span>
      </template>
      <el-menu-item index="/task/cernter">我的任务</el-menu-item>
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

    <el-menu-item index="message">
      <i class="el-icon-bell"></i>
      <span slot="title">消息中心</span>
    </el-menu-item>

    <el-submenu index="language">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{$t('nav.language.name')}}</span>
      </template>
      <el-menu-item @click="handleChangeLanguage('translateCn')">{{$t('nav.language.lang.cn')}}</el-menu-item>
      <el-menu-item @click="handleChangeLanguage('translateEn')">{{$t('nav.language.lang.en')}}</el-menu-item>
    </el-submenu>

    <el-submenu index="logout"
                style="margin-left: 35%">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{userName}}</span>
      </template>
      <el-menu-item index=""><label @click="handleLogout()">注销登陆</label></el-menu-item>
    </el-submenu>

  </el-menu>
</template>


<script scoped>
import router from '../router'

export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      userName: localStorage.getItem('userName')
    };
  },

  methods: {
    //切换多语言
    handleChangeLanguage (val) {
      this.$i18n.locale = val;
    },

    // 注销登陆
    handleLogout () {
      //移除localStorage中的userName
      localStorage.removeItem('userName')
      router.push({ path: '/login', querry: { redirect: router.currentRoute.fullPath } })
    },
  }
}
</script>

<style scoped>
.el-menu-style {
}
</style>
