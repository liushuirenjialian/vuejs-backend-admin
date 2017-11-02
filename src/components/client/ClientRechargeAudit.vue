<template>
  <section style="margin-top: 15px;padding-top: 15px" v-loading="loading">
    <el-form ref="rechargeInfo"
             :model="rechargeInfo"
             :rules="bankCardRules"
             label-width="180px"
             style="margin:20px;width:60%;min-width:600px;">

      <el-form-item label="提示">
        <el-input value="状态更改为'充值成功'将直接改变会员相应余额" disabled></el-input>
      </el-form-item>
      <el-form-item label="充值来源">
        <el-select v-model="rechargeInfo.transfer_type" disabled>
          <el-option v-for="(item,idxxx) in transferTypeOptions" :label="item" :value="idxxx" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="充值金额">
        <el-input v-model.number="rechargeInfo.amount_of_account" disabled></el-input>
      </el-form-item>

      <el-form-item label="状态" required>
        <el-select v-model="rechargeInfo.status">
          <el-option v-for="(item,idxxx) in statusOptions" :label="item" :value="idxxx" :key="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手续费">
        <el-input v-model.number="rechargeInfo.fee" type="number"></el-input>
      </el-form-item>

      <el-form-item label="到账金额">
        <el-input :value="rechargeInfo.amount_of_account - rechargeInfo.fee" disabled></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="rechargeInfo.remark">
        </el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary"
                   :loading="btnloading"
                   @click.native.prevent="onSubmitClientRechargeInfo">修改
        </el-button>
        <el-button @click.native.prevent="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

  </section>

</template>

<script>
  import {updateClientRechargeInfo, getClientRechargeInfo} from '../../api/client';

  export default {
    data() {
      return {
        statusOptions: [
          '已提交',//0,
          '成功',//1,
          '失败',//2,
          '充值退回',//3,
          '处理中',//4
        ],
        transferTypeOptions: [
          'ATM',//0,
          '柜台',//1,
          '网银',//2,
          '手机银行',//3,
          '支付宝',//4,
          '其他',//5
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
        rechargeInfo: {},
        loading: false,
      }
    },
    methods: {
      fetchClientRechargeInfo() {
        this.loading = true;
        getClientRechargeInfo(this.$route.params).then(res => {
          this.rechargeInfo = res.data;

          if (res.data.status != 4) {
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
      onSubmitClientRechargeInfo() {
        this.$refs.rechargeInfo.validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            updateClientRechargeInfo(this.rechargeInfo).then(res => {
              this.ezNotifyAxiosThen(res);
              this.$router.go(-1);
            }).catch(error => this.ezNotifyAxiosCatch(error));
          }
        });
      },
    },
    mounted() {
      this.fetchClientRechargeInfo();
    }
  }
</script>

<style scoped>


</style>
