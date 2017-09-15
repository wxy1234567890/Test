var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    userPwdEditDoing:function(option){
        option.loadingText = "正在修改密码,请稍候!";
        option.url = "/user/changePwd.action";
        option.data = {
            userId:option.param.userId,
            originPwd:option.param.oldPwd,
            newPwd:option.param.newPwd
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("userPwdEditDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;