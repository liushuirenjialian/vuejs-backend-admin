<template>
  <div class="default-tab">
    <div class="searchgrid">

      <input value=" 新增 " type="button" class="text-left button float_left" @click="$router.push({name: '代理商创建'})">
      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="代理商/代理商编号/代理商ID">
        <input class="button" value=" 查询 " type="button" @click="getAgentListByPageAndName">
      </div>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <el-table :data="pagination.data"
                highlight-current-row
                v-loading="listLoading"
                style="width: 100%;">
        <el-table-column label="#" prop="id"></el-table-column>
        <el-table-column label="代理商编号" prop="agent_number"></el-table-column>
        <el-table-column label="名称">
          <template scope="scope">
            <router-link :to="{name:'下级代理列表',params:{agent_id:scope.row.id}}">{{scope.row.agent_name}}</router-link>

          </template>
        </el-table-column>
        <el-table-column label="域名">
          <template scope="scope">
            <span v-text="scope.row.info ? scope.row.info.web_domain : ''"></span>
          </template>
        </el-table-column>

        <el-table-column label="来源">
          <template scope="scope">
            <router-link v-if="scope.row.parent" :to="{name:'下级代理列表',params:{agent_id:scope.row.parent.id}}">{{scope.row.parent.agent_name}}</router-link>
          </template>
        </el-table-column>

        <el-table-column prop="owner_name" label="联系人">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>

        <el-table-column label="天配" width="45">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,0)"></span>
          </template>
        </el-table-column>

        <el-table-column label="月配" width="45">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,1)"></span>
          </template>
        </el-table-column>

        <el-table-column label="提成" width="45">
          <template scope="scope">
            <span v-text="calculatePercentage(scope.row,2)"></span>
          </template>
        </el-table-column>


        <el-table-column prop="agent_level" label="代理值" width="46">
        </el-table-column>

        <el-table-column label="状态" width="46">
          <template scope="scope">
            <span v-text="scope.row.is_locked ? '禁用' : '正常'"></span>
          </template>
        </el-table-column>


        <el-table-column prop="created_time" label="添加时间">
        </el-table-column>

        <el-table-column label="操作" min-width="150px">
          <template scope="scope">
            <el-button size="mini" @click="handleEmployeeList(scope.row)" title="员工管理"><i class="fa fa-user"></i></el-button>
            <el-button size="mini" @click="handleEditAgent(scope.row)" title="代理修改"><i class="fa fa-pencil"></i></el-button>
            <el-button size="mini" @click="handleAddChildAgent(scope.row)" title="添加代理"><i class="fa fa-plus-square"></i></el-button>
            <el-button size="mini" @click="handlePlayAgent(scope.row)" title="扮演代理"><i class="fa fa-play-circle"></i></el-button>
          </template>
        </el-table-column>
      </el-table>


      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pageIndexChange"
          :current-page="pagination.current_page"
          :page-sizes="[15, 30, 45, 60]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="parseInt(pagination.per_page)"
          :total="pagination.total"
          style="float:right;">
        </el-pagination>
      </div>

    </div>
  </div>

</template>

<script>
  import {agentList} from '../../api/agent';
  import {rolePlayIssueToken} from '../../api/user';

  export default {
    data() {
      return {
        filters: {
          keyword: '',
          page: 1,
          size: 15,
        },
        pagination: {},
        listLoading: false,
      }
    },
    methods: {
      pageIndexChange(clickPageIndex) {
        //分页页面发生改变
        this.filters.page = clickPageIndex;
        this.getAgentListByPageAndName();
      },
      //获取用户列表
      getAgentListByPageAndName() {
        let params = this.filters;
        this.listLoading = true;
        agentList({params}).then((res) => {
          this.pagination = res.data;
          this.listLoading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.getAgentListByPageAndName();
      },
      handleAddChildAgent: function (row) {

        let query = {parentId: row.id};
        this.$router.push({path: '/agent/create', query});
      },
      handleEmployeeList: function (row) {
        this.$router.push({name: '员工列表', query: {agent_id: row.id}})
      },
      handleEditAgent: function (row) {
        let id = row.id;
        this.$router.push({name: '代理商修改', params: {id}});
      },
      handlePlayAgent: function (row) {
        rolePlayIssueToken({agent_id: row.id}).then(res => {
          if (res.status) {
            let tokenx = res.data.accessToken;
            this.$router.push({path: '/agent', query: {tokenx}});
          }
        });
      },
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
      }
    },
    mounted() {
      this.getAgentListByPageAndName();
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
