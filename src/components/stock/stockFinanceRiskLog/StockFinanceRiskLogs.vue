<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
            <div style="float: right;">
                <input v-model="post_data.has.client.search.cellphone" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:客户手机号">
                <input v-model="post_data.search.stock_finance_id" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:子账户ID">
                    <input class="button" value=" 查询 " type="button" v-on:click="search">
            </div>
            <div style="clear:both"></div>
        </div>

        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;">

            <el-table-column type="id" prop="id" label="ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_id" label="账户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cust_id" label="用户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.cellphone" label="用户电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="client.nick_name" label="用户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="risk_control_type" label="类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="risk_control_time" label="风控时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="风控详情" show-overflow-tooltip min-width="150px"></el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <a href="javascript:void(0);" @click="">交易查询</a>
                    <a href="javascript:void(0);" @click="">登陆前台</a>
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

<script>
    import {getStockFinanceRiskLogs} from '../../../api/stock';
    export default {
        data() {
            return {
                loading: false,
                forms:{},
                post_data:{
                    search:{
                        risk_control_type:''
                    },
                    count:true,
                    offset:0,
                    limit: 15,
                    client:{
                        field:['id','nick_name','cellphone']
                    },
                    has:{
                        'client':{
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
                getStockFinanceRiskLogs(this.post_data).then(res => {
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
            }
        }
    }
</script>

<style scoped>
</style>