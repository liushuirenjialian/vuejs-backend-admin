<template>
  <section style="margin-top: 15px;padding-top: 15px" v-loading="loading">
    <el-form ref="agentCashInfo"
             :model="agentCashInfo"
             :rules="bankCardRules"
             label-width="180px"
             style="margin:20px;width:60%;min-width:600px;">

      <el-form-item label="提示">
        <el-input value="状态更改为'已付'将直接扣除代理佣金" disabled></el-input>
      </el-form-item>

      <el-form-item label="申请金额">
        <el-input v-model.number="agentCashInfo.cash_amount" disabled></el-input>
      </el-form-item>

      <el-form-item label="状态" required>
        <el-select v-model="agentCashInfo.cash_status">
          <el-option v-for="(item,idxxx) in statusOptions" :label="item" :value="idxxx" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手续费">
        <el-input v-model.number="agentCashInfo.fee" type="number"></el-input>
      </el-form-item>

      <el-form-item label="到账金额">
        <el-input :value="agentCashInfo.cash_amount - agentCashInfo.fee" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="银行卡+姓名+银行卡号"
          v-model="agentCashInfo.remark">
        </el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary"
                   :loading="btnloading"
                   @click.native.prevent="onSubmitAgentCashInfo">修改
        </el-button>
        <el-button @click.native.prevent="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

  </section>

</template>

<script>
  import {getAgentCashInfo, updateAgentCashInfo} from '../../api/agent';

  export default {
    data() {
      return {
        //1:已付,2:已申请3:已撤回,4:处理中,5:提现失败'
        statusOptions: [
          '请选择',//0,
          '已付',//1,
          '已申请',//2,
          '已撤回',//3,
          '处理中',//4
          '提现失败',//5

        ],
        bankCardRules: {

          bank_name: [
            {
              required: true,
              type: 'string',
              message: '请选择开户银行名称',
              trigger: 'blur'
            },
          ],
        },
        btnloading: false,
        agentCashInfo: {},
        loading: false,
      }
    },
    methods: {
      fetchClientagentCashInfo() {
        this.loading = true;
        getAgentCashInfo(this.$route.params).then(res => {
          this.agentCashInfo = res.data;

          if (res.data.cash_status == 1) {
            this.$notify({
              title: '充值已审核完成',
              message: '请不要重复审核导致导致错误!!!',
              type: 'error'
            });
            this.$router.go(-1);
          }


          this.loading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      onSubmitAgentCashInfo() {
        this.$refs.agentCashInfo.validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            updateAgentCashInfo(this.agentCashInfo).then(res => {
              this.ezNotifyAxiosThen(res);
              this.$router.go(-1);
            }).catch(error => this.ezNotifyAxiosCatch(error));
          }
        });
      },
    },
    mounted() {
      this.fetchClientagentCashInfo();
    }
  }
</script>

<style scoped>


</style>
