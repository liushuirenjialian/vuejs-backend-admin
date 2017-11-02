<template>
  <section style="margin-top: 15px;padding-top: 15px" v-loading="loading">

    <el-form ref="bankForm"
             :model="bankInfo"
             :rules="bankCardRules"
             label-width="180px"
             style="margin:20px;width:70%;min-width:600px;">

      <el-form-item label="说明">
        <el-input value="银行卡必须与合作商所签署合同上填写的一致，否则提现申请将不予审核通过;绑定后不支持修改" disabled></el-input>
      </el-form-item>


      <el-form-item label="接收验证码手机号">


        <el-input :value="bankInfo.phone" disabled>
          <el-button slot="append" @click.native.prevent="handleSendSms">发送验证码</el-button>

        </el-input>
      </el-form-item>


      <el-form-item label="短信验证码:" required prop="code">
        <el-input v-model.number="bankInfo.code" auto-complete="off" type="number"></el-input>
      </el-form-item>


      <el-form-item label="请选择开户银行" required prop="bank_name">
        <el-select v-model="bankInfo.bank_name" placeholder="请选择类型" filterable clearable>
          <el-option v-for="item in bankCardOptions" :label="item.bankName" :value="item.bankName" :key="item.bankCode"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开户姓名" required>
        <el-input v-model="bankInfo.bank_account_name" auto-complete="off" placeholder="提现银行卡姓名"></el-input>
      </el-form-item>
      <el-form-item label="开户支行" required>
        <el-input v-model="bankInfo.bank_branch" auto-complete="off" placeholder="格式：XX省XX市XX支行"></el-input>
      </el-form-item>
      <el-form-item label="15~19位银行卡号" required prop="bank_account">
        <el-input v-model="bankInfo.bank_account" auto-complete="off"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary"
                   @click.native.prevent="onSubmitBankCardEdit">
          修改
        </el-button>
        <el-button @click.native.prevent="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

  </section>


</template>

<script>
  import {agentBankCardSendSms, agentBankCardInfo, agentBankCardUpdate} from '../../api/agentBankCard';

  import {bankCardOptions, provinceCityDistrictCounty, patternBankCard, patternCellPhone} from '../../common/constData'


  import {getStorageUserInfo} from '../../common/tools'

  export default {
    data() {
      return {
        code: '',
        bankInfo: getStorageUserInfo().agent,
        bankCardOptions,
        provinceCityDistrictCounty,
        bankCardRules: {
          code: [
            {
              required: true,
              type: 'number',
              min: 1000,
              max: 9999,
              message: '请输入4位数字',
              trigger: 'blur'
            }
          ],
          open_province: [
            {
              required: true,
              type: 'string',
              message: '请选择开户银行名称',
              trigger: 'blur'
            },
          ],
          bank_name: [
            {
              required: true,
              type: 'string',
              message: '请选择开户银行名称',
              trigger: 'blur'
            },
          ],
          bank_account: [
            {
              required: true,
              type: 'string',
              message: '请输入正确的银行卡号',
              trigger: 'blur'
            },
            {
              type: 'string',
              pattern: patternBankCard,
              message: '请输入15~19位正确银行卡号',
              trigger: 'blur'
            }
          ],
        },
        selectedBankCardInfo: {},
        loading: false,
      }
    },
    methods: {
      fetchBankCardInfo() {
        this.loading = true;
        agentBankCardInfo(null).then(res => {
          this.bankInfo = res.data;
          this.loading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      onSubmitBankCardEdit() {
        this.$refs.bankForm.validate(valid => {
          if (valid) {
            agentBankCardUpdate(this.bankInfo).then(res => {
              this.ezNotifyAxiosThen(res);
              this.$router.go(-1);
            }).catch(error => this.ezNotifyAxiosCatch(error));
          }
        });
      },
      //发送验证码
      handleSendSms() {
        agentBankCardSendSms().then(res => {
          this.ezNotifyAxiosThen(res);
        }).catch(error => this.ezNotifyAxiosCatch(error));
      }
    },
    mounted() {
      this.fetchBankCardInfo();
    }
  }
</script>

<style scoped>


</style>
