<template>
  <el-form :model="form"
           label-width="180px"
           @submit.prevent="onSubmit"
           :rules="formRule"
           ref="agentForm"
           style="margin:20px;width:60%;min-width:600px;">

    <el-form-item
      label="所属代理"
      style="text-align: left!important;"
      prop="parent_id">
      <el-select
        style="width:360px"
        v-model.number="form.parent_id"
        filterable
        :loading="loading"
        placeholder="搜索:代理商名称,如果不选择:则为一级代理商">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.label"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="代理编号(登录账号)" required prop="name">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="登录密码" required prop="password">
      <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
    </el-form-item>
    <el-form-item label="重复密码" required prop="confirm_password">
      <el-input v-model="form.confirm_password" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="代理名称" required prop="agent_name">
      <el-input v-model.number="form.agent_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系姓名" required prop="owner_name">
      <el-input v-model="form.owner_name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="联系电话" required prop="phone">
      <el-input v-model="form.phone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="开户银行" required prop="bank_name">
      <el-input v-model="form.bank_name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="提现账号" required prop="bank_account">
      <el-input v-model="form.bank_account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="天配递延费提成" required prop="day_percentage">
      <el-input v-model.number="form.day_percentage" auto-complete="off" type="number" step="0.001"></el-input>
    </el-form-item>

    <el-form-item label="月配提成比例" required prop="month_percentage">
      <el-input v-model.number="form.month_percentage" auto-complete="off" type="number" step="0.001"></el-input>
    </el-form-item>

    <el-form-item label="服务费提成" required prop="commission_percentage">
      <el-input v-model.number="form.commission_percentage" auto-complete="off" type="number" step="0.001"></el-input>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="form.remark">
      </el-input>
    </el-form-item>


    <el-form-item label="配置选项">
      <el-checkbox v-model="form.is_independent" label="独立代理商" :true-label="1" :false-label="0"></el-checkbox>
      <el-checkbox v-model="form.is_forbid_cash" label="禁止提现" :true-label="1" :false-label="0"></el-checkbox>
      <el-checkbox v-model="form.is_lock_agent_cust" label="锁定代理商客户" :true-label="1" :false-label="0"></el-checkbox>
      <el-checkbox v-model="form.is_locked" label="禁用" :true-label=1 :false-label=0></el-checkbox>
    </el-form-item>


    <el-form-item>
      <el-button type="primary"
                 @click.native.prevent="onSubmit">
        立即创建
      </el-button>
      <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {agentSelectorList, agentCreate} from '../../api/agent';

  export default {
    data() {
      let passwordConfirmCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        selectorListData: [],
        loading: false,
        //代理商基本信息
        form: {
          parent_id: 1,
          name: 'guabao001',
          is_forbid_cash: 0,
          is_lock_agent_cust: 0,
          bank_name: '武汉市建设银行',
          bank_account: '1234560987654321',
          is_locked: 0,
          is_independent: 1,
          agent_name: '桥水资本有限责任公司',
          name: 'admin_991',
          owner_name: '李看看',
          phone: '18612345678',
          password: '123456',
          confirm_password: '123456',
          day_percentage: 0.34,
          month_percentage: 0.45,
          commission_percentage: 0.04,
          remark: '',
        },

        formRule: {
          //TODO:blur 提示失败,升级到高版本的element-ui 可以解决,只能提交的时候 提示
          parent_id: [
            {message: '请选择正确代理商ID', trigger: 'blur', type: 'number'}
          ],
          name: [
            {
              required: true,
              message: '登陆用户名/代理商编号必须为6~12位数字',
              min: 6,
              max: 12,
              trigger: 'blur'
            },
          ],
          agent_name: [
            {
              required: true,
              message: '请填写代理商名称4~20',
              min: 4,
              max: 20,
              trigger: 'blur'
            },
          ],
          owner_name: [
            {
              required: true,
              message: '经理姓名2~6个字符',
              trigger: 'blur'
            },
            {min: 2, max: 6, message: '姓名长度2~8个字符', trigger: 'blur'}

          ],
          phone: [
            {
              required: true,
              message: '手机号码是必填',
              trigger: 'blur'
            },
            {
              type: 'string',
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              message: '请输入正确手机号码',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 20,
              message: '密码最短6位,最长20位',
              trigger: 'blur'
            }
          ],
          confirm_password: [
            {validator: passwordConfirmCheck, trigger: 'blur'}
          ],
          bank_account: [
            {
              required: true,
              message: '请输入提现银行卡账号',
              trigger: 'blur'
            },
            {
              min: 15,
              max: 19,
              type: 'string',
              message: '请输入纯数字15~19位银行卡号',
              trigger: 'blur'
            }
          ],
          bank_name: [
            {
              required: true,
              message: '请输入提现银行卡开户行名称',
              trigger: 'blur'
            },
            {min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur'}
          ],
          day_percentage: [
            {
              min: 0,
              max: 0.999,
              type: 'number',
              message: '比例在0~0.999之间',
              trigger: 'blur'
            }

          ],
          month_percentage: [
            {
              min: 0,
              max: 0.999,
              type: 'number',
              message: '比例在0~0.999之间',
              trigger: 'blur'
            }

          ],
          commission_percentage: [
            {
              min: 0,
              max: 0.999,
              type: 'number',
              message: '比例在0~0.999之间',
              trigger: 'blur'
            }

          ],
        },


      }
    },
    created() {
      this.fetchAgentListData()
    },
    mounted() {
      let parent_id = this.$route.query.parentId;
      this.form.parent_id = parent_id ? parseInt(parent_id) : 1;
    },
    methods: {

      onSubmit() {
        this.loading = true;
        this.$refs.agentForm.validate((valid) => {
          if (valid) {
            agentCreate(this.form).then((res) => {
              this.loading = false;
              this.ezNotifyAxiosThen(res);
              if (res.status > 0) {
                this.$router.push({path: '/agent'});
              }
            }).catch(error => this.ezNotifyAxiosCatch(error))
          }
        });
      },
      fetchAgentListData() {
        agentSelectorList().then((res) => {
          this.selectorListData = res.data;
        });
      }
    },
    computed: {
      options: function () {

        return this.selectorListData.map(value => {
          let rObj = {};
          rObj.id = value.id;
          rObj.label = `『${value.agent_level}级』${value.agent_name}`;
          return rObj;
        });

      }
    }
  }


</script>

<style scoped>


</style>
