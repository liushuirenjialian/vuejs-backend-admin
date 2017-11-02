<template>

  <!--<el-row>-->
  <!--<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>-->
  <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
  <section style="wid:100%;" v-loading="loading">
    <el-form ref="withdrawForm"
             :model="selectedWithdrawInfo"
             :rules="withdrawRules"
             style="margin:15px;padding-top: 15px; width:60%;min-width:600px;"
             label-width="180px">
      <el-form-item label="申请提现ID">
        <el-input v-model.number="selectedWithdrawInfo.id" auto-complete="off" type="number" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请提现金额">
        <el-input v-model.number="selectedWithdrawInfo.cash_amount" auto-complete="off" type="number" disabled></el-input>
      </el-form-item>
      <el-form-item label="手续费">
        <el-input v-model.number="selectedWithdrawInfo.fee" auto-complete="off" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" required prop="cash_status">
        <el-select v-model.number="selectedWithdrawInfo.cash_status" placeholder="请选择状态" clearable>
          <el-option v-for="(vvv,kkk) in auditOptions" :label="vvv" :value="kkk" :key="vvv"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到账金额">
        <el-input v-model.number="selectedWithdrawInfo.in_amount" auto-complete="off" type="number" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark" reqiured>

        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="selectedWithdrawInfo.remark">
        </el-input>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmitWithdrawEdit" :loading="btnloading">确定</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>

    </el-form>
  </section>
</template>

<script>
  import {withdrawInfo, withdrawUpdate} from '../../api/withdraw';

  export default {
    data() {
      return {
        btnloading: false,
        auditOptions: ['待审核', '待打款', '审核失败', '已打款', '撤销成功'],
        withdrawRules: {
          open_province: [
            {
              required: true,
              type: 'string',
              message: '请选择开户银行名称',
              trigger: 'blur'
            },
          ],
          cash_status: [
            {
              required: true,
              type: 'number',
              message: '请选择审核状态',
              trigger: 'blur'
            },
          ],
          bank_card: [
            {
              required: true,
              type: 'string',
              message: '请输入正确的银行卡号',
              trigger: 'blur'
            },

          ],
        },
        selectedWithdrawInfo: {},
        loading: false,
      }
    },
    methods: {

      //获取用户列表
      fetchWithdrawsInfo() {
        this.loading = true;
        let params = this.$route.params;
        withdrawInfo(params).then((res) => {
          this.selectedWithdrawInfo = res.data;
          this.loading = false;
        });
      },


      onSubmitWithdrawEdit() {
        this.$refs.withdrawForm.validate((valid) => {
          if (valid) {
            this.btnloading = true;
            withdrawUpdate(this.selectedWithdrawInfo).then(res => {
              this.ezNotifyAxiosThen(res);
              this.btnloading = false;
            }).catch(error => this.ezNotifyAxiosCatch(error));
          }
        });
      },

    },
    mounted() {
      this.fetchWithdrawsInfo();
    },
    watch: {
      selectedWithdrawInfo: {
        handler(val) {
          val.in_amount = val.cash_amount - val.fee;
        },
        deep: true
      }
    },

  }
</script>

<style scoped>


</style>
