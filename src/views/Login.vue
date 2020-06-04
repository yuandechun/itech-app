<template>
  <div class="login-div-css">
    <el-form :model="form"
             ref="form"
             label-width="100px">
      <el-form-item>
        <span class="login-title-css">登陆(Login)</span>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input type="text"
                  prefix-icon="el-icon-user"
                  v-model="form.userName"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password"
                  prefix-icon="el-icon-key"
                  v-model="form.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   class="login-button-width"
                   @click="onSubmit">
          登陆
        </el-button>
        <el-button type="text">
          <router-link to="/register">注册账号</router-link>
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      messages: [],
      form: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$post('/api/user/query', this.form)
        .then(res => {
          if (res.status == 'SUCCESS') {
            //设置userName到localStorage中
            localStorage.setItem('userName', res.data.userName)
            router.push({ path: '/home', querry: { redirect: router.currentRoute.fullPath } })
          } else {
            router.push({ path: '/page404' })
          }
        })
    }
  }
}
</script>

<style scoped>
.login-div-css {
  min-height: 460px;
  width: 30%;
  text-align: center;
  margin-left: 35%;
  margin-top: 10%;
}
.login-button-width {
  width: 100%;
}
.login-title-css {
  text-align: center;
  font-size: 20px;
}
</style>