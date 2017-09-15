var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = require("model/platform");
var InstanceCollection = require("collection/instancelist");

var List = Backbone.Collection.extend({
  model: Model,
  fetch:function(option){
    option.loadingText = "正在查询平台列表,请稍候!";
    option.url = "/platform/queryPlatformList.action";
    option.data = {};
    option.success = function(data) {
      this.reset();
      data.map(function(platform){
        platform.sub = new InstanceCollection(platform.sub);
      });
      this.set(data);
      this.trigger("fetchDone");
    }.bind(this);
    AJAX_POST(option);
  }
});

module.exports = List;