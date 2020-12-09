<template>
  <div>
    <!--查询框begin-->
    <div class="div-style"
         style="height: 200px;">
      <el-form :model="form"
               ref="form"
               label-width="100px">
        <div style="text-align: left"><label>我的工时:</label></div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="工作日期:">
              <el-date-picker v-model="form.workDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="任务号:">
              <el-input type="text"
                        prefix-icon=""
                        v-model="form.taskNo"
                        placeholder="请输入任务号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务类型:">
              <el-select v-model="form.taskType"
                         style="width:100%"
                         placeholder="请输入任务类型">
                <el-option v-for="item in taskTypeOptions"
                           :key="item.taskType"
                           :label="item.taskType"
                           :value="item.taskValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="系统名称:">
              <el-input type="text"
                        prefix-icon=""
                        v-model="form.systemName"
                        placeholder="请输入系统名称"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-button type="primary"
                   round
                   @click="handleQuery()">查询结果</el-button>
        <el-button type="primary"
                   round
                   @click="handleReset()">重置查询</el-button>
        <el-button type='primary'
                   round
                   @click="handleAdDialog()">新增工时</el-button>
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
                         prop="workDay"
                         label="工作日期"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="userName"
                         label="姓名"
                         width="150">
        </el-table-column>

        <el-table-column fixed
                         prop="taskNo"
                         label="任务编号"
                         width="100">
        </el-table-column>
        <el-table-column fixed
                         prop="taskType"
                         label="任务类型"
                         width="120">
        </el-table-column>
        <el-table-column fixed
                         prop="actualEffort"
                         label="工时"
                         width="70">
        </el-table-column>
        <el-table-column fixed
                         prop="systemName"
                         label="系统名称"
                         width="200">
        </el-table-column>
        <el-table-column fixed
                         prop="timestamp"
                         label="提交日期"
                         width="160">
        </el-table-column>
        <el-table-column fixed
                         prop="remarks"
                         label="备注">
        </el-table-column>
        <el-table-column label="操作"
                         width="160">
          <template slot-scope="scope">
            <el-button size="mini"
                       type='primary'
                       @click="handleEditDialog(scope.$index, scope.row)">修改
            </el-button>
            <el-button size="mini"
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
    <!--显示内容 end-->

    <!-- 新增工时弹出编辑框 begin -->
    <el-dialog title="新增工时"
               :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="工作日期:"
                      :label-width="formLabelWidth">
          <div style="width: 220px;margin-left:0px">
            <el-date-picker v-model="addForm.workDay"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择工作日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="任务编号:"
                      :label-width="formLabelWidth">
          <el-select v-model="addForm.taskNo"
                     style="width:100%"
                     placeholder="请选择任务编号"
                     filterable>
            <el-option v-for="item in allticket"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实际工时(h):"
                      :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="addForm.actualEffort"
                    placeholder="请输入工时"
                    auto-complete="off"
                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="备注:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="8"
                    v-model="addForm.remarks"
                    placeholder="请输入备注内容"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style="text;text-align: center;">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleAddSave()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增工时编辑框 end -->

    <!-- 编辑工时弹出编辑框 begin -->
    <el-dialog title="更新工时"
               :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="工作日期:"
                      :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="editForm.workDay"
                    placeholder="请选择工作日期"
                    auto-complete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名:"
                      :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="editForm.userName"
                    placeholder="请选择用户名"
                    auto-complete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="任务编号:"
                      :label-width="formLabelWidth">
          <el-select v-model="editForm.taskNo"
                     style="width:100%"
                     placeholder="请输入任务编号"
                     filterable>
            <el-option v-for="item in allticket"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实际工时(h):"
                      :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="editForm.actualEffort"
                    placeholder="请输入工时"
                    auto-complete="off"
                    onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                    maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="备注:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="8"
                    v-model="editForm.remarks"
                    placeholder="请输入备注内容"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style="text;text-align: center;">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleEditSave()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑工时弹出编辑框 end -->
  </div>
</template>

<script>
import statusInfo from '@/data/task.json';


export default {
  name: 'Home',
  data () {
    return {
      messages: [],
      form: {
        workDay: '',
        taskNo: '',
        taskType: '',
        systemName: ''
      },

      /*分页数据*/
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      tableData: [],

      //taskNo list
      allticket: [],

      //taskType选项信息 
      taskTypeOptions: statusInfo.taskTypeList,


      /***编辑框 begin */
      dialogFormVisible: false,
      editForm: {
        workDay: '',
        userName: '',
        taskNo: '',
        actualEffort: 0,
        remarks: ''
      },
      formLabelWidth: '100px',
      /***编辑框 end */

      /***新增编辑框 begin */
      addDialogFormVisible: false,
      addForm: {
        workDay: '',
        taskNo: '',
        actualEffort: 0,
        remarks: ''
      },
      /***新增编辑框 end */


    }
  },

  // 页面初始化数据
  mounted: function () {
    this.handleQuery();
    this.ticketList();
  },
  methods: {
    // 设置每页显示条数
    handleSizeChange (val) {
      this.currentPage = 1;
      this.pageSize = val;
    },

    // 设置当前第几页
    handleCurrentChange (val) {
      this.currentPage = val;
    },

    // 查询
    handleQuery () {
      this.$post('/api/timeSheet/query-list', this.form)
        .then(res => {
          if (res.status == 'SUCCESS') {
            this.tableData = res.data;
          }
          this.messages = res.messages;
        })
    },

    // 重置查询
    handleReset () {
      this.form.taskNo = '';
      this.form.taskType = '';
      this.form.workDate = '';
      this.form.createdDate = ''
    },

    // 新增工时弹框
    handleAdDialog () {
      //清空新增addForm数据
      // this.addForm.workDay = '';
      // this.addForm.taskNo = '';
      // this.addForm.actualEffort = 0;
      // this.addForm.remarks = '';
      //显示新增工时弹框
      this.addDialogFormVisible = true;
    },

    //新增工时保存
    handleAddSave () {
      this.$post('/api/timeSheet/save', this.addForm)
        .then(res => {
          if (res.status == 'SUCCESS') {
            this.handleQuery();
          }
          this.addDialogFormVisible = false;
          this.messages = res.messages;
        })
    },


    // 编辑工时弹框
    handleEditDialog (indx, row) {
      this.dialogFormVisible = true;
      this.editForm = row;
    },

    //编辑工时保存
    handleEditSave () {
      this.editForm.userName = sessionStorage.getItem('username');
      this.$patch('/api/timeSheet/update', this.editForm)
        .then(res => {
          if (res.status == 'SUCCESS') {
            this.handleQuery();
          }
          this.dialogFormVisible = false;
          this.messages = res.messages;
        })
    },

    // 删除
    handleDelete (indx, row) {
      this.$confirm('确定要删除这条信息吗？', '警告提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
        center: true
      }).then(async () => {
        const delFormData = {
          'id': row.id,
        };
        this.$delete('/api/timeSheet/delete', delFormData)
          .then(res => {
            if (res.status == 'SUCCESS') {
              this.handleQuery();
            }
            this.messages = res.messages;
          })
      })
    },

    //加载all ticket list
    async ticketList () {
      this.$post('/api/task/query/all', this.form)
        .then(res => {
          if (res.status == 'SUCCESS') {
            res.data.forEach(element => {
              this.allticket.push({ name: element.taskNo, code: element.taskNo });
            })
          }
          this.messages = res.messages;
        })
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
