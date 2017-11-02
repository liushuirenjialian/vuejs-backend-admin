<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="fetchEmployeeList">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleAddEmployeeOfThisAgent">新增</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="pagination.data"
                  highlight-current-row
                  v-loading="listLoading"
                  stripe
                  style="width: 100%;">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="登陆用户名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="employee_name" label="员工姓名" width="200" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="员工电话" width="150" sortable>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200" sortable>
            </el-table-column>
            <el-table-column prop="agent.agent_name" label="代理商" width="120" sortable>
            </el-table-column>
            <el-table-column prop="role.role_name" label="职位" width="120" sortable>
            </el-table-column>
            <el-table-column prop="updated_time" label="添加日期" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template scope="scope">
                    <el-button size="mini" @click="handleEditEmployee(scope.row)" icon="edit" title="代理修改"></el-button>
                    <el-button size="mini" @click="handlePlayAgent(scope.row)" title="扮演代理"><i class="fa fa-play-circle"></i></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChange"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="parseInt(pagination.per_page)"
                    :total="pagination.total"
                    style="float:right;">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import {employeeList} from '../../api/employee';

    export default {
        data() {
            return {
                filters: {
                    keyword: '',
                    page: 1,
                    size: 15,
                    agent_id: 0,
                },
                pagination: {},
                listLoading: false,
            }
        },
        watch: {
            '$route': function (newRoute, oldRoute) {
                this.fetchEmployeeList();
            },
        },
        methods: {
            handlePageChange(clickPageIndex) {
                //分页页面发生改变
                this.filters.page = clickPageIndex;
                this.fetchEmployeeList();
            },
            handleSizeChange(size) {
                this.filters.size = size;
                this.filters.page = 1;
                this.fetchEmployeeList();
            },
            //获取用户列表
            fetchEmployeeList() {
                this.filters.agent_id = this.$route.query.agent_id;
                let params = this.filters;
                console.log(params);
                this.listLoading = true;
                employeeList({params}).then((res) => {
                    this.pagination = res.data;
                    this.listLoading = false;
                }).catch(error => {
                    this.ezNotifyAxiosCatch(error)
                });
            },
            handleAddEmployeeOfThisAgent: function () {
                let query = this.$route.query;
                this.$router.push({path: '/employee/create', query});
            },

            handleEditEmployee: function (row) {
                this.$router.push({name: '员工修改', params: {id: row.id}});
            },

            handlePlayAgent: function (row) {
                this.$confirm('确认删除该记录吗? 删除代理延时一分钟消失', '提示', {
                    type: 'warning'
                }).then(() => {

                }).catch(() => {

                });
            },
        },
        mounted() {
            this.fetchEmployeeList();
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