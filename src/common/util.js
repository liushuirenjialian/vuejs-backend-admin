import {getStorageUserInfo} from './tools'

function axiosCatchErrorTitle(error) {
  console.log(error, this)
  let code = 0;
  try {
    code = error.response.status;
  } catch (e) {
    code = 500;
  }
  let msgs = {
    400: '语义有误，当前请求无法被服务器理解,请求参数有误',
    401: '验证已失效,请请重新登录',
    404: '请求失败，请求所希望得到的资源未被在服务器上发现',
    405: '请求行中指定的请求方法不能被用于请求相应的资源',
    412: '图像验证码错误,服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个',
    500: '服务器错误',
  };
  let title = '';
  if (code in msgs) {
    title = code + ':' + msgs[code];
  }
  else if (code >= 500) {
    title = code + ':' + msgs[500];
  } else {
    title = code + ':服务器未知错误';
  }
  return title;
}


export default {
  install(Vue, options) {
    Vue.prototype.ezNotifyAxiosThen = function (resBody) {
      let type = resBody.status > 0 ? 'success' : 'warning';
      let message = resBody.msg;
      let title = resBody.status > 0 ? '成功' : '提示';
      this.$notify({title, message, type});
    };
    Vue.prototype.ezNotifyAxiosCatch = function (error) {
      this.$notify({
        title: error.response.status,
        message: axiosCatchErrorTitle(error),
        type: 'error'
      });
    };
    //是否是系统管理员
    Vue.prototype.isUserSystemAdmin = (getStorageUserInfo().role_id == 1);
    //是否是代理管理员
    Vue.prototype.isUserAgentAdmin = (getStorageUserInfo().role_id == 2);

  }
}


