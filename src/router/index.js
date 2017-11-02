import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


import AgentCashOutForm from '../components/agent/AgentCashOutForm.vue'

import AgentTable from '../components/agent/AgentTable.vue'
import AgentChildrenTable from '../components/agent/AgentChildrenTable.vue'
import AgentBankEdit from '../components/agent/AgentBankEdit.vue'
import AgentCommissionTable from '../components/agent/AgentCommissionTable.vue'

import AgentCashTable from '../components/agent/AgentCashTable.vue'
import AgentCashAudit from '../components/agent/AgentCashAudit.vue'

import PromoteQR from '../components/agent/PromoteQR.vue'
import FormAgentCreate from '../components/agent/FormAgentCreate.vue'
import FormAgentUpdate from '../components/agent/FormAgentUpdate.vue'
import EmployeeList from '../components/employee/EmployeeList.vue'
import EmployeeCreate from '../components/employee/FormEmployeeCreate.vue'
import EmployeeUpdate from '../components/employee/FormEmployeeUpdate.vue'
import ClientList from '../components/client/ClientList.vue'
import ClientEditForm from '../components/client/ClientEditForm.vue'
import ClientSwapForm from '../components/client/ClientSwapForm.vue'

import ClientBankList from '../components/client/ClientBankList.vue'
import ClientBankEdit from '../components/client/ClientBankEdit.vue'

import ClientWithdrawList from '../components/client/ClientWithdrawList.vue'
import ClientWithdrawEdit from '../components/client/ClientWithdrawEdit.vue'

import ClientRechargeList from '../components/client/ClientRechargeList.vue'
import ClientRechargeAudit from '../components/client/ClientRechargeAudit.vue'

import ClientAccountAdjust from '../components/client/ClientAccountAdjust.vue'

import MessageList from '../components/client/MessageList.vue'


import SystemParams from '../components/system/params/SystemParams.vue'

import TransRistControlRules from '../components/system/riskRuler/TransRistControlRules.vue'

import HolidayMaintains from '../components/system/holidayMaintain/HolidayMaintains.vue'
import HolidayMaintainCreate from '../components/system/holidayMaintain/HolidayMaintainCreate.vue'
import HolidayMaintainEdit from '../components/system/holidayMaintain/HolidayMaintainEdit.vue'


import StockFinanceProducts from '../components/system/financeProduct/StockFinanceProducts.vue'
import StockFinanceProductEdit from '../components/system/financeProduct/StockFinanceProductEdit.vue'

import StockInfos from '../components/system/info/StockInfos.vue'
import StockInfoEdit from '../components/system/info/StockInfoEdit.vue'

import StockFees from '../components/system/fee/StockFees.vue'

import XrDrInfos from '../components/stock/xrDrInfo/XrDrInfos.vue'

import ParentStockFinances from '../components/stock/parentFinance/ParentStockFinances.vue'
import ParentStockFinanceCreate from '../components/stock/parentFinance/ParentStockFinanceCreate.vue'
import ParentStockFinanceEdit from '../components/stock/parentFinance/ParentStockFinanceEdit.vue'

import UStockFinancings from '../components/stock/uStockFinancing/UStockFinancings.vue'
import UStockFinancingEdit from '../components/stock/uStockFinancing/UStockFinancingEdit.vue'

import UStockFinancingRisks from '../components/stock/uStockFinancingRisk/UStockFinancingRisks.vue'
import UStockFinancingRiskEdit from '../components/stock/uStockFinancingRisk/UStockFinancingRiskEdit.vue'
import UStockFinanceHoldingsStockFinanceID from '../components/stock/uStockFinanceHolding/UStockFinanceHoldingsStockFinanceID.vue'

import CapitalPools from '../components/stock/capitalPool/CapitalPools.vue'
import CapitalPoolCreate from '../components/stock/capitalPool/CapitalPoolCreate.vue'
import CapitalPoolEdit from '../components/stock/capitalPool/CapitalPoolEdit.vue'

import StockFinanceRiskLogs from '../components/stock/stockFinanceRiskLog/StockFinanceRiskLogs.vue'


import ClientMoneyList from '../components/client/ClientMoneyList.vue'

import NotFound from '../components/404.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'select_leaf',
  linkExactActiveClass: 'select_leaf',
  routes: [
    {
      path: '/',
      component: Home,
      name: '代理管理',
      children: [
        {
          path: '/agent/applyCashOut',
          component: AgentCashOutForm,
          name: '代理商提现申请',
        },
        {
          path: '/agent',
          component: AgentTable,
          name: '代理列表',
        },
        {
          path: '/agent/children/:agent_id',
          component: AgentChildrenTable,
          name: '下级代理列表',
        },
        {
          path: '/agent/commission',
          component: AgentCommissionTable,
          name: '代理分成',
        },
        {
          path: '/agent/cash',
          component: AgentCashTable,
          name: '代理提现',
        },
        {
          path: '/agent/cashBankEdit',
          component: AgentBankEdit,
          name: '代理提现银行卡',
        },
        {
          path: '/agent/cash/audit/:id',
          component: AgentCashAudit,
          name: '代理提现审核',
        },
        {
          path: 'agent/create',
          component: FormAgentCreate,
          name: '代理商创建',
        },
        {
          path: 'agent/update/:id',
          component: FormAgentUpdate,
          name: '代理商修改',
        },
        {
          path: 'agent/recommend/code',
          component: PromoteQR,
          name: '推广二维码',
        }
      ]
    },
    {
      path: '/employee',
      component: Home,
      name: '员工管理',
      children: [
        {
          path: '/employee',
          component: EmployeeList,
          name: '员工列表',
        },
        {
          path: 'create',
          component: EmployeeCreate,
          name: '员工创建',
        },
        {
          path: 'update/:id',
          component: EmployeeUpdate,
          name: '员工修改',
        }
      ]
    },
    {
      path: '/client',
      component: Home,
      name: '客户管理',
      children: [
        {
          path: '/client',
          component: ClientList,
          name: '客户列表',
        },
        {
          path: 'account',
          component: ClientMoneyList,
          name: '客户资金',
        },

        {
          path: 'swap/:id',
          name: '客户变更归属',
          component: ClientSwapForm,

        },
        {
          path: 'edit/:id',
          component: ClientEditForm,

          name: '客户修改'
        },
        {
          path: 'adjust/:id',
          component: ClientAccountAdjust,
          name: '调整客户余额'
        },
        {
          path: 'bankCard',
          component: ClientBankList,
          name: '客户银行卡',
        },
        {
          path: 'bankCard/edit/:id',
          component: ClientBankEdit,
          name: '客户银行卡编辑',
        },
        {
          path: 'withdraw',
          component: ClientWithdrawList,
          name: '客户提现',
        },
        {
          path: 'withdraw/audit/:id',
          component: ClientWithdrawEdit,
          name: '客户提现审核',
        },
        {
          path: 'recharge',
          component: ClientRechargeList,
          name: '客户充值',
        },
        {
          path: 'recharge/audit/:id',
          component: ClientRechargeAudit,
          name: '客户充值审核',
        },
        {
          path: 'message',
          component: MessageList,
          name: '短信查询',
        },

      ]
    },
      {
          path: '/',
          component: Home,
          name: '系统管理',
          children: [
              {
                  path: 'system',
                  component: SystemParams,
                  name: '平台配置',
              },
              {
                  path: '/system/holidayMaintains',
                  component: HolidayMaintains,
                  name: '节假日管理',
              },
              {
                  path: '/system/holidayMaintain/create',
                  component: HolidayMaintainCreate,
                  name: '新增节假日',
              },
              {
                  path: '/system/holidayMaintain/edit/:id',
                  component: HolidayMaintainEdit,
                  name: '修改节假日',
              },
              {
                  path: '/system/financeProducts',
                  component: StockFinanceProducts,
                  name: '股票配资产品管理',
              },
              {
                  path: '/system/financeProduct/edit/:id',
                  component: StockFinanceProductEdit,
                  name: '修改股票配资产品',
              },
              {
                  path: '/system/infos',
                  component: StockInfos,
                  name: '股票管理',
              },
              {
                  path: '/system/info/edit/:id',
                  component: StockInfoEdit,
                  name: '编辑股票',
              },
              {
                  path: '/system/fees',
                  component: StockFees,
                  name: '收费管理标准',
              },
              {
                  path: '/system/transRistControlRules',
                  component: TransRistControlRules,
                  name: '风控规则'
              }
          ]
      },
      {
          path: '/',
          component: Home,
          name: '配资管理',
          children: [
              {
                  path: '/stock/uStockFinancings',
                  component: UStockFinancings,
                  name: '操盘账户',
              },
              {
                  path: '/stock/uStockFinancing/edit/:id',
                  component: UStockFinancingEdit,
                  name: '修改操盘账户',
              },
              {
                  path: '/stock/uStockFinancingRisks',
                  component: UStockFinancingRisks,
                  name: '风控管理',
              },
              {
                  path: '/stock/uStockFinancingRisk/edit/:id',
                  component: UStockFinancingRiskEdit,
                  name: '修改风控管理',
              },
              {
                  path: '/stock/uStockFinanceHoldings/stock_finance_id/:id',
                  component: UStockFinanceHoldingsStockFinanceID,
                  name: '客户持仓',
              },
              {
                  path: '/stock/parentStockFinances',
                  component: ParentStockFinances,
                  name: '操盘母账户管理',
              },
              {
                  path: '/stock/parentStockFinance/create',
                  component: ParentStockFinanceCreate,
                  name: '新增母账户',
              },
              {
                  path: '/stock/parentStockFinance/edit/:id',
                  component: ParentStockFinanceEdit,
                  name: '修改母账户',
              },
              {
                  path: '/stock/capitalPools',
                  component: CapitalPools,
                  name: '资金池管理',
              },
              {
                  path: '/stock/capitalPool/create',
                  component: CapitalPoolCreate,
                  name: '新增资金池',
              },
              {
                  path: '/stock/capitalPool/edit/:id',
                  component: CapitalPoolEdit,
                  name: '修改资金池',
              },
              {
                  path: '/stock/stockFinanceRiskLogs',
                  component: StockFinanceRiskLogs,
                  name: '子账户风控日志',
              },
              {
                  path: '/stock/xrDrInfos',
                  component: XrDrInfos,
                  name: '除权降息管理',
              }
          ]
      },
      {
          path: '/login',
          component: Login,
          name: '管理后台登陆',
      },
      {
          path: '/404',
          component: NotFound,
          name: '',
      },
      {
          path: '/cms',
          component: Home,
          name: '内容管理',
          children: []
      },
      {
          path: '/trade',
          component: Home,
          name: '交易管理',
          children: []
      },
      {
          path: '/statistic',
          component: Home,
          name: '查询统计',
          children: []
      },
      {
          path: '/',
          component: Home,
          name: '图表管理',
          children: []
      },
      {
          path: '*',
          redirect: {path: '/404'}
      }
  ]
})
