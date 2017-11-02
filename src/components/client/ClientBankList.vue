<template>
  <section class="default-tab">
    <div class="searchgrid">

      <div class="float_right">
        <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text" placeholder="姓名/手机号/用户ID">
        <input class="button" value=" 查询 " type="button" @click="getBankCards">
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <!--列表-->
      <el-table :data="pagination.data"
                highlight-current-row
                v-loading="loading"
                style="width: 100%;">

        <el-table-column type="id" prop="cust_id" label="用户ID">
        </el-table-column>
        <el-table-column prop="client.real_name" label="客户姓名"></el-table-column>
        <el-table-column prop="client.cellphone" label="客户手机"></el-table-column>
        <el-table-column prop="bank_name" label="开户银行">
        </el-table-column>
        <el-table-column prop="open_bank" label="开户支行">
        </el-table-column>
        <el-table-column prop="bank_card" label="银行卡号">
        </el-table-column>
        <el-table-column prop="open_province" label="省份">
        </el-table-column>
        <el-table-column prop="open_district" label="市县">
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template scope="scope">
            <el-button size="mini" @click="segueToBankEdit(scope.row)" icon="edit" title="修改银行卡"></el-button>
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


  </section>


</template>

<script>
  import {bankCardList, bankCardUpdate} from '../../api/bankCard';
  import {bankCardOptions, provinceCityDistrictCounty, patternBankCard, patternCellPhone} from '../../common/constData'

  export default {
    data() {
      return {
        filters: {
          range: '',
          keyword: '',
          page: 1,
          agent_id: 0,
        },
        pagination: {},
        loading: false,
      }
    },
    methods: {
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.getBankCards();
      },
      pageIndexChange(clickPageIndex) {
        //分页页面发生改变
        this.filters.page = clickPageIndex;
        this.getBankCards();
      },
      //获取用户列表
      getBankCards() {
        let params = this.filters;
        this.loading = true;
        bankCardList({params}).then((res) => {
          this.pagination = res.data;
          this.loading = false;
        });
        //NProgress.start();
      },
      segueToBankEdit: function (row) {
        this.$router.push({name: '客户银行卡编辑', params: {id: row.id}})

      },


      onSubmitBankCardEdit() {
        this.$refs.bankForm.validate((valid) => {
          if (valid) {
            bankCardUpdate(this.selectedBankCardInfo).then((res) => {
              let type = res.status > 0 ? 'success' : 'warning';
              let title = res.msg;
              this.$emit('homeFlashMessage', {type, title});
              if (res.status > 0) {
                this.selectedBankCardInfo = res.data;
              }
            });
            this.dialogFormVisibleBankCardEdit = false
          }
        });
      },
    },
    mounted() {
      this.getBankCards();
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
