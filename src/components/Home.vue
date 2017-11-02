<template>
  <div>
    <div style="background-color:#eaf7ff;" class="hold-transition skin-blue sidebar-mini">
      <div class="body_header">
        <div class="header_left">
          <div class="header_logo"><a>
            <img id="logo" src="~static/img/logo.png" alt="短信通平台"/></a></div>
        </div>
        <div class="shortcut-buttons-set" style="margin-right:10px;" v-on:click="logout">
          <img src="~static/img/layout.jpg" alt="退出系统" title="退出系统"/>
        </div>
        <div class="shortcut-buttons-set">
          <img src="~static/img/index.jpg" alt="系统首页" v-on:click="$router.push('/')" title="系统首页"/>
        </div>
        <div class="profile-links">
          <div id="usertip"><span
            style="display: table-cell;vertical-align: middle;line-height: 17px;width: 80px;">
            {{user.role.role_name}} :<br/> {{user.employee_name}}</span>
          </div>
          <div id="smstip"><span id="remainpoint"></span></div>
        </div>
      </div>
    </div>
    <div id="body-wrapper">
      <div id="left" style=" width: 200px;" class="aside_height" srolling="yes">
        <div id="menutop">
          <img src="~static/img/menu-ico.jpg" border="0">
          <span style="font-size: 14px">管理平台菜单</span></div>
        <div id="menubg">

          <!-- sidebar: style can be found in sidebar.less -->
          <section class="sidebar">
            <ul class="sidebar-menu" data-widget="tree">

              <template v-for=" value in navTree">
                <li :key="value.name" :class="handleMenuClass(value)">
                  <a href="#">
                    <i :class="value.iconClass"></i>
                    <span>{{value.name}}</span>
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                  </a>
                  <ul class="treeview-menu">
                    <template v-for="item in value.children">
                      <li :key="item.path" :class="{active:currentPath==item.path}">
                        <router-link :to="item.path"><i class="fa fa-circle-o"></i>{{item.name}}</router-link>
                      </li>
                    </template>
                  </ul>
                </li>
              </template>

            </ul>
          </section>
          <!-- /.sidebar -->


        </div>
      </div>
      <div id="main" style="height: 768px">
        <div id="righttitle">
          <div id="rightico"></div>
          <div id="righttip"><strong>位置：</strong>
            <span v-for="item in $route.matched" :key="item.name" v-text="'['+item.name+']'" style="margin-right: 8px"> </span>
          </div>
        </div>
        <div class="scroll">
          <div class="content-box role">
            <div class="content-box-content" style="padding:8px;">
              <!--这个小组件就是你们要显示的内容-->
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="bottom-tip">
      <div class="middle" style="width:100%;">
        <div id="infozone">
          <div><a target='mainFrame'>暂无公告</a></div>
        </div>
      </div>
      <div style="float:left; width:240px;" id="liveclock">&nbsp;</div>
      <div style="float:right; width:140px; background:url(../../static/img/buttonright.jpg) no-repeat;">&nbsp;</div>
    </div>
    <div id="winpop">
      <div class="title">消息提示<span class="closeTip">X</span></div>
      <div id="showContent" class="con"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import {KEY_USER_INFO} from '../common/tools'
  import vContent from './content.vue'
  import {bus} from '../common/bus'
  import {getStorageUserInfo} from '../common/tools'

  export default {
    data: function () {
      //管理员的菜单
      let adminMemu = [
        {
          path: '/agent',
          name: '代理管理',
          iconClass: 'fa fa-bank',
          children: [
            {
              path: '/agent',
              name: '代理列表',
            },
            {
              path: '/agent/cash',
              name: '提现记录',
            }
          ]
        },
        {
          path: '/client',
          name: '客户管理',
          iconClass: 'fa fa-user-plus',
          children: [
            {path: '/client', name: '客户列表'},
            {path: '/client/account', name: '客户资金'},
            {path: '/client/recharge', name: '客户充值'},
            {path: '/client/withdraw', name: '客户提现'},
            {path: '/client/bankCard', name: '银行卡管理'},
            {path: '/client/message', name: '短信管理'},
          ]
        },
        {
          path: '/system',
          name: '系统管理',
          iconClass: 'fa fa-asterisk',//图标样式class
          children: [
            {path: '/system', name: '系统配置'},
            {path: '/employee', name: '员工列表'},
            {path: '/system/holidayMaintains', name: '节假日'},
            {path: '/system/infos', name: '股票代码'},
            {path: '/system/financeProducts', name: '产品管理'},
            {path: '/system/fees', name: '收费标准'},
            {path: '/system/transRistControlRules', name: '风控标准'}
          ]
        },
        {
          path: '/stock',
          name: '配资管理',
          iconClass: 'fa fa-btc',
          children: [
            {path: '/stock/uStockFinancings', name: '操盘账户'},
            {path: '/stock/uStockFinancingRisks', name: '风控管理'},
            {path: '/stock/capitalPools', name: '资金池管理'},
            {path: '/stock/parentStockFinances', name: '操盘母账户管理'},
            {path: '/stock/stockFinanceRiskLogs', name: '子账户风控日志'},
            {path: '/stock/xrDrInfos', name: '除权降息管理'}
          ]
        },

        {
          path: '/cms',
          name: '内容管理',
          iconClass: 'fa fa-book',

        },

        {
          path: '/trade',
          name: '交易管理',
          iconClass: 'fa fa-yen',

        },
        {
          path: '/statistic',

          name: '查询统计',
          iconClass: 'fa fa-pie-chart',

        },
      ];


      //代理商的菜单
      let agentMenu = [
        {
          path: '/agent',
          name: '代理/员工管理',
          iconClass: 'fa fa-bank',
          children: [
            {
              path: '/agent/recommend/code',
              name: '我的推广链接',
            },
            {
              path: '/agent/children/0',
              name: '代理商分层',
            },
            {path: '/employee', name: '员工列表'},
            {
              path: '/agent/cash',
              name: '提现记录',
            },
            //agentWithdrawApply
            {
              path: '/agent/applyCashOut',
              name: '提现申请',
            },
            {
              path: '/agent/cashBankEdit',
              name: '代理提现银行卡',
            },


//            {
//              path: '/agent/commission',
//              name: '利息分成',
//            },
//
//            {
//              path: '/agent/money/peak',
//              name: '资金峰值',
//            },


          ]
        },
        {
          path: '/client',
          name: '客户管理',
          iconClass: 'fa fa-user-plus',
          children: [
            {path: '/client', name: '客户列表'},
            {path: '/client/account', name: '客户资金'},
            {path: '/client/withdraw', name: '客户提现'},
            {path: '/client/recharge', name: '客户充值'},
          ]
        },
        {
          path: '/system',
          name: '系统管理',
          iconClass: 'fa fa-asterisk',//图标样式class
          children: [
            {path: '/system', name: '系统配置'},
            {path: '/system/holidayMaintains', name: '节假日'},
            {path: '/system/infos', name: '股票代码'},
            {path: '/system/financeProducts', name: '产品管理'},
            {path: '/system/fees', name: '收费标准'},
            {path: '/system/transRistControlRules', name: '风控标准'}
          ]
        },
        {
          path: '/stock',
          name: '配资管理',
          iconClass: 'fa fa-btc',
          children: [
            {path: '/stock/uStockFinancings', name: '操盘账户'},
            {path: '/stock/uStockFinancingRisks', name: '风控管理'},
            {path: '/stock/capitalPools', name: '资金池管理'},
            {path: '/stock/parentStockFinances', name: '操盘母账户管理'},
            {path: '/stock/stockFinanceRiskLogs', name: '子账户风控日志'},
            {path: '/stock/xrDrInfos', name: '除权降息管理'}
          ]
        },

        {
          path: '/cms',
          name: '内容管理',
          iconClass: 'fa fa-book',

        },

        {
          path: '/trade',
          name: '交易管理',
          iconClass: 'fa fa-yen',

        },
        {
          path: '/statistic',

          name: '查询统计',
          iconClass: 'fa fa-pie-chart',

        },
      ];


      return {
        currentPath: '',
        navTree: Math.random() >= 0.5 ? agentMenu : adminMemu,
        currentClass: false,
        path: ''
      };
    },
    created() {
      this.currentPath = this.$route.path;
    },
    watch: {
      //监视路由，参数为要目标路由和当前页面的路由
      $route(to, from) {
        this.currentPath = to.path;
      }
    },
    methods: {
      logout: function () {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      handleMenuClass(value) {
        if (this.currentPath.indexOf(value.path) == 0) {
          return 'treeview menu-open';
        } else {
          return 'treeview';
        }
      }
    },
    computed: {
      user() {
        return getStorageUserInfo();
      }
    },
  }
</script>

<style scoped>
  li.treeview.menu-open ul {
    display: block !important;
  }

  #infozone {
    font-size: 12px;
    color: #aa6;
    overflow: hidden;
    width: 300px;
    height: 30px;
  }

  #infozone div {
    height: 30px;
    line-height: 26px;
    white-space: nowrap;
    overflow: hidden;
  }

  #body-wrapper {
    display: flex;
    justify-content: flex-start;
  }

  #body-wrapper #left {
    width: 200px;
    max-width: 200px;
    min-width: 200px;
  }

  #body-wrapper #main {
    width: 100%;
  }

  .text_black {
    color: #666666;
  }

  .right_f {
    border-width: medium medium medium 1px;
    border-style: none none none solid;
    border-color: currentcolor currentcolor currentcolor rgb(192, 220, 242);
    -moz-border-top-colors: none;
    -moz-border-right-colors: none;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    border-image: none;
    visibility: inherit;
    top: 0;
    z-index: 5;
    margin-left: 5px;
  }

  .treeview {
    font-size: 14px;
  }

  .treeview-menu {
    font-size: 12px;
  }

  .sidebar-menu li {
  }

  .sidebar-menu li a, .sidebar-menu li a:hover, .sidebar-menu li a:active {
    text-decoration: none;
  }

  .sidebar-menu li a {
    text-decoration: none;
  }

  .sidebar-menu > li:hover > a, .sidebar-menu > li.active > a, .sidebar-menu > li.menu-open > a {
    color: white;
    background-color: #5EA6E0;
  }

  .skin-blue .sidebar-menu > li > .treeview-menu {
    background-color: #C9E7E9;
  }

  .sidebar-menu > li > .treeview-menu {
    background: #EEF9FF;
    color: black;
  }

  .treeview-menu {
    padding: 0;
    margin: 0;
  }

  .treeview-menu li {
    height: 40px;
    line-height: 35px;
  }

  .treeview-menu .active {
    font-weight: bold;
    color: black !important;
    line-height: 35px;
    background-image: linear-gradient(360deg, #F7FBFE, #1E8EDF, #F7FBFE);
  }

  .scroll {
    overflow-x: auto;
    overflow-y: auto;
    position: fixed;
    bottom: 10px;
    top: 120px;

  }

  .aside_height {
  }
  @media all and (max-width: 1440px){
  .scroll{
    width: 85%;
  }
}
  @media all and  (min-width: 1441px) and (max-width: 1920px){
    .scroll{
      width: 88.5%;
    }

  }
</style>
