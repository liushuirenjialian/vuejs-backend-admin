<template>

  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-position="left"
    label-width="0px"
    class="login-container">
    <h3 class="title">后台系统登录</h3>

    <el-form-item
      prop="username">
      <el-input
        type="text"
        v-model="ruleForm.username"
        auto-complete="off"
        placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item
      prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        auto-complete="off"
        placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="captchaCode">
      <el-input
        type="text"
        v-model="ruleForm.captchaCode"
        auto-complete="off"
        placeholder="请输入图像验证码"></el-input>
    </el-form-item>

    <el-checkbox
      v-model="checked"
      checked
      class="remember">
      记住密码
    </el-checkbox>
    <a @click="fetchCaptcha" class="captcha-img" v-loading="loading"><img :src="captchaSrc"></a>

    <el-form-item
      style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="submitForm('ruleForm')"
        :loading="logining">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  //http://element.eleme.io/#/zh-CN/component/alert
  import {requestLogin, createCaptcha, getUserInfo} from '../api/user';
  import {TOKEN_OBJ_ID, USER_INFO_ID, MENU_LIST_ID} from '../common/tools';

  const CLIENT_SECRET = 'ONjIiDAupLsvWRgLc69guRIPv49RdWbFN44CKRiE';
  const CLIENT_ID = 6;
  const GRANT_TYPE = 'password';
  const SCOPE = '';
  export default {
    data() {
      return {
        logining: false,
        loading: false,
        checked: true,
        captchaSrc: '',
        ruleForm: {
          grant_type: GRANT_TYPE,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          scope: SCOPE,
          username: '15527918920',//电话号码 15527918920
          password: '123456', //密码:123456
          captchaId: '',//验证码的唯一id
          captchaCode: '',//图像验证码的字符
        },
        //https://github.com/yiminghe/async-validator
        rules: {
          username: [
            {
              required: true,
              message: '手机号码是必填',
              trigger: 'blur'
            },
            {
              type: 'string',
              pattern: /^1[3|4|5|7|8][0-9]\d{4,8}$/,
              message: '请输入正确手机号码',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              message: '密码最短6位',
              trigger: 'blur'
            }
          ],
          captchaCode: [
            {
              required: true,
              message: '请输入图像验证码',
              trigger: 'blur'
            },
            {
              type: 'string',
              pattern: /^\w{5}$/,
              message: '请输入5位数的数字和字母',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    methods: {

      submitForm(formName) {
        //https://cn.vuejs.org/v2/guide/components.html#子组件索引
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestLogin(this.ruleForm).then((res) => {
              if (res.msg) {
                this.$notify({
                  title: '验证码错误',
                  message: '请重新输入验证码',
                  type: 'error'
                });
              } else {
                if (this.checked) {
                  localStorage.setItem(TOKEN_OBJ_ID, JSON.stringify(res));
                } else {
                  sessionStorage.setItem(TOKEN_OBJ_ID, JSON.stringify(res));
                }
              }
              this.$router.push({path: '/agent'});
            })
          }
        });
      },
      //获取验证码  点击验证码刷新的时候 调用这个方法
      fetchCaptcha() {
        this.loading = true;
        let uniqueId = new Date().valueOf();
        createCaptcha({captchaId: uniqueId}).then((res) => {
          this.captchaSrc = res.data;
          this.ruleForm.captchaId = uniqueId
          this.loading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      }
    },
    //获取图形码
    mounted() {
      this.fetchCaptcha();
    },
    beforeDestroy() {
      getUserInfo()
    }
  }

</script>

<style scoped>

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 70px auto auto auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }

  .captcha-img {
    position: relative;
    float: right;
  }

  .captcha-img:hover {
    cursor: pointer;
  }

</style>
