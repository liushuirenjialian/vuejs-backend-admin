<template>
  <div class="default-tab">
    <div class="searchgrid">


      <select class="select_option float_left" v-model="filters.cash_status" @change="fetchWithdrawsList">
        <option :value="null">请选择状态</option>
        <option v-for="(item,idx) in auditOptions" :key="item" :value="idx" v-text="item"></option>
      </select>

      <div class="float_right">

        <input v-model="filters.fromDate" type="date" placeholder="请输入开始日期" class="input-date">
        <input v-model="filters.toDate" type="date" placeholder="请输入结束日期" class="input-date">

        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="代理商/代理商编号/代理商ID">
        <input class="button" value=" 查询 " type="button" @click="fetchWithdrawsList">
      </div>

    </div>
    <div class="tab-content default-tab" style="display: block;">
      <el-table :data="pagination.data"
                v-loading="loading"
                style="width: 100%;">

        <el-table-column prop="id" label="#">
        </el-table-column>
        <el-table-column label="申请用户" min-width="120">
          <template scope="scope">
            <span v-text="scope.row.client ? (scope.row.client.cellphone + scope.row.client.real_name) : ''"></span>
          </template>
        </el-table-column>


        <el-table-column prop="cash_amount" label="申请金额">
        </el-table-column>
        <el-table-column prop="fee" label="手续费">
        </el-table-column>
        <el-table-column prop="in_amount" label="到账金额">
        </el-table-column>
        <el-table-column label="收款信息" min-width="160">
          <template scope="scope">
            <span
              v-text="calculateColumnRecieverInfo(scope.row)"></span>
          </template>

        </el-table-column>
        <el-table-column prop="created_time" label="申请时间">
        </el-table-column>

        <el-table-column prop="updated_time" label="处理状态">
          <template scope="scope">
            {{auditOptions[scope.row.cash_status]}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template scope="scope">
            <el-button size="mini" @click="segueToAudit(scope.row)" title="审核处理"><i class="fa fa-pencil"></i></el-button>
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
    import {withdrawList, withdrawUpdate} from '../../api/withdraw';

    export default {
        data() {
            return {
              auditOptions: ['待审核', '待打款', '审核失败', '已打款', '撤销成功'],
                filters: {
                  fromDate: '',
                  toDate: '',
                    keyword: '',
                    size: 15,
                    page: 1,
                  agent_id: 0,
                  cash_status: null
                },
                pagination: {},
                loading: false,
            }
        },
        methods: {
            handleSizeChange(size) {
                this.filters.size = size;
                this.filters.page = 1;
                this.fetchWithdrawsList();
            },
            handlePageChange(clickPageIndex) {
                this.filters.page = clickPageIndex;
                this.fetchWithdrawsList();
            },
            //获取用户列表
            fetchWithdrawsList() {
                let params = this.filters;
                this.loading = true;
                withdrawList({params}).then((res) => {
                    this.pagination = res.data;
                    this.loading = false;
                });
            },
          //赚到审计页面
          segueToAudit: function (row) {
            this.$router.push({name: '客户提现审核', params: {id: row.id}})
            },
          calculateColumnRecieverInfo(row) {
            let stringInfo = row.client ? row.client.real_name : '';
            stringInfo += row.bankcard ? `-${row.bankcard.bank_name}-${row.bankcard.open_bank}-${row.bankcard.bank_card}` : `-${row.bank_card}`;
            return stringInfo;
          }
        },
        mounted() {
            this.fetchWithdrawsList();
        },
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
    vertical-align: middle;
  }

  .input-date {
    height: 20px;
    width: 120px;
    margin-top: 4px;
    margin-right: 8px;
    vertical-align: top;
  }
</style>
