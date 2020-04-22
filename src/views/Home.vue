<template>
  <div>
    <!--查询框begin-->
    <div class="div-style" style="height: 200px;">
      <el-form :model="form" ref="form" label-width="100px">
        <div style="text-align: left"><label>工时查询:</label></div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名:">
              <el-input type="text"
                        prefix-icon="el-icon-user"
                        v-model="form.userName"
                        placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务号:">
              <el-input type="text"
                        prefix-icon="el-icon-user"
                        v-model="form.taskNo"
                        placeholder="请输入任务号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态:">
              <el-select v-model="form.status"
                         filterable
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期:">
            <el-date-picker
                        v-model="form.workDate"
                        type="date"
                        placeholder="选择日期">
           </el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" round>查询结果</el-button>
        <el-button type="primary" round>重置查询</el-button>
      </el-form>
    </div>
    <!--查询框begin-->


    <!--显示内容 begin-->
    <div class="div-style">
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                height="310"
                border
                style="width: 100%">
        <el-table-column fixed
                         prop="workDate"
                         label="时间"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="userName"
                         label="用户名"
                         width="120">
        </el-table-column>
        <el-table-column fixed
                         prop="taskNo"
                         label="任务编码"
                         width="120">
        </el-table-column>
        <el-table-column fixed
                         prop="taskSubject"
                         label="主题"
                         width="200">
        </el-table-column>
        <el-table-column fixed
                         prop="estimatedEffort"
                         label="预估工时"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="actualEffort"
                         label="实际工时"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="status"
                         label="状态"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="taskContent"
                         label="内容">
        </el-table-column>
        <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type='primary'
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
          </template>
        </el-table-column>
      </el-table>
       <!--分页begin-->
      <el-pagination align='center'
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="currentPage"
             :page-sizes="[1,5,10,20]"
             :page-size="pageSize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="tableData.length">
      </el-pagination>
       <!--分页end-->
    </div>
     <!--显示内容 begin-->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      /*分页数据*/
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      messages: [],
      form: {
        userName: '',
        taskNo:'',
        status: '',
        workDate:''
      },
      tableData: [{
        workDate: '2016-05-02',
        userName: '王小虎',
        taskNo: 'ITSR000001',
        taskSubject: '升级JDK 8为OpenJDK 11',
        taskContent: '将JDK 8升级以后的所有问题fix掉，然后完成回归测试。',
        estimatedEffort: 40,
        actualEffort: 0,
        status:'NotStart'
      },
      {
        workDate: '2016-05-02',
        userName: '李二牛',
        taskNo: 'ITSR000003',
        taskSubject: '升级JDK 8为OpenJDK 11',
        taskContent: '将JDK 8升级以后的所有问题fix掉，然后完成回归测试。',
        estimatedEffort: 40,
        actualEffort: 32,
        status:'InProgress'
      },
      {
        workDate: '2016-05-02',
        userName: '张小兔',
        taskNo: 'ITSR000003',
        taskSubject: '升级JDK 8为OpenJDK 11',
        taskContent: '将JDK 8升级以后的所有问题fix掉，然后完成回归测试。',
        estimatedEffort: 40,
        actualEffort: 40,
        status:'Closed'
      }],
      
       options: [{
          value: 'NotStart',
          label: 'NotStart'
        }, {
          value: 'InProgress',
          label: 'InProgress'
        }, {
          value: 'Closed',
          label: 'Closed'
        }, {
          value: 'ReOpen',
          label: 'ReOpen'
        }], 
    }
  },
  methods: {
    handleClick (row) {
      row;
    },
    //设置每页显示条数
    handleSizeChange(val) {
       this.currentPage = 1;
       this.pageSize = val;
   },
    //设置当前第几页
    handleCurrentChange(val) {
       this.currentPage = val;
   },
  },

}
</script>


<style>
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
/***div边框设置  border: 1px dashed #000;*/
.div-style {
  margin-top: 20px;
  border: 1px solid #e6e6e6;
}
</style>
