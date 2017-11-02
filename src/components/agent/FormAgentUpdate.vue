<template>
    <el-tabs v-model="tabName" type="card" style="margin-top: 12px" v-loading="loading">
        <el-tab-pane label="基本信息" name="basic">
            <form-agent-update-basic :agent_id="$route.params.id" :infoData.sync="allInfo"></form-agent-update-basic>
        </el-tab-pane>

        <el-tab-pane label="附加信息" name="info" v-if="isShowExtro">
            <form-agent-update-info :agent_id="$route.params.id" :infoData="allInfo"></form-agent-update-info>
        </el-tab-pane>

        <el-tab-pane label="分成配置" name="percentage">
            <form-agent-update-percentage :agent_id="$route.params.id" :infoData="allInfo"></form-agent-update-percentage>
        </el-tab-pane>

        <el-tab-pane label="后台密码" name="user">
            <form-agent-update-user :agent_id.number="$route.params.id" :infoData="allInfo"></form-agent-update-user>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import {getAgentInfo,} from '../../api/agent';
    import FormAgentUpdateBasic from "./FormAgentUpdateBasic.vue";
    import FormAgentUpdateInfo from "./FormAgentUpdateInfo.vue";
    import FormAgentUpdatePercentage from "./FormAgentUpdatePercentage.vue";
    import FormAgentUpdateUser from "./FormAgentUpdateUser.vue";

    export default {
        components: {
            FormAgentUpdateUser,
            FormAgentUpdatePercentage,
            FormAgentUpdateInfo,
            FormAgentUpdateBasic
        },
        data() {
            return {
                tabName: 'basic',
                allInfo: {},
                loading: false,
            }
        },
        created() {
            this.getAgentInfo();
        },
        methods: {
            getAgentInfo() {
                this.loading = true;
                let id = this.$route.params.id;
                getAgentInfo({id}).then(res => {
                    this.allInfo = res.data;
                    this.isShowExtro = res.data.basic.is_independent;
                    this.loading = false;
                }).catch(error => {
                        this.ezNotifyAxiosCatch(error);
                        this.loading = false;
                    }
                );
            }
        },
        props: {}
    }


</script>


<style scoped>

</style>