<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
            <router-link :to="{path:'/stock/parentStockFinance/create'}">
                <input value=" 新增 " type="button" class="button">
            </router-link>
            <div style="float: right;">
                <input id="mobile" v-model="post_data.search.account" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:账户号">
                <input id="mobile" v-model="post_data.search.securities_trader" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:交易证券">
                <input class="button" value=" 查询 " type="button" v-on:click="search">
            </div>
            <div style="clear:both"></div>
        </div>

        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;">

            <el-table-column type="id" prop="id" label="账户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="account" label="账户号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="password" label="账户登陆密码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="communication_pw" label="账户通讯密码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="financier_name" label="客户姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="capital_id" label="所属资金池" show-overflow-tooltip></el-table-column>
            <el-table-column prop="total_in_capital" label="账户入金总额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="securities_trader" label="交易证券" show-overflow-tooltip></el-table-column>
            <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="current_total_capital" label="母账户总资金" show-overflow-tooltip></el-table-column>
            <el-table-column prop="securities_account_market_value" label="持仓市值" show-overflow-tooltip></el-table-column>
            <el-table-column prop="available_capital" label="可用余额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="freezn_capital" label="冻结资金" show-overflow-tooltip></el-table-column>
            <el-table-column prop="securities_account_remain" label="证券账户余额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="securities_account_available_remain" label="证券账户可用余额" show-overflow-tooltip min-width="100px"></el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{path:'/stock/parentStockFinance/edit/'+scope.row.id}">
                    修改
                    </router-link>
                    <a href="javascript:void(0);" @click="openModifyCapital(scope.row)">修改余额</a>
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

        <el-dialog
                title="修改余额"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false" top="150px">
            <el-form :model="form1">
                <el-form-item label="母账户信息" label-width="150px">
                    账户号: {{form1.account}}
                    <br/>
                    客户姓名: {{form1.financier_name}}
                    <br/>
                    交易证券: {{form1.securities_trader}}
                </el-form-item>
                <el-form-item label="可用余额" label-width="150px">
                    <el-input size="small" v-model="form1.available_capital" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doModifyCapital(form1)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    import {getParentStockFinances,updateParentStockFinance} from '../../../api/stock';
    export default {
        data() {
            return {
                loading: false,
                dialogVisible:false,
                forms:{},
                form1:{},
                post_data:{
                    field:['*','0 as current_total_capital'],
                    search:{
                        account:'',
                        securities_trader:''
                    },
                    count:true,
                    offset:0,
                    limit: 15
                }
            }
        },
        created(){
            this.getList();
        },
        methods: {
            getList: function(){
                this.loading = true;
                getParentStockFinances(this.post_data).then(res => {
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
            openModifyCapital: function (row) {
                this.dialogVisible = true;
                this.form1 = row;
            },
            doModifyCapital: function (row) {
                this.$confirm('确认要修改余额吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    updateParentStockFinance(row.id,{'available_capital':row.available_capital}).then((res) => {
                        this.ezNotifyAxiosThen(res);
                        this.getList();
                        this.loading = false;
                        this.dialogVisible = false;
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
    .v-modal {
        position: static;
    }
    .el-dialog--small {
        width: 30%
    }
    .el-input {
        width: 200px;
    }
</style>