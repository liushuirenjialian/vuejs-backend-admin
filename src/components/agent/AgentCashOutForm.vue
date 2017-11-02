<template>
  <el-form :model="form"
           label-width="180px"
           @submit.prevent="onSubmit"
           :rules="formRule"
           ref="agentForm"
           style="margin:20px;width:60%;min-width:600px;">

    <el-form-item label="名称">
      <el-input :value="form.agent_name" disabled></el-input>
    </el-form-item>
    <el-form-item label="归属代理">
      <el-input :value="form.parent_name" disabled></el-input>
    </el-form-item>
    <el-form-item label="代理商值">
      <el-input :value="form.agent_level" disabled></el-input>
    </el-form-item>


    <el-form-item label="递延费收益">
      <el-input :value="form.allInterest" disabled>
        <template slot="prepend">+</template>
      </el-input>
    </el-form-item>


    <el-form-item label="服务费收益">
      <el-input :value="form.manageFee" disabled>
        <template slot="prepend">+</template>

      </el-input>
    </el-form-item>

    <el-form-item label="用户欠费利息收益">
      <el-input :value="form.dueInterest" disabled>
        <template slot="prepend">-</template>

      </el-input>
    </el-form-item>
    <el-form-item label="用户穿仓成本">
      <el-input :value="form.lossAmount" disabled>
        <template slot="prepend">-</template>

      </el-input>
    </el-form-item>

    <el-form-item label="累计已提现金额">
      <el-input :value="form.totalCashedOutAmount" disabled>
        <template slot="prepend">-</template>
      </el-input>
    </el-form-item>

    <el-form-item label="可提现金额">
      <el-input :value="form.cashable_amount" disabled>
        <template slot="prepend">=</template>
      </el-input>
    </el-form-item>


    <el-form-item label="申请提现金额" required prop="cashOutAmount">
      <el-input v-model.number="form.cashOutAmount" type="number" min="0"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click.native.prevent="onSubmit">申请</el-button>
      <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {agentCashOutInfo, agentCashOutUpdate} from '../../api/agentCashOut';

  export default {
    data() {
      let cashOutAmoutCheck = (rule, value, callback) => {
        if (value > this.form.cashable_amount) {
          callback(new Error('输入金额不能超过可提现金额'));
        } else {
          callback();
        }
      };

      return {
        loading: false,
        //代理商基本信息
        form: {},
        formRule: {
          cashOutAmount: [
            {validator: cashOutAmoutCheck, trigger: 'blur'}
          ],
        },


      }
    },
    created() {
      this.fetchAgentCashOutInfo()
    },
    methods: {
      onSubmit() {
        this.loading = true;
        this.$refs.agentForm.validate(valid => {
          if (valid) {
            agentCashOutUpdate(this.form).then(res => {
              this.loading = false;
              this.ezNotifyAxiosThen(res);
              if (res.status > 0) {
                this.$router.push({name: '代理提现'});
              }
            }).catch(error => this.ezNotifyAxiosCatch(error))
          }
        });
      },
      fetchAgentCashOutInfo() {
        agentCashOutInfo().then((res) => {
          this.form = res.data;
        });
      }
    },
  }


</script>

<style scoped>


</style>
