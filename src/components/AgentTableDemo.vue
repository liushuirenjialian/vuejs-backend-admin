<template>
  <div class="default-tab">
    <div class="searchgrid">
      <form method="post" action="contacts.aspx" name="Form" id="Form1">

        <input id="filepath" style="width:120px" name="filepath" value="" type="hidden">
        <input id="uploadgroupid" style="width:120px" name="uploadgroupid" value=""
               type="hidden">
        <input id="uploadtitle" style="width:120px" name="uploadtitle" value="" type="hidden">
        <input id="uploadstep" style="width:120px" name="uploadstep" value="" type="hidden">

        <input id="groupid" style="width:120px" name="groupid" value="" type="hidden">
        <label>名称：</label><input id="clientname" style="width:90px" name="clientname" value=""
                                 maxlength="20" type="text">
        <label>手机：</label><input id="mobile" style="width:90px" name="mobile" value=""
                                 maxlength="11" type="text">
        <input class="button" value=" 查询 " type="button">
        <input class="button" value=" 导出 " type="button">
        <input class="button" value=" 删除 " type="button">
        <input class="button" value=" 发短信 " type="button">
        <input class="button" title="请选择下面需要转移的通讯录联系人" value="号码转到" type="button">
        <select name="srcnumgroupid"
                id="srcnumgroupid"
                style="line-height:30px;height:24px;padding-top:3px;width:140px;padding-bottom:3px;">
          <option value="">不归属组</option>
          <option value="250" title="18183790127">18183790127</option>
        </select>
      </form>
    </div>
    <div class="tab-content default-tab" style="display: block;">
      <table style="text-align: center">
        <thead>
        <tr>
          <th style="border-left: 1px solid #C1DAD7">ID</th>
          <th style="border-left: 1px solid #C1DAD7">代理编号</th>
          <th style="border-left: 1px solid #C1DAD7">代理名称</th>
          <th style="border-left: 1px solid #C1DAD7">代理域名</th>
          <th style="border-left: 1px solid #C1DAD7">代理来源</th>
          <th style="border-left: 1px solid #C1DAD7">联系人</th>
          <th style="border-left: 1px solid #C1DAD7">联系电话</th>

          <th style="border-left: 1px solid #C1DAD7">天配</th>
          <th style="border-left: 1px solid #C1DAD7">月配</th>
          <th style="border-left: 1px solid #C1DAD7">提现</th>

          <th style="border-left: 1px solid #C1DAD7">状态</th>
          <th style="border-left: 1px solid #C1DAD7">备注</th>
          <th style="border-left: 1px solid #C1DAD7">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in pagination.data" :key="item.id">
          <td v-text="item.id"></td>
          <td v-text="item.agent_number"></td>
          <td v-text="item.agent_name"></td>
          <td v-text="item.info ? item.info.web_domain :''"></td>
          <td v-text="item.parent ?  item.parent.agent_name :'无父级代理' "></td>
          <td v-text="item.owner_name"></td>
          <td v-text="item.phone"></td>

          <td v-text="item.id"></td>
          <td v-text="item.id"></td>
          <td v-text="item.id"></td>


          <td>状态</td>
          <td v-text="item.remark"></td>

          <td>
            <button @click="handleEmployeeList(item)" title="员工管理"><i class="fa fa-user"></i></button>
            <button @click="handleEditAgent(item)" title="代理修改"><i class="fa fa-pencil-square"></i></button>
            <button @click="handleAddChildAgent(item)" title="添加代理"><i class="fa fa-plus-square"></i></button>
            <button @click="handlePlayAgent(item)" title="扮演代理"><i class="fa fa-play-circle"></i></button>
            <button @click="handleDeleteAgent(item)" title="删除代理"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
        </tbody>
      </table>


      <div class="pagination">
        <a>共有 <b>{{pagination.total}}条/{{pagination.last_page}}页</b> </a>
        <a class="number" @click="handlePagePre">上一页</a>
        <a v-for="n in pagination.last_page"
           :key="n"
           @click="pageIndexChange"
           :class="n == filters.page ? 'number current' :'number' "
           v-text="n"></a>
        <a class="number" @click="handlePageNext">下一页</a>
        <input name="page" v-model.number="filters.page" size="3" style="height:21px;line-height:21px;text-align: center;" type="text">
        <a class="number" @click="getAgentListByPageAndName">跳 转</a>
      </div>
    </div>
  </div>

</template>

<script>
  import {agentList} from '../../api/agent';
  import {rolePlayIssueToken} from '../../api/user';

  export default {
    data() {
      return {
        filters: {
          keyword: '',
          page: 1,
          size: 15,
        },
        pagination: {},
        listLoading: false,
      }
    },
    methods: {
      pageIndexChange(event) {
        //分页页面发生改变
        this.filters.page = event.target.innerText;
        this.getAgentListByPageAndName();
      },
      //获取用户列表
      getAgentListByPageAndName() {
        let params = this.filters;
        this.listLoading = true;
        agentList({params}).then((res) => {
          this.pagination = res.data;
          this.listLoading = false;
        }).catch(error => this.ezNotifyAxiosCatch(error));
      },
      //上一页
      handlePagePre() {
        this.filters.page = this.filters.page - 1;
        if (this.filters.page > this.pagination.last_page || this.filters.page < 1) {
          this.filters.page = 1;
        }
        this.getAgentListByPageAndName();
      },
      //下一页
      handlePageNext() {
        this.filters.page++;
        if (this.filters.page > this.pagination.last_page || this.filters.page < 1) {
          this.filters.page = 1;
        }
        this.getAgentListByPageAndName();
      },
      handleSizeChange(size) {
        this.filters.size = size;
        this.filters.page = 1;
        this.getAgentListByPageAndName();
      },
      //添加下一级代理
      handleAddChildAgent: function (row) {
        let query = {parentId: row.id};
        this.$router.push({path: '/agent/create', query});
      },
      //显示下级员工
      handleEmployeeList: function (row) {
        this.$router.push({name: '员工列表', query: {agent_id: row.id}})
      },
      handleEditAgent: function (row) {
        let id = row.id;
        this.$router.push({name: '代理商修改', params: {id}});
      },
      //删除
      handleDeleteAgent: function (row) {
        this.$confirm('确认删除该记录吗? 删除代理延时一分钟消失', '提示', {
          type: 'warning'
        }).then(() => {

        }).catch(() => {

        });
      },
      handlePlayAgent: function (row) {
        rolePlayIssueToken({agent_id: row.id}).then(res => {
          if (res.status) {
            let tokenx = res.data.accessToken;
            this.$router.push({path: '/agent', query: {tokenx}});
          }
        });
      }
    },
    mounted() {
      this.getAgentListByPageAndName();
    }
  }
</script>

<style scoped>
  input[type='text'] {
    height: 20px;
  }

  input[type='button'] {
    line-height: 19px;
  }

  input[type='submit'] {
    line-height: 24px;
  }
</style>
