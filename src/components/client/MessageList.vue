<template>
  <div class="default-tab">
    <div class="searchgrid">

      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="手机号码">
        <input class="button" value=" 查询 " type="button" @click="fetchMessageList">
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <el-table :data="pagination.data"
                highlight-current-row
                v-loading="listLoading"
                style="width: 100%;">
        <el-table-column label="客户姓名" prop="client.real_name"></el-table-column>
        <el-table-column label="电话号码" prop="cellphone"></el-table-column>
        <el-table-column label="内容" prop="msg_content" min-width="160"></el-table-column>
        <el-table-column label="发送时间" prop="send_time"></el-table-column>
        <el-table-column label="代理商1" prop="relation.cust1" width="60"></el-table-column>
        <el-table-column label="代理商2" prop="relation.cust2" width="60"></el-table-column>
        <el-table-column label="代理商3" prop="relation.cust3" width="60"></el-table-column>
        <el-table-column label="代理商4" prop="relation.cust4" width="60"></el-table-column>
        <el-table-column label="代理商5" prop="relation.cust5" width="60"></el-table-column>

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
  import {getAgentMessageList} from '../../api/client';

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
        this.fetchMessageList();
      },
      //获取用户列表
      fetchMessageList() {
        let params = this.filters;
        this.listLoading = true;
        getAgentMessageList({params}).then((res) => {
          this.pagination = res.data;
          this.listLoading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.fetchMessageList();
      },
    },
    mounted() {
      this.fetchMessageList();
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

  .float_right {
    display: inline-block;
    float: right;
  }
</style>
