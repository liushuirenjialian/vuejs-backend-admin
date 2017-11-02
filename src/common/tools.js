import axios from 'axios';
import {host} from './env.js';
//const host = 'http://ccs.gubao.com/';//这个地址对应的是 内网我笔记本的服务器10.10.1.175
export const TOKEN_OBJ_ID = 'token_json_key';
export const TOKEN_OBJ_JD_PLAY = 'token_json_key_play';


export const KEY_USER_INFO = 'authed_user_menu_info_agent_info';
export const MENU_LIST_ID = 'nav_bar_menu_key';
export const USER_INFO_ID = 'authed_user_info_key';

export function fetchToken() {
    try {
        //如果扮演的者的token存在就获取扮演者token
        let playToken = sessionStorage.getItem(TOKEN_OBJ_JD_PLAY);
        if (playToken) {
            return JSON.parse(playToken).access_token;
        }

        let tokenString = localStorage.getItem(TOKEN_OBJ_ID);
        if (!tokenString) {
            tokenString = sessionStorage.getItem(TOKEN_OBJ_ID)
        }
        return JSON.parse(tokenString).access_token;
    } catch (e) {
        return '';
    }
}

//初始化一个 axios instance
export function initAxios() {
    let authHeader = 'Bearer ' + fetchToken();
    return axios.create({
        baseURL: host,
        timeout: 10000,
        headers: {'Authorization': authHeader},
    });
}

//清除浏览器储存的token
export function ereaseTokenFromStorage() {
    //发送销毁登陆token的请求
    if (fetchToken()) {
        initAxios().post(`/v1/logout`).then(res => console.log(res));
    }
    //清除token
    sessionStorage.removeItem(TOKEN_OBJ_ID);//清除token
    localStorage.removeItem(TOKEN_OBJ_ID);//清除token
    localStorage.removeItem(USER_INFO_ID);//清除user info
    localStorage.removeItem(MENU_LIST_ID);//清除用户权限菜单
    //清除用户信息
    localStorage.removeItem(KEY_USER_INFO);
}


//##扮演登陆需要在另外一个二级域名下完成

//扮演这个用户,直接注入token
//获取tokenx
export function playRoleTokenInjection(to, from, next) {
    let access_token = to.query.tokenx;
    if (access_token) {
        let obj = {access_token};
        let objString = JSON.stringify(obj);
        sessionStorage.setItem(TOKEN_OBJ_JD_PLAY, objString);

        //清除用户信息
        localStorage.removeItem(KEY_USER_INFO);

        //去掉query string
        next({path: to.path})
    }
}

//很有可能废弃这个函数
//获取用户信息
export function hasTokenAndUserInfoEmptyFetchUserInfo() {
    let userInfo = localStorage.getItem(KEY_USER_INFO);
    let token = fetchToken();
    if (token && !userInfo) {
        initAxios().post(`/v1/userInfo`).then(res => {
            localStorage.setItem(KEY_USER_INFO, JSON.stringify(res.data));
        });
    }
}


export function getStorageUserInfo() {
  let info = JSON.parse(localStorage.getItem(KEY_USER_INFO));
  try {
    return info.user;
  } catch (e) {
    return {
      agent_id: 0,
      phone: '',
      name: '',
      agent: {},
      role: {}
    };
  }
}
