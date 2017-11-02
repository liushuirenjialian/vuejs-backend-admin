<template>
    <el-form :model="form"
             label-width="180px"
             @submit.prevent="onSubmit"
             :rules="formRule"
             ref="employeForm"
             style="margin-top:15px;width:60%;min-width:600px; padding-top: 15px">

        <el-form-item label="员工编号(登录账号)" required prop="name">
          <el-input v-model.string="form.name" auto-complete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="登录密码" required prop="password">
            <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" required prop="confirm_password">
            <el-input v-model="form.confirm_password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="请选择角色" required prop="role_id">
            <el-select v-model.number="form.role_id" placeholder="请选择">
                <el-option
                        v-for="(value,key) in roleOptions"
                        :key="value"
                        :label="key"
                        :value="value">
                </el-option>
            </el-select>

        </el-form-item>


        <el-form-item label="员工姓名" required prop="employee_name">
            <el-input v-model="form.employee_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" required prop="phone">
            <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>

      <el-form-item label="email" prop="email">
            <el-input v-model="form.email" auto-complete="off" type="email"></el-input>
        </el-form-item>

        <el-form-item label="天配提成比例" required prop="day_percentage">
            <el-input v-model.number="form.day_percentage" auto-complete="off" type="number" step="0.001" min="0" max="0.999"></el-input>
        </el-form-item>

        <el-form-item label="月配提成比例" required prop="month_percentage">
            <el-input v-model.number="form.month_percentage" auto-complete="off" type="number" step="0.001" min="0" max="0.999"></el-input>
        </el-form-item>

        <el-form-item label="返佣提成比例" required prop="commission_percentage">
            <el-input v-model.number="form.commission_percentage" auto-complete="off" type="number" step="0.001" min="0" max="0.999"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">

            <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.remark">
            </el-input>

        </el-form-item>

        <el-form-item label="是否禁止">
            <el-switch on-text="" off-text="" v-model.number="form.is_forbid" on-value="1" off-value="0"></el-switch>
        </el-form-item>



        <el-form-item>
            <el-button type="primary"
                       @click.native.prevent="onSubmit">
              创建
            </el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {employeeCreate} from '../../api/employee';

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
                roleOptions: {
                    '系统管理员': 1,
                    '代理管理员': 2,
                    '代理商经理': 3,
                    '代理商销售': 4,
                    '代理商客服': 5,
                    '系统风控员': 6,
                    '代理风控员': 7,
                },
                loading: false,
                //代理商基本信息
                form: {
                    role_id: null,
                    agent_id: null,
                    employee_name: 'employee_001',
                    is_forbid: 0,
                    name: 'staff_123456',
                    employee_name: '李看看',
                    phone: '18612345678',
                    password: '123456',
                    confirm_password: '123456',
                    day_percentage: 0.12,
                    month_percentage: 0.13,
                    commission_percentage: 0.18,
                    remark: '',
                },

                formRule: {
                    //TODO:blur 提示失败,升级到高版本的element-ui 可以解决,只能提交的时候 提示
                    name: [
                        {
                            required: true,
                          message: '管理后台登陆名6~11位',
                            min: 6,
                          max: 11,
                            trigger: 'blur'
                        },
                    ],
                    email: [
                        {
                            type: 'email',
                            message: '请填写邮箱地址',
                            trigger: 'blur'
                        },
                    ],
                    role_id: [
                        {
                            type: 'number',
                            required: true,
                            message: '请选择角色',
                            trigger: 'blur'
                        },
                    ],
                    employee_name: [
                        {
                            required: true,
                            message: '员工真实姓名',
                            trigger: 'blur'
                        },
                        {min: 3, max: 6, message: '姓名长度2~8个字符', trigger: 'blur'}

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
        mounted() {
            try {
                this.form.agent_id = this.$route.query.agent_id;
            } catch (e) {
                console.log(e);
            }
        },
        methods: {
            onSubmit() {
                this.loading = true;
                this.$refs.employeForm.validate((valid) => {
                    if (valid) {
                        employeeCreate(this.form).then((res) => {
                            this.loading = false;
                            this.ezNotifyAxiosThen(res)
                            if (res.status > 0) {
                                let query = this.$route.query;
                                this.$router.push({path: '/employee', query});
                            }

                        }).catch((error) => {
                            this.ezNotifyAxiosCatch(error)
                        })

                    }
                });

            },

        }
    }
</script>
