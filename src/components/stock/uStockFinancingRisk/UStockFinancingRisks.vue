<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
            <div style="width:100px;float:left;">
                <input class="button" value=" 手动刷新 " type="button" v-on:click="getList">
            </div>
            <div style="width:150px;float:left;">
                <el-select size="small" v-model="post_data.where.status" placeholder="用户状态筛选" clearable @change="changeSelect">
                    <el-option
                            v-for="item in status_list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="float: right;">
                <input v-model="post_data.search.id" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:账户号码">
                <input v-model="post_data.has.client.search.cellphone" style="width:150px;height:25px;"
                                    value="" maxlength="10" type="text" placeholder="搜索:手机号">
                <input class="button" value=" 查询 " type="button" v-on:click="search">
            </div>
            <div style="clear:both"></div>
        </div>

        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;">
            <el-table-column prop="id" label="账户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cust_id" label="客户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.nick_name" label="客户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.cellphone" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_product.product_name" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="保证金">
                <template scope="scope">
                    {{ scope.row.init_caution_money+scope.row.post_finance_caution_money+scope.row.post_add_caution_money }}
                </template>
            </el-table-column>
            <el-table-column label="借款额" prop="current_finance_amount" show-overflow-tooltip></el-table-column>
            <el-table-column label="可用余额" prop="available_amount" show-overflow-tooltip></el-table-column>
            <el-table-column label="冻结金额">
                <template scope="scope">
                    {{ scope.row.freeze_buying_money+scope.row.freeze_charge_money }}
                </template>
            </el-table-column>

            <el-table-column label="净资产" show-overflow-tooltip></el-table-column>
            <el-table-column label="总资产" prop="total_assets" show-overflow-tooltip></el-table-column>
            <el-table-column label="证券市值" show-overflow-tooltip></el-table-column>
            <el-table-column label="盈亏额" show-overflow-tooltip></el-table-column>
            <el-table-column label="持仓率" show-overflow-tooltip></el-table-column>
            <el-table-column label="预警线差额" show-overflow-tooltip></el-table-column>
            <el-table-column label="平仓线差额" show-overflow-tooltip></el-table-column>
            <el-table-column label="风控提示" show-overflow-tooltip></el-table-column>

            <el-table-column prop="status" label="用户状态">
                <template scope="scope">
                    {{ getStatus(scope.row.status) }}
                </template>
            </el-table-column>

            <el-table-column label="操作" min-width="200">
                <template scope="scope">
                    <a href="javascript:void(0);">交易查询</a>
                    <a href="javascript:void(0);" @click="doEveningUp(scope.row.id)">一键平仓</a>
                    <router-link :to="{path:'/stock/uStockFinanceHoldings/stock_finance_id/'+scope.row.id}">
                        分笔平仓
                    </router-link>
                    <router-link :to="{path:'/stock/uStockFinancing/edit/'+scope.row.id}">
                        修改
                    </router-link>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <div class="pagination">
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @size-change="changeSize"
                    @current-change="pageChange"
                    :current-page="post_data.offset/post_data.limit+1"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="post_data.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="forms.count"
                    style="float:left;">
            </el-pagination>
        </el-col>
        </div>
    </section>
</template>


<script type="text/ecmascript-6">
    import {getUStockFinancings} from '../../../api/stock';
    import {eveningUp} from '../../../api/java';
    export default {
        data() {
            return {
                status_list: [{value: 1, label: '操盘中'}, {value: 2, label: '单向冻结'}, {value: 3, label: '双向冻结'}],
                loading: false,
                forms:{},
                post_data:{
                    field: ['id', 'cust_id', 'status', 'product_id', 'freeze_buying_money', 'freeze_charge_money',
                        'init_caution_money','post_finance_caution_money','post_add_caution_money','current_finance_amount',
                        '0 as total_assets','available_amount'],
                    search:{
                        id: ''
                    },
                    where: {
                        status: ''
                    },
                    where_in: {
                        status: [1, 2, 3]
                    },
                    count:true,
                    offset:0,
                    limit: 15,
                    stock_finance_product:{
                        field:['id','product_name']
                    },
                    client:{
                        field:['id','nick_name','cellphone']
                    },
                    has:{
                        client:{
                            search:{
                                cellphone:''
                            }
                        }
                    }
                }
            }
        },
        created(){
            this.getList();
        },
        methods: {
            getList: function(){
                this.loading = true;
                getUStockFinancings(this.post_data).then(res => {
                    this.forms = res.data;
                    this.loading = false;
                }).catch(err => this.loading = false)
            },
            pageChange: function (index) {
                this.post_data.offset = (index-1)*this.post_data.limit;
                this.getList();
            },
            changeSize: function (num) {
                this.post_data.offset = 0;
                this.post_data.limit = num;
                this.getList();
            },
            search: function () {
                this.post_data.offset = 0;
                this.getList(88);
            },
            getStatus(status){
                switch(status)
                {
                    case 1:
                      return '操盘中';
                    case 2:
                      return '单向冻结';
                    case 3:
                      return '双向冻结';
                    default:
                        return '未知';
                }
            },
            changeSelect: function(value){
                this.getList();
            },
            doEveningUp: function ($id) {
                this.$confirm('确认要一键平仓吗?' , '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    eveningUp({id:$id}).then((res) => {
                        this.ezNotifyAxiosThen(res);
                        this.loading = false;
                    }).catch(error => this.ezNotifyAxiosCatch(error));
                }).catch(() => {
                });
            }
        }
    }
</script>

<style>
    .el-select-dropdown__item {
        font-size:10px;
    }
    .el-input--small .el-input__inner{
        height:25px;
        font-size:10px;
    }
</style>
