var Backbone = require("backbone");
var AJAX_POST = require("util/ajax").AJAX_POST;

var Model = Backbone.Model.extend({
    getDetailDoing:function(option){
        option.loadingText = "正在加载数据,请稍候!";
        option.url = "/message/getContent.action";
        option.data = {
            id:option.param.newsId
        };
        option.success = function(data) {
            this.set(data);
            this.trigger("getDetailDone");
        }.bind(this);
        AJAX_POST(option);
    }
});

module.exports = Model;