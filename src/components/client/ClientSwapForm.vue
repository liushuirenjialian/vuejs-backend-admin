<template>
  <!--更换客户归属-->
  <section style="width:100%; padding-top: 25px;margin-top: 15px" v-loading="loading">
    <el-form
      label-width="180px"
      @submit.prevent="onSubmitClientSwap"
      style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="更换代理商">
        <el-select v-model="form.swapAgentId"
                   placeholder="请选择">
          <el-option
            v-for="item in agentOptions"
            :key="item.id"
            :label="item.agent_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请选择代理的员工">
        <el-select v-model="form.swapEmployeeId"
                   clearable
                   placeholder="请选择">
          <el-option
            v-for="item in employeeListOptions"
            :key="item.id"
            :label="item.employee_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmitClientSwap" :loading="btnLoading">修改</el-button>
        <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
  import {agentEmployeeSelectorList, swapClientHeritRelation, clientInfo} from '../../api/client';

  export default {
    data() {
      return {
        clientInfo: {},
        form: {
          swapAgentId: null,
          swapEmployeeId: null,
          clientId: null,
          relationId: null,
        },
        loading: false,
        btnLoading: false,
        agentOptions: [],
        employeeListOptions: [],
      }
    },
    methods: {
      fetchClientInfo() {
        this.loading = true;
        clientInfo(this.$route.params).then(res => {
          this.clientInfo = res.data;
          this.loading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      fetchSwapHeritSelectorList() {
        agentEmployeeSelectorList().then(res => {
          this.agentOptions = res.data;
        });
      },
      onSubmitClientSwap() {
        this.btnLoading = true;
        swapClientHeritRelation(this.form).then(res => {
          this.ezNotifyAxiosThen(res);
          this.btnLoading = false;
        }).catch(error => {
          this.ezNotifyAxiosCatch(error)
        });
      },

    },
    watch: {
      clientInfo: function (newValue) {
        this.form.swapAgentId = newValue.relation.direct_agent_id;
        this.form.swapEmployeeId = newValue.relation.direct_emp_id;
        this.form.clientId = newValue.id;
        this.form.relationId = newValue.relation.id;
      },
      form: {
        handler(val) {
          //this.form.swapEmployeeId = 0;
          this.employeeListOptions = null;
          //根据选中的代理商来 更新下拉员工列表
          this.agentOptions.forEach(value => {
            if (value.id == val.swapAgentId) {
              this.employeeListOptions = value.employees;
            }
          })
        },
        deep: true
      }
    },
    created() {
      this.fetchSwapHeritSelectorList();
    },
    mounted() {
      this.fetchClientInfo();
    }
  }
</script>

<style scoped>


</style>
