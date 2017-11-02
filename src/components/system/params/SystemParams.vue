<template>
    <el-form
            label-width="300px"
            @submit.prevent="onSubmit"
            ref="Form"
            v-loading="loading"
            label-position="right"
            style="margin:20px;">

        <template v-for="(form,index) in forms">
            <el-form-item :label="form.remark">
                <template v-if="form.param_type==1">
                    <el-input size="small" v-model="forms[index].value"></el-input>
                </template>
                <template v-else-if="form.param_type==2">
                    <el-switch on-text="" off-text="" v-model="forms[index].value" on-value="1" off-value="0"></el-switch>
                </template>
                <template v-else>
                    {{forms[index].value}}
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
    import {getSystemParams, updateSystemParam} from '../../../api/system';

    export default {
        data() {
            return {
                forms: {},
                loading: false,
            }
        },
        created(){
            this.loading = true;
            getSystemParams().then(res => {
                this.forms = res.data.list;
                this.loading = false;
            }).catch(err => this.loading = false)
        },
        methods: {
            onSubmit() {
                this.loading = true;
                updateSystemParam(this.forms).then(res => {
                    this.ezNotifyAxiosThen(res);
                    this.loading = false;
                }).catch(error => this.ezNotifyAxiosCatch(error))
            }
        }
    }
</script>

<style scoped>
    .el-input {
        width: 200px;
    }
</style>
