<template>
    <el-form :model="form"
             label-width="300px"
             @submit.prevent="onSubmit"
             ref="Form"
             v-loading="loading"
             label-position="right"
             style="margin:20px;"
            >

        <el-form-item label="账户号码" prop="id">
            {{ form.id }}
        </el-form-item>

        <el-form-item label="客户姓名" prop="client.nick_name">
            {{ form.client.nick_name}}
        </el-form-item>

        <el-form-item label="资金池" prop="capital_pool_id">
            <el-select size="small" v-model.number="form.capital_pool_id" clearable placeholder="请选择">
                <el-option
                    v-for="item in capitalPools"
                    :key="item.id"
                    :label="item.capital_name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="用户状态" prop="status">
            <el-select size="small" v-model.number="form.status" clearable placeholder="请选择">
                <el-option
                    v-for="item in status_list"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="预警线" prop="precautious_line_amount">
            <el-input size="small" v-model="form.precautious_line_amount"></el-input>
        </el-form-item>
        <el-form-item label="平仓线" prop="liiquidation_line_amount">
            <el-input size="small" v-model="form.liiquidation_line_amount"></el-input>
        </el-form-item>
        <el-form-item label="配资日期" prop="stock_finance_begin_time">
            {{ form.stock_finance_begin_time }}
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit">
                立即修改
            </el-button>
            <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {updateUStockFinancing,getUStockFinancing,getCapitalPools} from '../../../api/stock';

    export default {
        data() {
            return {
                status_list:[{'key':'操盘中','value':1},{'key':'单向冻结','value':2},{'key':'双向冻结','value':3},{'key':'已结算','value':4}],
                loading: false,
                //代理商基本信息
                form: {client:{nick_name:''}},
                post_data: {
                    field:['id','capital_pool_id','status','precautious_line_amount',
                        'cust_id','liiquidation_line_amount','stock_finance_begin_time'],
                    client:{
                        field:['id','nick_name']
                    }
                },
                capitalPools:{}
            }
        },
        created() {
            this.loading = true;
            getUStockFinancing(this.$route.params.id,this.post_data).then(res => {
                this.form = res.data;
                this.form.passwordCheck=this.form.password;
                this.form.communication_pwCheck=this.form.communication_pw;
                this.loading = false;
            }).catch(err => this.loading = false);

            let capitalPoolPostData={
                field:['id','capital_name']
            }
            this.loading = true;
            getCapitalPools(capitalPoolPostData).then(res => {
                this.capitalPools = res.data.list;
                this.loading = false;
            }).catch(err => this.loading = false);
        },
        methods: {
            onSubmit() {
                this.$refs.Form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        delete this.form.client;delete this.form.id;
                        updateUStockFinancing(this.$route.params.id,this.form).then((res) => {
                            this.$router.push({path: '/stock/uStockFinancings'});
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
    .el-select {
        width: 200px;
    }
</style>