<template>

    <el-form :model="info"
             label-width="180px"
             @submit.prevent="onSubmit"
             :rules="infoRules"
             ref="infoForm"
             style="margin:20px;width:60%;min-width:600px;">

        <el-form-item label="代理平台名称" required prop="platform_name">
            <el-input v-model="info.platform_name" auto-complete="off"></el-input>
        </el-form-item>


        <el-form-item label="省份" required prop="province">
            <el-input v-model="info.province" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" required prop="city">
            <el-input v-model="info.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" required prop="address">
            <el-input v-model="info.address" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="服务时间" required prop="service_time">
            <el-input v-model="info.service_time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" required prop="service_phone">
            <el-input v-model="info.service_phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服邮箱" required prop="service_email">
            <el-input v-model="info.service_email" auto-complete="off" type="email"></el-input>
        </el-form-item>
        <el-form-item label="客服QQ" required prop="service_qq">
            <el-input v-model.number="info.service_qq" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="客服QQ群" required prop="qq_group">
            <el-input v-model.number="info.qq_group" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="PC端域名" prop="web_domain">
            <el-input v-model="info.web_domain" auto-complete="off" type="url"></el-input>
        </el-form-item>
        <el-form-item label="移动端域名" prop="mobile_domain">
            <el-input v-model="info.mobile_domain" auto-complete="off" type="url"></el-input>
        </el-form-item>
        <el-form-item label="首页标题" prop="seo_title">
            <el-input v-model="info.seo_title" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="首页描述" prop="seo_description">
            <el-input v-model="info.seo_description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="首页关键字" prop="seo_keyword">
            <el-input v-model="info.seo_keyword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站备案号" prop="website_record_no">
            <el-input v-model="info.website_record_no" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="版权信息" prop="copyright">
            <el-input v-model="info.copyright" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信公告号appid" prop="appid">
            <el-input v-model="info.appid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公共号秘钥" prop="public_key">
            <el-input v-model="info.public_key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公共微信号二维码" required prop="public_qr">
            <el-input v-model="info.public_qr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信公共号名称" required prop="public_number_name">
            <el-input v-model="info.public_number_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="短信平台账号" required prop="sms_account">
            <el-input v-model="info.sms_account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信平台密码" required prop="sms_pwd">
            <el-input v-model="info.sms_pwd" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="短信平台验证码模板" required prop="sms_captcha_template_id">
            <el-input v-model.number="info.sms_captcha_template_id" auto-complete="off" type="number"></el-input>
        </el-form-item>

        <el-form-item label="短信平台签名ID" required prop="sms_sign_id">
            <el-input v-model.number="info.sms_sign_id" auto-complete="off" type="number"></el-input>
        </el-form-item>


        <el-form-item>
            <el-button type="primary"
                       @click.native.prevent="submitInfoForm">
                更新附加信息
            </el-button>
          <el-button @click.native.prevent="$router.go(-1)">返回</el-button>
        </el-form-item>
    </el-form>


</template>

<script>
    import {agentUpdateInfo} from '../../api/agent';

    export default {

        data() {

            return {
                loading: false,


                //登陆账号密码
                infoRules: {
                    platform_name: [
                        {required: true, message: '平台名称3~12个字', trigger: 'blur', min: 3, max: 12}
                    ],
                    province: [
                        {required: true, message: '请填写省份名称', trigger: 'blur'}

                    ],
                    city: [
                        {required: true, message: '请填写城市名称', trigger: 'blur'}

                    ],
                    address: [
                        {required: true, message: '请填写区县街道详细地址', trigger: 'blur'}

                    ],
                    service_time: [
                        {required: true, message: '请填写服务时间段', trigger: 'blur', max: 128}

                    ],
                    service_phone: [
                        {required: true, message: '请填写客服电话号码', trigger: 'blur'}
                    ],
                    service_email: [
                        {required: true, message: '请填写客服有限', trigger: 'blur', type: 'email'}
                    ],
                    service_qq: [
                        {required: true, message: '请填写QQ号码', trigger: 'blur', type: 'number'}
                    ],
                    qq_group: [
                        {required: true, message: '请填写QQ群号', trigger: 'blur', type: 'number'}
                    ],
                    web_domain: [
                        {message: '请填写合法的域名', trigger: 'blur', type: 'url'}

                    ],
                    mobile_domain: [
                        {message: '请填写合法的域名', trigger: 'blur', type: 'url'}

                    ],
                    seo_title: [
                        {message: '请填写SEO标题', trigger: 'blur',}
                    ],
                    seo_description: [
                        {message: '请填写SEO描述', trigger: 'blur'}
                    ],
                    seo_keyword: [
                        {required: true, message: '请填写SEO关键字,以逗号分隔', trigger: 'blur'}
                    ],
                    website_record_no: [
                        {required: true, message: '前填写网站备案号', trigger: 'blur', max: 20}
                    ],
                    copyright: [
                        {message: '请填写版权信息', trigger: 'blur', max: 50}
                    ],
                    cust_qr: [
                        {required: true, message: '请填写客服微信二维码', trigger: 'blur', max: 20}
                    ],
                    appid: [
                        {required: true, message: '请填写微信公众号appID', trigger: 'blur', max: 20}
                    ],
                    public_key: [
                        {required: true, message: '请填写微信公众号秘钥', trigger: 'blur', max: 60}
                    ],
                    public_qr: [
                        {required: true, message: '请填写微信公众号二维码', trigger: 'blur', max: 60}
                    ],
                    public_number_name: [
                        {required: true, message: '请填写微信公众号名称', trigger: 'blur', max: 50}
                    ],

                    sms_account: [
                        {required: true, message: '短信平台账号', trigger: 'blur'}
                    ],
                    sms_pwd: [
                        {required: true, message: '短信平台密码', trigger: 'blur'}
                    ],
                    sms_captcha_template_id: [
                        {required: true, message: '短信平台模板ID', trigger: 'blur', type: 'number'}
                    ],
                    sms_sign_id: [
                        {required: true, message: '短信平台签名ID', trigger: 'blur', type: 'number'}
                    ],
                    remark: [
                        {message: '备注0~255字符', trigger: 'blur', max: 255}
                    ],
                }

            }
        },
        computed: {
            info: () => {
                try {
                    return this.infoData.info;
                } catch (e) {
                    return {
                        id: 0,
                        platform_name: '',
                        web_domain: '',
                        mobile_domain: '',
                        province: '',
                        city: '',
                        address: '',
                        service_time: '',
                        service_phone: '',
                        service_email: '',
                        service_qq: '',
                        qq_group: '',
                        website_record_no: '',
                        copyright: '',
                        seo_title: '',
                        seo_description: '',
                        seo_keyword: '',
                        cust_qr: '',
                        appid: '',
                        public_key: '',
                        public_qr: '',
                        public_number_name: '',
                        remark: '',
                        sms_account: '',
                        sms_pwd: '',
                        sms_captcha_template_id: '',
                        sms_sign_id: ''
                    };
                }
            },
        },


        methods: {
            submitInfoForm() {
                this.loading = true;
                this.info.id = this.agent_id;
                this.$refs.infoForm.validate((valid) => {
                    if (valid) {
                        agentUpdateInfo(this.info).then(res => {
                            this.info = res.data;
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
