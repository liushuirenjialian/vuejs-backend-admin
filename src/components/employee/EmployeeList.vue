<template>


  <div class="default-tab">
    <div class="searchgrid">

      <input value=" 新增 " type="button" class="text-left button float_left" @click="handleAddEmployeeOfThisAgent">
      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="ID/员工编号/手机号">
        <input class="button" value=" 查询 " type="button" @click="fetchEmployeeList">
      </div>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <el-table :data="pagination.data"
                v-loading="listLoading"
                style="width: 100%;">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="name" label="员工编号">
        </el-table-column>
        <el-table-column prop="employee_name" label="员工姓名">
        </el-table-column>
        <el-table-column prop="phone" label="员工电话">
        </el-table-column>

        <el-table-column label="天配">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,0)"></span>
          </template>
        </el-table-column>

        <el-table-column label="月配">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,1)"></span>
          </template>
        </el-table-column>

        <el-table-column label="提成">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,2)"></span>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template scope="scope">
            <span v-text="calculateEmployStatus(scope.row)"></span>
          </template>
        </el-table-column>

        <el-table-column prop="role.role_name" label="角色">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="mini" @click="handleEditEmployee(scope.row)" icon="edit" title="代理修改"></el-button>
            <el-button size="mini" @click="handlePlayAgent(scope.row)" title="扮演代理"><i class="fa fa-play-circle"></i></el-button>
          </template>
        </el-table-column>
      </el-table>


      <div class="pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="parseInt(pagination.per_page)"
          :total="pagination.total"
          style="float:right;">
        </el-pagination>
      </div>

    </div>
  </div>

</template>

<script>
  import {employeeList} from '../../api/employee';

  export default {
    data() {
      return {
        filters: {
          keyword: '',
          page: 1,
          size: 15,
          agent_id: 0,
        },
        pagination: {},
        listLoading: false,
      }
    },
    watch: {
      '$route': function (newRoute, oldRoute) {
        this.fetchEmployeeList();
      },
    },
    methods: {
      handlePageChange(clickPageIndex) {
        //分页页面发生改变
        this.filters.page = clickPageIndex;
        this.fetchEmployeeList();
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.fetchEmployeeList();
      },
      //获取用户列表
      fetchEmployeeList() {
        this.filters.agent_id = this.$route.query.agent_id;
        let params = this.filters;
        console.log(params)
        this.listLoading = true;
        employeeList({params}).then((res) => {
          this.pagination = res.data;
          this.listLoading = false;
        }).catch(error => {
          this.ezNotifyAxiosCatch(error)
        });
      },
      //计算状态
      calculateEmployStatus(row) {
        return row.is_forbid > 0 ? '禁用' : '正常';
      },
      //计算员工分成比例
      calculatePercentage(row, type) {
        let percentage = '';
        if (!row.percentages) {
          return percentage;
        }
        row.percentages.forEach(value => {
          if (value.type == type) {
            percentage = value.percentage
          }
        })
        return percentage;
      },
      //添加员工
      handleAddEmployeeOfThisAgent: function () {
        let query = this.$route.query;
        this.$router.push({path: '/employee/create', query});
      },
      //编辑员工
      handleEditEmployee: function (row) {
        this.$router.push({name: '员工修改', params: {id: row.id}});
      },
      //扮演员工
      handlePlayAgent: function (row) {
        this.$confirm('确认删除该记录吗? 删除代理延时一分钟消失', '提示', {
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        });
      },
    },
    mounted() {
      this.fetchEmployeeList();
    }
  }
</script>

<style scoped>

  input[type='text'] {
    height: 20px;
  }

  input[type='button'] {
    line-height: 19px;
  }

  input[type='submit'] {
    line-height: 24px;
  }

  .float_left {
    display: inline-block;
  }

  .float_right {
    display: inline-block;
    float: right;
  }
</style>
