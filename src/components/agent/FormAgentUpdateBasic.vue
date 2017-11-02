<template>
    <el-form :model="basic"
             label-width="180px"
             @submit.prevent="onSubmit"
             :rules="basicRules"
             ref="basicForm"
             style="margin:20px;width:60%;min-width:600px;">

        <el-form-item label="父级代理商名称">
            <el-input v-model.number="parent_agent_name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!--<el-form-item label="代理商编号">-->
        <!--<el-input v-model.number="basic.agent_number" auto-complete="off" type="number" disabled></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="代理商名称" required prop="agent_name">
            <el-input v-model="basic.agent_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" required prop="owner_name">
            <el-input v-model="basic.owner_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="开户银行" required prop="bank_name">
            <el-input v-model="basic.bank_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现账号" required prop="bank_account">
            <el-input v-model="basic.bank_account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号码" required prop="phone">
            <el-input v-model="basic.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注">

            <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="basic.remark">
            </el-input>

        </el-form-item>
        <el-form-item label="配置选项">
            <el-checkbox v-model="basic.is_independent" label="独立代理商" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="basic.is_forbid_cash" label="禁止提现" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="basic.is_lock_agent_cust" label="锁定代理商客户" :true-label="1" :false-label="0"></el-checkbox>
            <el-checkbox v-model="basic.is_locked" label="禁用" :true-label=1 :false-label=0></el-checkbox>
        </el-form-item>


        <el-form-item>
            <el-button type="primary"
                       @click.native.prevent="submitBasicForm">
                修改基本信息
            </el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {agentChangeBasicInfo} from '../../api/agent';
    export default {
        data() {
            return {
                loading: false,
                basicRules: {
                    //TODO:blur 提示失败,升级到高版本的element-ui 可以解决,只能提交的时候 提示
                    parent_id: [
                        {required: true, message: '请选择活上级代理商', trigger: 'blur', type: 'number'}
                    ],
                    agent_name: [
                        {
                            required: true,
                            min: 3,
                            max: 20,
                            message: '请填写代理商名称3~20字符',
                            trigger: 'blur'
                        },
                    ],
                    agent_number: [
                        {
                            required: true,
                            type: 'number',
                            min: 100000,
                            max: 9999999,
                            message: '代理商编号必须为6~8位数字',
                            trigger: 'blur'
                        },
                    ],
                    owner_name: [
                        {
                            required: true,
                            min: 2,
                            max: 8,
                            message: '必填经理姓名2~8字符',
                            trigger: 'blur'
                        },
                    ],
                    phone: [

                        {
                            type: 'string',
                            required: true,
                            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                            message: '(必填)请输入正确手机号码',
                            trigger: 'blur'
                        }
                    ],

                    bank_account: [
                        {
                            min: 16,
                            max: 16,
                            required: true,
                            type: 'string',
                            message: '请输入纯数字16位银行卡号(必填)',
                            trigger: 'blur'
                        }
                    ],
                    bank_name: [
                        {
                            min: 3,
                            max: 20,
                            required: true,
                            message: '请输入提现银行卡账号,长度在 3 到 20个字符',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        computed: {
            basic: function () {
                let basic = this.infoData.basic;
                if (!basic) {
                    basic = {
                        id: 0,
                        parent_id: null,
                        is_forbid_cash: 0,
                        is_lock_agent_cust: 0,
                        bank_name: '',
                        agent_number: null,
                        bank_account: '',
                        is_locked: 0,
                        is_independent: 1,
                        name: '',
                        owner_name: '',
                        phone: '',
                        password: '',
                        confirm_password: '',
                        remark: '',
                    };
                }
                return basic;
            },
            parent_agent_name: function () {
                try {
                    return this.infoData.parent.agent_name;
                } catch (e) {
                    return '无父级代理商';
                }
            }
        },

        methods: {

            submitBasicForm() {
                this.loading = true;
                this.$refs.basicForm.validate((valid) => {
                    if (valid) {
                        agentChangeBasicInfo(this.basic).then(res => {
                            this.loading = false;
                            this.basic = res.data;
                            this.ezNotifyAxiosThen(res);
                        }).catch(error => this.ezNotifyAxiosCatch(error))
                    }
                });
            },
        },
        props: ['agent_id', 'infoData']
    }


</script>


<style scoped>

</style>
