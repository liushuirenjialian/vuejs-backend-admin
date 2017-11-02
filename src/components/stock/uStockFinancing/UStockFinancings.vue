<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
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
                <input id="mobile" v-model="post_data.search.id" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:账户号码">
                <input id="mobile" v-model="post_data.has.client.search.cellphone" style="width:150px;height:25px;"
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
            <el-table-column prop="id" label="账户号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cust_id" label="客户id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.nick_name" label="客户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.cellphone" label="手机号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_product.product_name" label="产品名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="用户状态">
                <template scope="scope">
                    {{ getStatus(scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column prop="stock_finance_begin_time" label="配资日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_settleup" label="结算日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_fee.buy_commission_rate" label="交易佣金率" show-overflow-tooltip></el-table-column>
            <el-table-column label="起初金额">
                <template scope="scope">
                    {{ scope.row.init_caution_money+scope.row.post_finance_caution_money+
                    scope.row.post_add_caution_money+scope.row.current_finance_amount }}
                </template>
            </el-table-column>
            <el-table-column label="总资产" prop="total_assets" show-overflow-tooltip></el-table-column>
            <el-table-column label="可用额度" show-overflow-tooltip></el-table-column>
            <el-table-column label="证券市值" show-overflow-tooltip></el-table-column>
            <el-table-column label="盈亏金额" show-overflow-tooltip></el-table-column>
            <el-table-column label="借款金额" prop="current_finance_amount" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{path:'/stock/uStockFinancing/edit/'+scope.row.id}">
                    <el-button size="small" title="修改" icon="edit"></el-button>
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
    export default {
        data() {
            return {
                status_list: [{value: 1, label: '操盘中'}, {value: 2, label: '单向冻结'}, {value: 3, label: '双向冻结'}, {value: 4, label: '已结算'}],
                loading: false,
                forms:{},
                post_data:{
                    field:['id','cust_id','product_id','status','stock_finance_begin_time',
                        'init_caution_money','post_finance_caution_money','post_add_caution_money','current_finance_amount',
                        'stock_finance_settleup','0 as relation_id','0 as total_assets','available_amount'],
                    search:{
                        id: ''
                    },
                    where: {
                        status:''
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
                    stock_fee:{
                        field:['agent_id','buy_commission_rate']
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
                this.getList();
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
                      return '已结算';
                }
            },
            changeSelect: function(value){
                this.getList();
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
