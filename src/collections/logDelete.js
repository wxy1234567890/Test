var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    logDeleteDoing:function(option){
        option.loadingText = "正在删除日志数据,请稍候!";
        option.url = "/log/logDelete.action";
        option.data = {
            logId:option.param.logId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("logDeleteDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;