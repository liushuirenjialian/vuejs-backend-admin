<template>
    <el-form
            label-width="300px"
            @submit.prevent="onSubmit"
            ref="Form"
            v-loading="loading"
            label-position="right"
            style="margin:20px;">

        <template v-for="(form,index) in forms">
            <el-form-item :label="form.risk_control_remark">
                <template v-if="form.param_type==1">
                    <el-input size="small" v-model="forms[index].risk_control_value"></el-input>
                </template>
                <template v-else-if="form.param_type==2">
                    <el-switch on-text="" off-text="" v-model="forms[index].risk_control_value" on-value="1" off-value="0"></el-switch>
                </template>
                <template v-else>
                    {{forms[index].risk_control_value}}
                </template>
            </el-form-item>
        </template>

        <el-form-item>
            <el-button type="primary">
                修改(暂不支持)
            </el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {getTransRistControlRules, updateTransRistControlRule} from '../../../api/system';

    export default {
        data() {
            return {
                forms: {},
                loading: false,
            }
        },
        created(){
            this.loading = true;
            getTransRistControlRules().then(res => {
                this.forms = res.data.list;
                this.loading = false;
            }).catch(err => this.loading = false)
        }
    }
</script>

<style scoped>
    .el-input {
        width: 200px;
    }
</style>
