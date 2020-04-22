<template>
  <div class="login-div-css">
    <el-form :model="form"
             ref="form"
             label-width="100px">
      <el-form-item>
        <span class="long-title-css">注册(Register)</span>
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

      <el-form-item label="邮箱">
        <el-input type="email"
                  prefix-icon="el-icon-message"
                  v-model="form.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="电话">
        <el-input type="phone"
                  prefix-icon="el-icon-mobile"
                  v-model="form.phone"
                  placeholder="请输入电话"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   class="login-button-width"
                   @click="onSubmit">
          注册
        </el-button>
        <el-button type="text">
          <router-link to="/login">登陆账号</router-link>
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
import router from '../router'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        messages: '',
        userName: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$post('/api/user/save', this.form)
        .then(response => {
          this.messages = response.messages;
          router.push({ path: '/login' })
        })
    }
  }
}
</script>

<style scoped>
.login-div-css {
  min-height: 480px;
  width: 30%;
  text-align: center;
  margin-left: 35%;
  margin-top: 8%;
}
.login-button-width {
  width: 100%;
}
.long-title-css {
  text-align: center;
  font-size: 20px;
}
</style>