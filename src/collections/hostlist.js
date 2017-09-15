var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = require("model/host");

var List = Backbone.Collection.extend({
  model: Model,
  fetchByPage: function(option) {
    option.loadingText = "正在查询关联主机信息,请稍候!";
    option.url = "/host/queryByPage.action";
    option.data = {
      pageIndex:option.param.pageIndex,
      pageSize:option.param.pageSize,
      platId:option.param.platId
    };

    option.success = function(data) {
      this.set(data.hostlist);
      this.trigger("fetchDone",data.total);
    }.bind(this);
    AJAX_POST(option);
  }
});

module.exports = List;