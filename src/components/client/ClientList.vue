<template>
  <div class="default-tab">
    <section class="searchgrid row">

      <div class="col-md-4">
        <select class="select_option float_left" v-model="filters.agent_id" @change="fetchClientList" v-if="!isSystemAdmin">
          <option :value="null">--请选择代理商--</option>
          <option v-for="item in agentOptions" :key="item.id" :value="item.id" v-text="'『'+item.agent_level+'级』'+item.agent_name"></option>
        </select>
      </div>
      <div class="col-md-4 text-center">
          <span class="text-center" v-if="todayCount">
            今日新增会员数量{{todayCount}}人
          </span>
        <span>
            会员人数{{pagination.total}}人
          </span>
      </div>
      <div class="col-md-4">

        <div class="float_right">

          <input v-model="filters.fromDate" type="date" placeholder="请输入开始日期" class="input-date" hidden>
          <input v-model="filters.toDate" type="date" placeholder="请输入结束日期" class="input-date" hidden>

          <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="客户姓名/客户昵称/客户手机号">
          <input class="button" value=" 查询 " type="button" @click="fetchClientList">
        </div>

      </div>
      <div class="clearfix"></div>
    </section>
    <div class="tab-content default-tab" style="display: block;">
      <!--列表-->
      <el-table :data="pagination.data"
                v-loading="loading"
                style="width: 100%;">
        <el-table-column type="id" prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="real_name" label="真实姓名">
        </el-table-column>
        <el-table-column prop="cellphone" label="手机">
        </el-table-column>
        <el-table-column prop="nick_name" label="昵称">
        </el-table-column>
        <el-table-column prop="created_time" label="注册时间" min-width="120">
        </el-table-column>
        <el-table-column prop="reg_ip" label="注册IP">
        </el-table-column>
        <el-table-column prop="relation.direct_cust_id" label="推荐人ID">
        </el-table-column>
        <el-table-column prop="relation.direct_agent_id" label="代理ID">
        </el-table-column>
        <el-table-column prop="relation.direct_emp_id" label="员工ID">
        </el-table-column>

        <el-table-column label="操作" width="150" v-if="isSystemAdmin">
          <template scope="scope">
            <el-button size="mini" @click="segueToCleintEdit(scope.row)" icon="edit" title="代理修改"></el-button>
            <el-button size="mini" @click="segueToCleintSwap(scope.row)" title="修改客户归属关系"><i class="fa fa-exchange"></i></el-button>
            <el-button size="mini" @click="segueToCleintAccountAdjust(scope.row)" title="账户调整"><i class="fa fa-btc"></i></el-button>
            <el-button size="mini" @click="handleRechargeAudit(scope.row)" title="扮演用户"><i class="fa fa-play-circle"></i></el-button>
          </template>
        </el-table-column>
      </el-table>


      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
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
  import {clientList, clientUpdate, clientFlowAdd, agentEmployeeSelectorList} from '../../api/client';
  import {agentSelectorList} from '../../api/agent';
  import {getStorageUserInfo} from '../../common/tools'

  export default {
    data() {
      return {
        todayCount: 0,
        agentOptions: [],
        filters: {
          range: '',
          keyword: '',
          page: 1,
          size: 15,
          agent_id: null
        },
        selectedRow: {},
        pageIndex: 1,
        pagination: {},
        loading: false,
      }
    },

    methods: {
      fetchAgentSelectorList() {
        agentSelectorList().then(res => {
          this.agentOptions = res.data;
        })
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.fetchClientList();
      },
      handlePageChange(clickPageIndex) {
        //分页页面发生改变
        this.filters.page = clickPageIndex;
        this.fetchClientList();
      },
      //获取用户列表
      fetchClientList() {
        let params = this.filters;
        this.loading = true;
        clientList({params}).then((res) => {
          this.pagination = res.data.list;
          this.todayCount = res.data.todayCount;
          this.loading = false;
        }).catch(error => {
          this.loading = false;
          this.ezNotifyAxiosCatch(error)
        });
      },
      segueToCleintSwap: function (row) {
        let id = row.id;
        this.$router.push({name: '客户变更归属', params: {id}})
      },

      segueToCleintAccountAdjust: function (row) {
        let id = row.id;
        //客户变更归属
        this.$router.push({name: '调整客户余额', params: {id}})
      },

      segueToCleintEdit(row) {
        let id = row.id;
        this.$router.push({name: '客户修改', params: {id}})
      },

      handleRechargeAudit: function (row) {
        this.$router.push({name:'客户充值审核',params:{id:row.id}});
      },
    },
    mounted() {
      this.fetchClientList();
    },
    created() {
      this.fetchAgentSelectorList();
      this.user = getStorageUserInfo
    },
    computed: {
      isSystemAdmin() {
        let user = getStorageUserInfo();
        console.log(user);
        return user.role_id == 1;
      }
    }
  }
</script>

<style scoped>

  selector {
    height: 20px;
  }

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

  .select_option {
    line-height: 17px;
    height: 21px;
    width: 180px;
    padding-bottom: 3px;
    margin-top: 4px;
    margin-right: 8px;
    vertical-align: top;
  }

  .input-date {
    height: 20px;
    width: 120px;
    margin-top: 4px;
    margin-right: 8px;
    vertical-align: top;
  }
</style>
