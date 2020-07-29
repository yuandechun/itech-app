<template>

  <body id="poster">
    <el-form :model="registerForm"
             class="login-container"
             label-position="left"
             label-width="40px">
      <h3 class="login_title">系统注册</h3>
      <el-form-item label="用户">
        <el-input type="text"
                  prefix-icon="el-icon-user"
                  v-model="registerForm.userName"
                  auto-complete="off"
                  placeholder="请输入账号"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password"
                  prefix-icon="el-icon-key"
                  v-model="registerForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input type="email"
                  prefix-icon="el-icon-message"
                  v-model="registerForm.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="电话">
        <el-input type="phone"
                  prefix-icon="el-icon-mobile"
                  v-model="registerForm.phone"
                  placeholder="请输入电话"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary"
                   class="login-button-width"
                   v-on:click="register">注册账号</el-button>
        <el-button type="text">
          <router-link to="/login">登陆账号</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </body>
</template>


<script>
import router from '../router'

export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        messages: '',
        userName: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },

  methods: {
    // 注册
    register () {
      this.$post('/api/user/save', this.registerForm)
        .then(response => {
          this.messages = response.messages;
          router.push({ path: '/login' })
        })
    }
  }
}
</script>

<style scoped>
#poster {
  background: url("../assets/eva.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 120px auto;
  width: 30%;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-button-width {
  width: 100%;
}
</style>