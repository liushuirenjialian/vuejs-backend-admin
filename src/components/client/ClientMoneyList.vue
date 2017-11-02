<template>
  <div class="default-tab">
    <div class="searchgrid">

      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="客户手机号/客户ID/客户姓名">
        <input class="button" value=" 查询 " type="button" @click="getClientAccounts">
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <!--列表-->
      <el-table :data="pagination.data"
                v-loading="loading"
                style="width: 100%;">
        <el-table-column prop="created_time" label="发生时间"></el-table-column>

        <el-table-column label="用户信息">
          <template scope="scp">
            {{scp.row.client.cellphone}}-{{scp.row.client.real_name}}
          </template>
        </el-table-column>
        <el-table-column label="业务名称">
          <template scope="scope">
            {{flowTypeOptions[scope.row.flow_type - 1]}}
          </template>
        </el-table-column>
        <el-table-column label="收入金额">
          <template scope="scp">
            <span v-if="scp.row.amount_of_account > 0" v-text="scp.row.amount_of_account"></span>

          </template>
        </el-table-column>
        <el-table-column label="支出金额">
          <template scope="scp">
            <span v-if="scp.row.amount_of_account < 0" v-text="-scp.row.amount_of_account"></span>
          </template>
        </el-table-column>
        <el-table-column label="剩余金额" prop="account_left">
        </el-table-column>
        <el-table-column label="备注" prop="remark" min-wdith="18em"></el-table-column>

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
  import {clientAccountList} from '../../api/client';

  export default {
    data() {
      return {
        flowTypeOptions: [
          '充值',//1
          '提现',//2
          '充值退回',//3
          '配资支出',//4
          '利息支出',//5
          '保证金支出',//6
          '利润提取',//7
          '配资撤回',//8
          '推广收益',//9
          '后台调整金额',//10
          '后台调调整充值'//11
        ],
        filters: {
          range: null,
          keyword: null,
          page: 1,
          size: 15,
        },
        pagination: {},
        loading: false,
      }
    },
    methods: {
      pageIndexChange(clickpage) {
        this.filters.page = clickpage;
        this.getClientAccounts();
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.getClientAccounts();

      },
      getClientAccounts() {

        let params = this.filters;
        this.loading = true;
        clientAccountList({params}).then(res => {
          this.pagination = res.data;
          this.loading = false;
        }).catch(error => {
          this.ezNotifyAxiosCatch(error);
          this.loading = false;
        });
      },
      flowTypeName(id) {
        return this.flowTypeOptions[id - 1];
      }
    },
    mounted() {
      this.getClientAccounts();
    },
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
