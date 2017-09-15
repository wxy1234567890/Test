var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    userFreezeDoing:function(option){
        option.loadingText = "正在冻结用户账号,请稍候!";
        option.url = "/user/frozenAccount.action";
        option.data = {
            id:option.param.userId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("userFreezeDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;