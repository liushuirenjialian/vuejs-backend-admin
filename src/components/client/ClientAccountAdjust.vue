<template>
    <section>

        <el-form ref="moneyform"
                 :model="info"
                 :rules="infoRules"
                 style="margin:20px;width:60%;min-width:600px;" label-width="180px">
            <el-form-item label="金额调整类型" required prop="description">
                <el-select v-model="info.description" placeholder="请选择类型">
                    <el-option v-for="(item,index) in options" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户ID">
                <el-input v-model.number="info.cust_id" auto-complete="off" type="number" disabled></el-input>
            </el-form-item>
            <el-form-item label="+增加金额,-扣减金额" prop="money" required>
                <el-input v-model.number="info.money" auto-complete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="扣除手续费" prop="fee">
                <el-input v-model.number="info.fee" auto-complete="off" type="number" max="100000000" min="0"></el-input>
            </el-form-item>
            <el-form-item label="实际调整金额">
                <el-input v-model.number="info.amount_of_account" auto-complete="off" type="number" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark" required>
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="info.remark">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </section>

</template>

<script>
    import {clientAcountFlowAdjust} from '../../api/client';

    export default {
        data() {
            return {
                infoRules: {
                    description: [
                        {required: true, message: '请选择调整客户流水类型', trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, message: '请填写备注信息', trigger: 'blur'}
                    ],
                    money: [
                        {required: true, message: '请输入要调整的金额,+增加,-扣减', trigger: 'blur', type: 'number'}
                    ],
                    fee: [
                        {min: 0, max: 10000, message: '手续费不能够为负数', trigger: 'blur', type: 'number'}
                    ],
                },
                info: {
                    description: null,
                    cust_id: this.$route.params.id,
                    selectedType: '',
                    money: null,
                    fee: 0,
                    amount_of_account: 0,
                    remark: '',
                },
              options: ['『调整』追加保证金', '『调整』追加递延费', '『调整』其他', '『管理员』调余额'],
                loading: false,
            }
        },
        watch: {
            info: {
                handler(val) {
                    val.amount_of_account = val.money - val.fee;
                },
                deep: true
            }
        },
        methods: {
            onSubmit() {
                this.$refs.moneyform.validate(valid => {
                    if (valid) {
                        clientAcountFlowAdjust(this.info).then(resBody => {
                            this.ezNotifyAxiosThen(resBody);
                            this.$router.go(-1);
                        }).catch(error => {
                            this.ezNotifyAxiosCatch(error)
                        });
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>
