var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({});

var List = Backbone.Collection.extend({
    model: Model,
    fetch:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/application/edit.action";
        option.data = {
              id:option.param.id,
              name:option.param.name,
              code:option.param.code,
              responsor:option.param.responsor,
              phone:option.param.phone,
              email:option.param.email,
              description:option.param.description
        };
        option.success = function(data) {
            // console.log(data);
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = List;