import {initAxios} from '../common/tools';
import {KEY_USER_INFO} from '../common/tools';
import {getSystemParam} from "./system";

//获取验证码 不需要任何参数
export const createCaptcha = params => {
    return initAxios().post(`/v1/createCaptcha`, params).then(res => res.data);
};

//手机号码 密码登陆
export const requestLogin = params => {
    return initAxios().post(`/oauth/token`, params).then(res => res.data);
};


//根据token 获取用户信息
export const getUserInfo = (params = null) => {
    return initAxios().post(`/v1/userInfo`, params).then(res => {
        localStorage.setItem(KEY_USER_INFO, JSON.stringify(res.data));
        return res.data
    });
};


//修改代理商管理员密码
export const changeAgentAdminPassword = params => {
    return initAxios().post(`/v1/agentChangeAdminPassword`, params).then(res => res.data);
};

export const rolePlayIssueToken = params => {
    return initAxios().post(`/v1/rolePlayIssueToken`, params).then(res => res.data);
};


export const getUserList = params => {
    return initAxios().get(`/v1/userList`, params).then(res => res.data);
};
