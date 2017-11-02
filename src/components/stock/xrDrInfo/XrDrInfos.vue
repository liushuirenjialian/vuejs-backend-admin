<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
            <div style="float: right;">
                <input id="mobile" v-model="post_data.search.stock_finance_id" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:子账户id">
                <input class="button" value=" 查询 " type="button" v-on:click="search">
            </div>
            <div style="clear:both"></div>
        </div>

        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;"
                  >
            <el-table-column type="id" prop="id" label="ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_id" label="子账户id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_finance_hold_id" label="子账户持仓id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="parent_stock_finance_id" label="母账户id" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_code" label="股票代码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_name" label="股票名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xr_dr_announcement" label="除权除息公告日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_right_regday" label="股权登记日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xr_dr_day" label="除权除息日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xr_stock_times" label="除权派股倍数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_hodings" label="当时持仓股数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="post_xr_stocks" label="除权后股数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dr_amount" label="除息金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dr_total_amount" label="除息总金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xr_dr_status" label="除权除息状态" show-overflow-tooltip></el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{path:'/stock/info/edit/'+scope.row.id}">
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

<script>
    import {getXrDrInfos} from '../../../api/stock';
    export default {
        data() {
            return {
                loading: false,
                forms:{},
                post_data:{
                    search:{
                        stock_name:'',
                        stock_code:''
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
                getXrDrInfos(this.post_data).then(res => {
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