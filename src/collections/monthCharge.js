var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
  model: Model,
  fetch:function(option){
    option.loadingText = "正在加载数据,请稍候!";
    option.url = "/product/getInterfaceUseListByMonth.action";
    option.data = {
      id:"1",
      month:"2017-06"
      // pagesize:"10",
      // pagenow: "1"
      // useCountOrder:option.param.useCountOrder,
      // interfaceCountOrder:option.param.interfaceCountOrder,
      // dayOrder:option.param.dayOrder
    };
    option.success = function(data) {
      console.log(data);
      this.set(data);
      this.trigger("fetchDone");
    }.bind(this);
    AJAX_POST(option);
  }
});

module.exports = List;