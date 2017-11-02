<template>
    <el-form :model="form"
         label-width="300px"
         @submit.prevent="onSubmit"
         ref="Form"
         v-loading="loading"
         label-position="right"
         style="margin:20px;"
        >

        <el-form-item label="股票代码" prop="stock_code">
            {{form.stock_code}}
        </el-form-item>

        <el-form-item label="股票名称" prop="stock_name">
            {{form.stock_name}}
        </el-form-item>

        <el-form-item label="停牌时间" prop="stock_name">
            {{form.trading_halt_time || '暂无'}}
        </el-form-item>

        <el-form-item label="复牌时间" prop="stock_name">
            {{form.resumption_time || '暂无'}}
        </el-form-item>

        <el-form-item label="停复牌状态" prop="stock_name">
            {{form.halt_status || '暂无'}}
        </el-form-item>

        <el-form-item label="除权除息公告日" prop="stock_name">
            {{form.announcement_day || '暂无'}}
        </el-form-item>

        <el-form-item label="股权登记日" prop="stock_name">
            {{form.record_date || '暂无'}}
        </el-form-item>

        <el-form-item label="除权除息日" prop="stock_name">
            {{form.ex_dividend_day || '暂无'}}
        </el-form-item>

        <el-form-item label="除权增股倍数" prop="stock_name">
            {{form.ex_rights_stock_times || '暂无'}}
        </el-form-item>

        <el-form-item label="除息金额" prop="stock_name">
            {{form.without_dividend || '暂无'}}
        </el-form-item>

        <el-form-item label="除权除息说明" prop="stock_name">
            {{form.description || '暂无'}}
        </el-form-item>

        <el-form-item label="平台股票最大买入金额" prop="max_buying_amount">
            <el-input size="small" v-model.number="form.max_buying_amount"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
            <el-input size="small" v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="平台股票最大买入金额是否跟随系统参数">
            <el-switch on-text="" off-text="" v-model="form.is_follow_param" :on-value="1" :off-value="0"></el-switch>
        </el-form-item>

        <el-form-item label="股票是否启用">
            <el-switch on-text="" off-text="" v-model="form.is_stock_enable" :on-value="1" :off-value="0"></el-switch>
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
    import {updateStockInfo,getStockInfo} from '../../../api/system';

    export default {
        data() {
            return {
                loading: false,
                //代理商基本信息
                form: {},
                formRule: {
                    stock_code: [
                        {required: true,message: '不能为空'},
                        {min: 1,max: 20,message: '股票代码为1到20个字'}
                    ],
                    stock_name: [
                        {required: true,message: '不能为空'},
                        {min: 1,max: 20,message: '股票名称为1到20个字'}
                    ],
                    stock_pingying: [
                        {required: true,message: '不能为空'},
                        {min: 1,max: 50,message: '股票拼音为1到50个字'}
                    ],
                    stock_industry: [
                        {required: true,message: '不能为空'},
                        {min: 1,max: 50,message: '股票所属行业为1到50个字'}
                    ],
                    max_buying_amount: [
                        {required: true,message: '不能为空'},
                        {min: 100,max: 10000000,type: 'number',message: '1：上证 2：深证'}
                    ],
                    remark: [
                        {min: 1,max: 100,message: '备注为1到100个字'}
                    ]
                },
                post_data:{
                    field:['id','stock_name','stock_code','stock_pingying','stock_industry','stock_category','max_buying_amount',
                        'is_follow_param','is_stock_enable','remark'
                    ]
                }
            }
        },
        created() {
            this.loading = true;
            getStockInfo(this.$route.params.id,this.post_data).then(res => {
                this.form = res.data;
                this.loading = false;
            }).catch(err => this.loading = false)
        },
        methods: {
            onSubmit() {
                this.$refs.Form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        updateStockInfo(this.$route.params.id,this.form).then((res) => {
                            this.$router.push({path: '/system/infos'});
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
