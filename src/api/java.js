import {initAxios} from '../common/tools';

//子账户一键平仓
export const eveningUp = params => {
    return initAxios().post(`/v1/javaApi/eveningUp`, params).then(res => res.data);
};
//子账户分笔平仓
export const eveningupPerHolding = params => {
    return initAxios().post(`/v1/javaApi/eveningupPerHolding`, params).then(res => res.data);
};
//手动除权除息
export const xrdr = params => {
    return initAxios().post(`/v1/javaApi/xrdr`, params).then(res => res.data);
};