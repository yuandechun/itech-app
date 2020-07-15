<template>
  <div id="app">
    <div :style="height">
      <el-container v-show="!isShow">
        <el-header>
          <!-- 导航栏 -->
          <v-header></v-header>
        </el-header>
        <el-main>
          <!-- Body -->
          <router-view></router-view>
        </el-main>
        <el-footer>
          <!-- 页脚 -->
          <v-footer></v-footer>
        </el-footer>
      </el-container>

      <!-- 登录,注册页面显示 -->
      <el-container v-if="isShow">
        <router-view></router-view>
      </el-container>
    </div>
  </div>
</template>


<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  data () {
    return {
      path: '',
      isShow: true,
      isShowList: ['/login', '/register', '/forgetPassword', '/page404'],
      height: {
        width: '100%',
        height: '',
        backguound: '#ccc',
      }
    }
  },

  created () {
    this.hh()
  },

  components: {
    'v-header': Header,
    'v-footer': Footer,
    //'v-aside': Aside,
  },

  //判断路由
  mounted: function () {
    if (this.isShowList.indexOf(this.$route.path) == -1) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
    this.path = this.$route.path;
  },

  //监听
  watch: {
    $route () {
      if (this.isShowList.indexOf(this.$route.path) == -1) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  },

  methods: {
    hh () {
      this.height.height = window.innerHeight - 63 + 'px';
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
html,
body {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  /*height: 100%;*/
}
.background-image {
  background: url("");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
</style>
