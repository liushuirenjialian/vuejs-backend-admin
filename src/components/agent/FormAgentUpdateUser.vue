<template>
    <el-form :model="user"
             label-width="180px"
             @submit.prevent="onSubmit"
             :rules="userRules"
             ref="userForm"
             style="margin:20px;width:60%;min-width:600px;">

        <el-form-item label="登陆用户名">
            <el-input v-model.number="user.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
            <el-input v-model.number="user.employee_name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input v-model.number="user.phone" auto-complete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="新  密  码" required prop="password">
            <el-input v-model="user.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" required prop="confirm_password">
            <el-input v-model="user.confirm_password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click.native.prevent="submitUserForm">修改密码</el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {changeAgentAdminPassword} from '../../api/user';
    import {flashAxiosCatchError, flashAxiosThenMessage} from '../../common/tools'

    export default {
        data() {
            let passwordComfirmCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.user.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                userRules: {
                    password: [
                        {
                            required: true,
                            min: 6,
                            max: 20,
                            message: '密码最短6位,最长20位',
                            trigger: 'blur'
                        }
                    ],
                    confirm_password: [
                        {validator: passwordComfirmCheck, trigger: 'blur'}
                    ]
                },

            }
        },
        computed: {
            user: function () {
                return this.infoData.user ? this.infoData.user : {
                    name: '',
                    real_name: '',
                    phone: '',
                    password: '',
                    confirm_password: ''
                };
            }
        },
        methods: {
            //修改用户密码
            submitUserForm() {
                this.loading = true;
                changeAgentAdminPassword(this.user).then(res => {
                    this.loading = false;
                    this.ezNotifyAxiosThen(res);
                }).catch(error => this.ezNotifyAxiosCatch(error))
            },
        },
        props: ['agent_id', 'infoData']
    }


</script>


<style scoped>

</style>
