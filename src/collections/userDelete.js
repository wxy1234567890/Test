var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    userDeleteDoing:function(option){
        option.loadingText = "正在删除用户信息,请稍候!";
        option.url = "/user/userDelete.action";
        option.data = {
            userId:option.param.userId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("userDeleteDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;