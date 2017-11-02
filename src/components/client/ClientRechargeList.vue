<template>
    <section class="default-tab">
        <div class="searchgrid">
            <select class="select_option float_left" v-model="filters.transfer_type">
              <option :value="null">请选充值来源</option>
                <option v-for="(item,idx) in transferTypeOptions" :key="item" :value="idx" v-text="item"></option>
            </select>
            <select class="select_option float_left" v-model="filters.status">
              <option :value="null">请选充值状态</option>
                <option v-for="(item,idx) in statusOptions" :key="item" :value="idx" v-text="item"></option>
            </select>
            <div class="float_right">
                <input style="width:200px" name="mobile" v-model="filters.keyword" maxlength="11" type="text"
                       placeholder="代理商/代理商编号/代理商ID">
                <input class="button" value=" 查询 " type="button" @click="getClientRecharges">
            </div>
        </div>
        <div class="tab-content default-tab" style="display: block;">
            <!--列表-->
            <el-table :data="pagination.data"
                      v-loading="loading"
                      style="width: 100%;">

                <el-table-column type="id" prop="id" label="充值单号">
                </el-table-column>

                <el-table-column prop="client.nick_name" label="充值用户">
                    <template scope="scope">
                        <span v-text="scope.row.client.real_name + scope.row.client.cellphone"></span>
                    </template>
                </el-table-column>

                <el-table-column prop="client.created_time" label="充值时间">
                </el-table-column>
                <el-table-column prop="client.arrival_time" label="到账时间">
                </el-table-column>
                <el-table-column prop="amount_of_account" label="充值金额">
                </el-table-column>
                <el-table-column prop="fee" label="充值手续费"></el-table-column>
                <el-table-column  label="到账金额">
                    <template scope="scope">
                        {{scope.row.amount_of_account - scope.row.fee}}
                    </template>
                </el-table-column>
                <el-table-column label="充值来源">
                    <template scope="scope">
                        {{transferTypeOptions[scope.row.transfer_type]}}
                    </template>
                </el-table-column>
                <el-table-column label="充值状态">
                    <template scope="scope">
                        {{statusOptions[scope.row.status]}}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>

              <el-table-column label="操作" v-if="isUserSystemAdmin">
                    <template scope="scope">
                        <el-button size="mini" @click="segueToClientRechargeAudit(scope.row)" v-if="scope.row.status == 4"    title="账户审核"><i class="fa fa-pencil"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handlePageChange"
                        :current-page="pagination.current_page"
                        :page-sizes="[15, 30, 45, 60]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-size="parseInt(pagination.per_page)"
                        :total="pagination.total"
                        style="float:right;">
                </el-pagination>
            </div>

        </div>
    </section>


</template>

<script>
    import {fetchClientRechargeList} from '../../api/client';

    export default {
        data() {

            return {
                filters: {
                    range: null,
                    keyword: null,
                    status: null,
                    transfer_type: null,
                    page: 1,
                    size: 15,
                },
                statusOptions: [
                    '已提交',//0,
                    '成功',//1,
                    '失败',//2,
                    '充值退回',//3,
                    '处理中',//4
                ],
                transferTypeOptions: [
                    'ATM',//0,
                    '柜台',//1,
                    '网银',//2,
                    '手机银行',//3,
                    '支付宝',//4,
                    '其他',//5
                ],
                pagination: {},
                loading: false,
            }
        },
        methods: {
            handleSizeChange(size) {
                this.filters.page = 1;
                this.filters.size = size;
                this.getClientRecharges();
            },
            handlePageChange(clickPageIndex) {
                //分页页面发生改变
                this.filters.page = clickPageIndex;
                this.getClientRecharges();
            },
            segueToClientRechargeAudit(row) {
                this.$router.push({name: '客户充值审核', params: {id: row.id}});
            },
            //获取用户列表
            getClientRecharges() {
                this.loading = true;
                fetchClientRechargeList({params: this.filters}).then((res) => {
                    this.pagination = res.data;
                    this.loading = false;
                }).catch(error => {
                    flashAxiosCatchError(error, this);
                    this.loading = false;
                });
            },
        },
        mounted() {
            this.getClientRecharges();
        },
    }
</script>

<style scoped>

    input[type='text'] {
        height: 20px;
    }

    input[type='button'] {
        line-height: 19px;
    }

    input[type='submit'] {
        line-height: 24px;
    }

    .float_left {
        display: inline-block;
    }

    .float_right {
        display: inline-block;
        float: right;
    }

    .select_option {
        line-height: 17px;
        height: 21px;
        width: 180px;
        padding-bottom: 3px;
        margin-top: 4px;
        margin-right: 8px;
        vertical-align: middle;
    }
</style>
