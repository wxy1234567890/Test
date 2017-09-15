var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/interface/insert.action";
        option.data = {
              name:option.param.name,
              code:option.param.code,
              app_id:option.param.app_id,
              in_url:option.param.in_url,
              out_url:option.param.out_url,
              pre_auth:option.param.pre_auth,
              description:option.param.description,
              argsConfig:option.param.argsConfig,
              key:option.param.key,
        };
        console.log(option.data);
        option.success = function(data) {
            // console.log(data);
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;