<template>

        <el-form :model="config"
                 label-width="180px"
                 @submit.prevent="onSubmit"
                 :rules="configRules"
                 ref="configForm"
                 style="margin:20px;width:60%;min-width:600px;">

            <el-form-item label="天配分成比例0~1" required prop="day_percentage">
                <el-input v-model.number="config.day_percentage" auto-complete="off" type="number" step="0.001"></el-input>
            </el-form-item>
            <el-form-item label="月配分成比例0~1" required prop="month_percentage">
                <el-input v-model.number="config.month_percentage" auto-complete="off" type="number" step="0.001"></el-input>
            </el-form-item>

            <el-form-item label="佣金分成比例0~1" required prop="commission_percentage">
                <el-input v-model.number="config.commission_percentage" auto-complete="off" type="number" step="0.001"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click.native.prevent="submitPercentageInfoForm">
                    修改分成比例
                </el-button>
              <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>

</template>

<script>
    import {agentUpdatePercentage} from '../../api/agent';
    import {flashAxiosCatchError, flashAxiosThenMessage} from '../../common/tools'

    export default {
        data() {
            return {
                loading: false,
                configs: [],//代理商配置信息
                configRules: {
                    day_percentage: [
                        {required: true, message: '0~0.999', trigger: 'blur', min: 0, max: 0.999, type: 'number'}
                    ],
                    monthe_percentage: [
                        {required: true, message: '0~0.999', trigger: 'blur', min: 0, max: 0.999, type: 'number'}
                    ],
                    commission_percentage: [
                        {required: true, message: '0~0.999', trigger: 'blur', min: 0, max: 0.999, type: 'number'}
                    ],
                }
            }
        },
        computed: {
            config: {
                // getter
                get: function () {

                    try {
                        let obj = {
                            day_percentage: 0,
                            day_id: 0,
                            month_percentage: 0,
                            month_id: 0,
                            commission_percentage: 0,
                            commission_id: 0,
                            agent_id: this.agent_id
                        }
                        this.infoData.configs.forEach((currentValue, index, array) => {
                            if (currentValue.type == 0) {
                                obj.day_percentage = currentValue.percentage;
                                obj.day_id = currentValue.id;

                            }
                            if (currentValue.type == 1) {
                                obj.month_percentage = currentValue.percentage;
                                obj.month_id = currentValue.id;

                            }
                            if (currentValue.type == 2) {
                                obj.commission_percentage = currentValue.percentage;
                                obj.commission_id = currentValue.id;
                            }
                        })
                        return obj
                    } catch (e) {
                        return {
                            day_percentage: 0,
                            day_id: 0,
                            month_percentage: 0,
                            month_id: 0,
                            commission_percentage: 0,
                            commission_id: 0,
                            agent_id: 0,
                        }
                    }

                },


            }

        },


        methods: {

            //修改用户密码

            submitPercentageInfoForm() {
                this.loading = true;
                this.$refs.configForm.validate((valid) => {
                    if (valid) {
                        agentUpdatePercentage(this.config).then(res => {
                            this.loading = false;
                            this.ezNotifyAxiosThen(res);
                        }).catch(error => this.ezNotifyAxiosCatch(error))

                    }
                });
            },

        },
        props: ['agent_id', 'infoData']
    }


</script>


<style scoped>

</style>
