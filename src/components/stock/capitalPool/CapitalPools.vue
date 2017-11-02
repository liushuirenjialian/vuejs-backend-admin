<template>
<section>
        <!--工具条-->
        <div class="searchgrid">
            <router-link :to="{path:'/stock/capitalPool/create'}">
                <input value=" 新增 " type="button" class="button">
            </router-link>
            <div style="float: right;">
                <input id="mobile" v-model="post_data.search.id" style="width:150px;height:25px;"
                    value="" maxlength="10" type="text" placeholder="搜索:资金池ID">
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
            <el-table-column prop="capital_name" label="资金池名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updated_time" label="更新时间" show-overflow-tooltip></el-table-column>

            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{path:'/stock/capitalPool/edit/'+scope.row.id}">
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
    import {getCapitalPools} from '../../../api/stock';
    export default {
        data() {
            return {
                loading: false,
                forms:{},
                post_data:{
                    search:{
                        id:''
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
                getCapitalPools(this.post_data).then(res => {
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