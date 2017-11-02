import {initAxios} from '../common/tools';


export const agentCashOutInfo = params => {
  return initAxios().post(`/v1/agentCashOutInfo`, params).then(res => res.data);
};

export const agentCashOutUpdate = params => {
  return initAxios().post(`/v1/agentCashOutUpdate`, params).then(res => res.data);
};
