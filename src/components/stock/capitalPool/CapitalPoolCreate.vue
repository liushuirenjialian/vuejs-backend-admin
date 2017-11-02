<template>
    <el-form :model="form"
             label-width="300px"
             @submit.prevent="onSubmit"
             ref="Form"
             v-loading="loading"
             label-position="right"
             style="margin:20px;"
            >

        <el-form-item label="资金池名称" prop="stock_code">
            <el-input size="small" v-model="form.capital_name"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit">
                立即创建
            </el-button>
            <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {storeCapitalPool} from '../../../api/stock';

    export default {
        data() {
            return {
                loading: false,
                form: {
                    capital_name:''
                },
                formRule: {
                    capital_name: [
                        {required: true,message: '不能为空'},
                        {min: 1,max: 20,message: '资金池名字为1到20个字'}
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.Form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        storeCapitalPool(this.form).then((res) => {
                            this.$router.push({path: '/stock/capitalPools'});
                            this.ezNotifyAxiosThen(res);
                            this.loading = false;
                        }).catch(error => this.ezNotifyAxiosCatch(error))
                    }
                });
            },
        }
    }
</script>
<style scoped>
    .el-input {
        width: 200px;
    }
</style>