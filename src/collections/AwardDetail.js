var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
  fetch:function(option){
    option.loadingText = "正在加载数据,请稍候!";
    option.url = "/huokeAction/getAwardDetail.action";
    option.data = {
      userId:option.param.userId,
      month:option.param.month
    };
    option.success = function(data) {
      this.set(data);
      this.trigger("fetchDone2");
    }.bind(this);
    AJAX_POST(option);
  }
});

module.exports = Model;