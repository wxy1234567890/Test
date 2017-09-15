var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
  model: Model,
  fetch:function(option){
    option.loadingText = "正在加载数据,请稍候!";
    option.url = "/product/getInterfaceUseListByMonthByDay.action";
    option.data = {
      id:option.param.productId,
      userId:window.userId,
      month:option.param.month,
      interfaceNumOrder:option.param.interfaceNumOrder,
      useCountOrder:option.param.useCountOrder,
      pagesize:'10',
      pagenow:'1'
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