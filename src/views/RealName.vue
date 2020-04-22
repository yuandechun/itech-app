<template>
  <div style="border: 1px solid #e6e6e6;">
    <div class="task-created-div-style">
      <div style="margin-bottom:5px;"><label>实名认证</label></div>
      <el-form :model="form">
        <el-form-item label="任务内容:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="8"
                    v-model="form.userName"
                    placeholder="请输入任务内容"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务类型:"
                      :label-width="formLabelWidth">
          <el-select v-model="form.taskType"
                     style="width:100%"
                     placeholder="请选择任务类型">
            <el-option label="Request"
                       value="Request"></el-option>
            <el-option label="Change Request"
                       value="CR"></el-option>
            <el-option label="Enhancement"
                       value="Enhancement"></el-option>
            <el-option label="Defect"
                       value="Defect"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统名称:"
                      :label-width="formLabelWidth">
          <el-select v-model="form.systemName"
                     style="width:100%"
                     placeholder="请选择系统名称">
            <el-option label="Seamless"
                       value="Seamless"></el-option>
            <el-option label="Saas"
                       value="Saas"></el-option>
            <el-option label="Pa Web"
                       value="PaWeb"></el-option>
            <el-option label="CIRC PAI"
                       value="CIRC PAI"></el-option>
            <el-option label="AML"
                       value="AML"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style="text">
        <el-button type="primary"
                   round
                   @click="handleSubmit()">创建任务</el-button>
        <el-button type="primary"
                   round
                   @click="handleReset()">重置内容</el-button>
      </div>
    </div>
    <!--查询框begin-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: 'admin',
        taskContent: '',
        taskType: 'Request',
        systemName: 'Seamless',
        estimatedEffort: 0,
        assignee: '',
      },
      formLabelWidth: '100px',
    }
  },
  methods: {
    // 新建任务
    handleSubmit () {
      this.$post('/api/task/save', this.form)
        .then(res => {
          if (res.status == 'SUCCESS') {
            this.handleReset();
          }
          this.messages = res.messages;
        })
    },

    // 重置内容
    handleReset () {
      this.form.taskSubject = '';
      this.form.taskContent = '';
      this.form.taskType = '';
      this.form.systemName = '';
      this.form.estimatedEffort = '';
      this.form.assignee = '';
    },

  }
}
</script>


<style>
/***div边框设置  border: 1px dashed #000;*/
.task-created-div-style {
  margin-top: 20px;
  /*border: 1px solid #e6e6e6;*/
  min-height: 590px;
  width: 70%;
  margin: 0 auto;
}
</style>
