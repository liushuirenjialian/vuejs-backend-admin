<template>
  <div class="default-tab">
    <div class="searchgrid">

      <select class="select_option float_left" v-model="filters.cash_status" @change="fetchAgentCashList">
        <option :value="null">请选择状态</option>
        <option v-for="(item,idx) in statusOptions" :key="item" :value="idx+1" v-text="item"></option>
      </select>

      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="代理商ID/代理商编号/代理商名称">
        <input class="button" value=" 查询 " type="button" @click="fetchAgentCashList">
      </div>
      <div class="clearfix"></div>
    </div>

    <el-row>
      <el-col :span="24">

        <el-table :data="pagination.data"
                  v-loading="listLoading"
                  style="width: 100%;">
          <el-table-column label="代理商编号" prop="agent.agent_number">
          </el-table-column>
          <el-table-column prop="created_time" label="申请时间">
          </el-table-column>

          <el-table-column label="可提现金额" prop="cashable_amount">
          </el-table-column>
          <el-table-column label="客户欠利息" prop="due_interest_amount">
          </el-table-column>
          <el-table-column label="穿仓金额" prop="stock_loss_amount">
          </el-table-column>


          <el-table-column prop="cash_amount" label="提现金额">
          </el-table-column>

          <el-table-column prop="fee" label="手续费">
          </el-table-column>
          <el-table-column prop="in_amount" label="实际金额">
          </el-table-column>


          <el-table-column label="状态">
            <template scope="scope">
              {{ statusOptions[scope.row.cash_status - 1] }}
            </template>
          </el-table-column>


          <el-table-column prop="remark" label="备注" min-width="180">
          </el-table-column>


          <el-table-column label="操作" min-width="50px" v-if="isUserSystemAdmin">
            <template scope="scope">
              <el-button size="mini" @click="$router.push({name:'代理提现审核',params:{id:scope.row.id}})" title="审核"><i class="fa fa-pencil"></i></el-button>
            </template>
          </el-table-column>


        </el-table>

      </el-col>
    </el-row>

    <!--列表-->

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
</template>

<script>
    import {getAgentCashList} from '../../api/agent';

    export default {
        data() {
            return {
              statusOptions: [
                '已付',//1,
                '已申请',//2,
                '已撤回',//3,
                '处理中',//4
                '提现失败',//5

              ],
              filters: {
                    keyword: '',
                    page: 1,
                    size: 15,
                cash_status: null,
                },
                pagination: {},
                listLoading: false,
            }
        },
        methods: {
            pageIndexChange(clickPageIndex) {
                //分页页面发生改变
                this.filters.page = clickPageIndex;
                this.fetchAgentCashList();
            },
            //后去
            fetchAgentCashList() {
                let params = this.filters;
                this.listLoading = true;
                getAgentCashList({params}).then((res) => {
                    this.pagination = res.data;
                    this.listLoading = false;
                }).catch(error => this.ezNotifyAxiosCatch(error));
            },
            handleSizeChange(size) {
                this.filters.size = size;
                this.filters.page = 1;
                this.fetchAgentCashList();
            },

        },
        mounted() {
            this.fetchAgentCashList();
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
    vertical-align: middle;
  }


</style>
