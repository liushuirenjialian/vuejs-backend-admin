<template>
  <div class="default-tab">
    <div class="searchgrid">
      <form method="post"  name="Form" >
        <input class="width_90" name="filepath" value="" type="hidden">
        <input class="width_120" name="uploadgroupid" value=""
               type="hidden">
        <input class="width_120" name="uploadtitle" value="" type="hidden">
        <input class="width_120" name="uploadstep" value="" type="hidden">

        <input class="width_120" name="groupid" value="" type="hidden">
        <label>名称：</label>
        <input  class="width_90" name="clientname" value=""
                                 maxlength="20" type="text">
        <label>手机：</label>
        <input class="width_90" name="mobile" value="" maxlength="11" type="text">

        <select class="select_option">
          <option value="">不归属组</option>
          <option value="250" title="18183790127">18183790127</option>
        </select>
        <input class="button" value=" 查询 " type="button">
        <input class="button" value=" 导出 " type="button">
        <input class="button" value=" 删除 " type="button">
        <input class="button" value=" 发短信 " type="button">
        <input class="button" title="请选择下面需要转移的通讯录联系人" value="号码转到" type="button">
      </form>
    </div>
    <div class="tab-content default-tab">
      <table>
        <thead>
        <tr>
          <th style=" width:20px;padding-left:5px;border-left:1px solid #C1DAD7"><input
            class="check-all" type="checkbox"></th>
          <th style="border-left: 1px solid #C1DAD7">手机号码</th>
          <th style="border-left: 1px solid #C1DAD7">用户姓名</th>
          <th style="border-left: 1px solid #C1DAD7">归属组</th>
          <th style="border-left: 1px solid #C1DAD7">用户生日</th>
          <th style="border-left: 1px solid #C1DAD7">公司名称</th>
          <th style="border-left: 1px solid #C1DAD7">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style="padding-left:5px;"><input name="mobile" value="39338|18571472087"
                                               type="checkbox"></td>
          <td>18571472087</td>
          <td>DSF</td>
          <td></td>
          <td></td>
          <td></td>
          <td><a href="javascript:void(0);"
                 onclick="javascript:editclient(39338);return false;">编辑</a> |
            <a href="#">发短信</a>
          </td>
        </tr>
        <tr class="alt-row">
          <td style="padding-left:5px;">
            <input name="mobile" value="39337|18183790127" type="checkbox"></td>
          <td>18183790127</td>
          <td>asd</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <a href="javascript:void(0);">编辑</a> |
            <a href="#">发短信</a>
          </td>
        </tr>
        </tbody>
      </table>


      <div class="pagination">
        <a>共有 <b>2条/1页</b> </a><a class="number">上一页</a>
        <a class="number">1</a>
        <a class="number current">2</a>
        <a class="number">3</a>
        <a class="number">下一页</a>
        <input name="page" value="1" size="3" style="height:21px;line-height:21px;text-align: center;" type="text">
        <a class="number">跳 转</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {};
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

  .width_90{
    width: 90px;
  }

  .width_120{
    width: 120px;
  }

  .select_option{
    line-height:30px;
    height:24px;
    width:140px;
    padding-bottom:3px;
    margin-top: 2px;
    vertical-align: top;
  }
</style>
