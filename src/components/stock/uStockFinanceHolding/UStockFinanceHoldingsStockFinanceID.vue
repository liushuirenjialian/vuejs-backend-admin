<template>
    <section>
        <!--列表-->
        <el-table :data="forms.list"
                  highlight-current-row
                  v-loading="loading"
                  style="width: 100%;">
            <el-table-column prop="stock_finance_id" label="账户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updated_time" label="更新时间" show-overflow-tooltip show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_code" label="证券代码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_name" label="证券名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="holdings_quantity" label="持仓数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="available_sell_quantity" label="可卖数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="total_sold_amount" label="累计卖出" show-overflow-tooltip></el-table-column>
            <el-table-column prop="avarage" label="买入均价" show-overflow-tooltip></el-table-column>
            <el-table-column label="最新价格" show-overflow-tooltip></el-table-column>
            <el-table-column label="最新市值" show-overflow-tooltip></el-table-column>
            <el-table-column label="盈亏比率" show-overflow-tooltip></el-table-column>
            <el-table-column label="占持仓比率" show-overflow-tooltip></el-table-column>
            <el-table-column prop="present_nums" label="配送数量" show-overflow-tooltip></el-table-column>
            <el-table-column label="税后配息金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="agent_id" label="母账户ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stock_info.halt_days" label="停牌天数" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" min-width="150">
                <template scope="scope">
                    <a href="javascript:void(0);" @click="openXrdr(scope.row)">除权降息</a>
                    <a href="javascript:void(0);" @click="doEveningupPerHolding(scope.row)">平仓</a>
                    <a href="javascript:void(0);" @click="openRecoveryStock(scope.row)">停牌回收</a>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="除权降息"
                :visible.sync="dialog1Visible"
                :close-on-click-modal="false" top="150px">
            <el-form :model="form1">
                <el-form-item label="配送提示" label-width="150px">
                    会员: {{form1.client.nick_name + ' ' + form1.client.cellphone}}
                    <br/>
                    配送股票: {{form1.stock_code + ' ' + form1.stock_name}}
                </el-form-item>
                <el-form-item label="配送数量" label-width="150px">
                    <el-input size="small" v-model="form1.num" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog1Visible = false">取 消</el-button>
                <el-button type="primary" @click="doXrdr(form1)">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="停牌回收"
                :visible.sync="dialog2Visible"
                :close-on-click-modal="false" top="150px">
            <el-form :model="form2">
                <el-form-item label="按市值回收比例" label-width="150px">
                    <el-input size="small" v-model="form2.percentage" auto-complete="off"></el-input>
                    %
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog2Visible = false">取 消</el-button>
                <el-button type="primary" @click="doRecoveryStock(form2)">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
    import {eveningupPerHolding, xrdr} from '../../../api/java';
    import {getUStockFinanceHoldingsStockFinanceID} from '../../../api/stock';
    export default {
        data() {
            return{
                dialog1Visible: false,
                dialog2Visible: false,
                loading: false,
                forms:{},
                form1: {client: ''},
                form2: {},
                post_data:{
                    field:['*','0 as avarage','0 as present_nums'],
                    stock_info:{
                        field:['stock_code','trading_halt_time','resumption_time','ex_rights_stock_times','without_dividend','0 as halt_days']
                    },
                    client: {
                        field: ['id', 'nick_name', 'cellphone']
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
                getUStockFinanceHoldingsStockFinanceID(this.$route.params.id,this.post_data).then(res => {
                    this.forms = res.data;
                    this.loading = false;
                }).catch(err => this.loading = false)
            },
            openXrdr: function (row) {
                this.dialog1Visible = true;
                this.form1 = row;
            },
            openRecoveryStock: function (row) {
                this.dialog2Visible = true;
                this.form2 = row;
            },
            doXrdr: function (row) {
                this.$confirm('确认要配送吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    xrdr({stockFinanceHoldId: row.id, stockCode: row.stock_code, addXrStockAmount: row.num}).then((res) => {
                        this.ezNotifyAxiosThen(res);
                        this.loading = false;
                        this.dialog1Visible = false;
                    }).catch(error => this.ezNotifyAxiosCatch(error));
                }).catch(() => {
                });
            },
            doRecoveryStock: function (row) {
                this.$confirm('确认要回收吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    xrdr({stockFinanceHoldId: row.id, stockCode: row.stock_code, addXrStockAmount: row.percentage}).then((res) => {
                        this.ezNotifyAxiosThen(res);
                        this.loading = false;
                        this.dialog2Visible = false;
                    }).catch(error => this.ezNotifyAxiosCatch(error));
                }).catch(() => {
                });
            },
            doEveningupPerHolding: function (row) {
                this.$confirm('确认要平仓吗?' , '提示', {
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    eveningupPerHolding({id: row.stock_finance_id, stock_code: row.stock_code}).then((res) => {
                        this.ezNotifyAxiosThen(res);
                        this.loading = false;
                    }).catch(error => this.ezNotifyAxiosCatch(error));
                }).catch(() => {
                });
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
