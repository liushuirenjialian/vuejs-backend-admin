<template>
    <section>
        <!--工具条-->
        <div class="searchgrid">
            <div style="float: right;">
                <input v-model="post_data.search.stock_code" style="width:150px;height:25px;"
                    maxlength="10" type="text" placeholder="搜索:股票代码">
                <input v-model="post_data.search.stock_name" style="width:150px;height:25px;"
                                    maxlength="10" type="text" placeholder="搜索:股票名称">
                    <input class="button" value=" 查询 " type="button" v-on:click="search">
            </div>
            <div style="clear:both"></div>
        </div>


        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;"
                  fit>
            <el-table-column prop="stock_code" label="股票代码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_name" label="股票名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_pingying" label="股票拼音" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_industry" label="所属行业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_category" label="股票板块">
                <template scope="scope">
                    {{scope.row.stock_category==1?'上证':'深证'}}
                </template>
            </el-table-column>
            <el-table-column label="是否启用" prop="is_stock_enable">
                <template scope="scope">
                    {{ scope.row.is_stock_enable?'是':'否' }}
                </template>
            </el-table-column>
            <el-table-column prop="trading_halt_time" label="停牌时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="resumption_time" label="复牌时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="halt_status" label="停复牌状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="announcement_day" label="除权除息公告日" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="record_date" label="股权登记日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ex_dividend_day" label="除权除息日" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ex_rights_stock_times" label="除权增股倍数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="without_dividend" label="除息金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="description" label="除权除息说明" show-overflow-tooltip></el-table-column>
            <el-table-column prop="max_buying_amount" label="最大买入金额" show-overflow-tooltip></el-table-column>
            <el-table-column label="最大买入同系统参数" width="120">
                <template scope="scope">
                    {{ scope.row.is_follow_param?'是':'否' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{path:'/system/info/edit/'+scope.row.id}">
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
    import {getStockInfos,destroyStockInfo} from '../../../api/system';
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
                getStockInfos(this.post_data).then(res => {
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