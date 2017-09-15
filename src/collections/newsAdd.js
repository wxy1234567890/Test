var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    newsAdd:function(option){
        option.loadingText = "正在提交数据,请稍候!";
        option.url = "/message/insert.action";
        option.data = {
            type:option.param.newsType,
            title:option.param.newsTitle,
            content:option.param.newsContent
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("newsAddDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;