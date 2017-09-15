var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    fetch:function(option){
        option.loadingText = "正在新增业务信息,请稍候!";
        option.url = "/menu/insert.action";
        option.data = {
            code:option.param.code,
            name:option.param.name,
            parent_id:"0"
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("fetchDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;