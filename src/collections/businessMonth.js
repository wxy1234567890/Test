var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});
// 指定月份中按天统计接口使用情况
var List = Backbone.Collection.extend({
  model: Model,
  fetch:function(option){
    option.loadingText = "正在加载数据,请稍候!";
    option.url = "/product/getProductUserStat.action";
    option.data = {
      productId:option.param.businessId,
      month:option.param.month,
      pagesize:option.param.pageSize,
      pagenow:option.param.pageIndex
    };
    option.success = function(data) {
      console.log(data);
      this.set(data.list);
      this.trigger("fetchDone",data.totalCount);
    }.bind(this);
    AJAX_POST(option);
  }
});

module.exports = List;