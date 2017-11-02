<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="代理商名称/电话/ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAgentCommissionList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="pagination.data"
                  v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column label="#" prop="id" sortable>
            </el-table-column>
            <el-table-column prop="stock_finance_id" label="子账户ID" align="center">
            </el-table-column>
            <el-table-column prop="cust_id" label="客户ID" align="center">
            </el-table-column>
            <el-table-column label="收息类型" width="100" align="center">
                <template scope="scope">
                    {{ interestTypes[scope.row.interest_type] }}
                </template>
            </el-table-column>
            <el-table-column prop="paid_amount" label="已缴纳" align="center">
            </el-table-column>
            <el-table-column prop="total_insterests" label="总利息金额" align="center">
            </el-table-column>
            <el-table-column prop="agent1_interests" label="1级代理商分成" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="agent2_interests" label="2级代理商分成" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="agent3_interests" label="3级代理商分成" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="agent4_interests" label="4级代理商分成" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="agent5_interests" label="5级代理商分成" min-width="180" align="center">
            </el-table-column>

            <el-table-column prop="remark" label="备注" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="interest_end_time" label="利息截止时间" min-width="180" align="center">
            </el-table-column>
            <el-table-column prop="interest_start_time" label="利息起始时间" min-width="180" align="center">
            </el-table-column>


        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="pageIndexChange"
                    :current-page="pagination.current_page"
                    :page-sizes="[15, 30, 45, 60]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="parseInt(pagination.per_page)"
                    :total="pagination.total"
                    style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import {getAgentCommissionList} from '../../api/agent';

    export default {
        data() {
            return {
                interestTypes: ['其他', '初配', '追配', '定时'],
                filters: {
                    keyword: '',
                    page: 1,
                    size: 15,
                },
                pagination: {},
                listLoading: false,
            }
        },
        methods: {
            pageIndexChange(clickPageIndex) {
                //分页页面发生改变
                this.filters.page = clickPageIndex;
                this.getAgentCommissionList();
            },
            //后去
            getAgentCommissionList() {
                let params = this.filters;
                this.listLoading = true;
                getAgentCommissionList({params}).then((res) => {
                    this.pagination = res.data;
                    this.listLoading = false;
                }).catch(error => this.ezNotifyAxiosCatch(error));
            },
            handleSizeChange(size) {
                this.filters.size = size;
                this.filters.page = 1;
                this.getAgentCommissionList();
            },
            handleAddChildAgent: function (row) {

                let query = {parentId: row.id};
                this.$router.push({path: '/agent/create', query});
            },
            handleEmployeeList: function (row) {
                this.$router.push({name: '员工列表', query: {agent_id: row.id}})
            },
            handleEditAgent: function (row) {
                let id = row.id;
                this.$router.push({name: '代理商修改', params: {id}});
            },
            //删除
            handleDeleteAgent: function (row) {
                this.$confirm('确认删除该记录吗? 删除代理延时一分钟消失', '提示', {
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
            handlePlayAgent: function (row) {
                rolePlayIssueToken({agent_id: row.id}).then(res => {
                    if (res.status) {
                        let tokenx = res.data.accessToken;
                        this.$router.push({path: '/agent', query: {tokenx}});
                    }
                });
            }
        },
        mounted() {
            this.getAgentCommissionList();
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 33.33%;
    }
</style>
